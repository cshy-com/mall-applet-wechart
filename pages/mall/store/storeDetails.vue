<template>
  <view>
    <view
      class="back-box"
      :style="{
        top: navInfo.menuTop + 'px',
        height: navInfo.menuHeight + 'px',
      }"
    >
      <image
        @click="navBack"
        :lazy-load="true"
        :lazy-load-margin="0"
        :src="defBack"
        class="back-img"
      ></image>
    </view>
    <view class="swiper-block">
      <u-swiper
        :list="swiperList"
      
        circular
        :autoplay="false"
        radius="5"
        bgColor="#ffffff"
        keyName="url"
        :height="'750rpx'"
        @change="(e) => (current = e.current)"
        @click="clickSwiper($event)"
        :displayMultipleItems="1"
      >
        <view slot="indicator" class="indicator">
          <view
            class="indicator__dot"
            v-for="(item, index) in swiperList"
            :key="index"
            :class="[index === current && 'indicator__dot--active']"
          >
          </view>
        </view>
      </u-swiper>
    </view>
    <view class="store-block">
      <storeBox
        :shopInfo="shopInfo"
        @collectChange="collectChange"
        :isCollect="isCollect"
        :userType="user.userType"
      >
      </storeBox>

      <u-gap height="12" bgColor="#F5F5F5"></u-gap>

      <view class="wrap">
        <!-- 店铺商品 -->
        <view class="commodity-box">
          <!-- <view class="tab-header">
          <text> 推荐菜({{ prods.length }})</text>
        </view> -->
          <view class="tab-header" :class="{'tab-header-bottom-30':prods.length == 0}">
            <text> 店铺商品 </text>
            <text class="tab-header-tip" v-if="prods.length == 0"
              >店铺暂未上传商品</text
            >
          </view>

          <commodity v-if="prods.length > 0" :prods="prods" :showBtn="userInfo.userType==1" > </commodity>
        </view>
        <u-gap height="12" bgColor="#F5F5F5"></u-gap>
        <!--评价  -->
        <view class="comment-box">
          <view class="tab-header" :class="{'tab-header-bottom-30':commentTotal== 0}">
            <text> 用户评价({{ commentTotal }})</text>
            <view
              class="right-more"
              v-if="commentTotal > 0"
              @click="goCommentMore"
            >
              <text>查看更多</text>
              <image
                :lazy-load="true"
                :lazy-load-margin="0"
                :src="defaultRight"
                class="right-icon"
              ></image>
            </view>
            <text class="tab-header-tip" v-if="commentTotal == 0"
              >暂无评价</text
            >
          </view>
          <comment v-if="commentTotal > 0" :commentData="commentData"></comment>
        </view>
        <u-gap height="12" bgColor="#F5F5F5"></u-gap>
        <!-- 推荐 -->
        <view class="article-grid-box">
          <view class="tab-header" :class="{'tab-header-bottom-30':shopList.length== 0}">
            <text> 推荐({{ shopList.length }})</text>
            <text class="tab-header-tip" v-if="shopList.length == 0"
              >暂无推荐</text
            >
          </view>
          <shopTopItem v-if="shopList.length > 0" :list="shopList">
          </shopTopItem>
          <!-- <articleGrid :prods="prods2"> </articleGrid -->
        </view>
        <!-- 底部操作按钮 -->
        <commFootBtn :tel="sysTel" :shopId="shopId"></commFootBtn>
      </view>
    </view>
  </view>
</template>

<script>
import comment from './../components/comment.vue'
// import articleGrid from './../components/articleGrid.vue'
import commodity from './../components/commodity.vue'
import commFootBtn from './../components/commFootBtn'
import shopTopItem from './../components/shopTopItem.vue'

import storeBox from './../components/storeBox'
import { createNamespacedHelpers } from 'vuex'
import {
  mallShopById,
  getCommodityList,
  getCommodityPage,
  shopCommentsPage,
  mallShopPage,
} from '@/api/shop.js'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')

export default {
  components: {
    // articleGrid,
    comment,
    shopTopItem,
    commodity,
    commFootBtn,

    storeBox,
  },
  data() {
    return {
      prods: [],
      prods2: [],
      swiperList: [],
      tags: [
        '有包厢',
        '有空调',
        '免费茶水',
        '个性化服务',
        '有包厢',
        '有包厢',
        '有包厢',
        '有包厢',
        '有包厢',
      ],
      count: 5,
      value: 4.6,
      shopId: '',
      isCollect: false, //是否已收藏
      current: 1,
      size: 10,
      user: {},

      shopList: [],
      commentData: [],
      commentTotal: 0,
      current: 0,
    }
  },
  computed: {
    ...mapGetters(['shopInfo']),
    navInfo() {
      return this.$store.state.comm.navInfo
    },
    userInfo() {
      return this.$store.state.user.userInfo
    },
    sysTel(){
      return '027-123456'
    },
    defBack() {
      return this.$fileUrl + '/sysFile/ic_nav_arrow.png'
    },

    defaultRight() {
      return `${this.$fileUrl}/sysFile/ic_bian_arrow.png`
    },
  },
  onLoad(option) {
    this.shopId = option.id
    this.user = uni.getStorageSync('user')
    this.getShopDetail()
    this.getCommentsList()
    this.getCommodityList()
    this.getCommodityRecommend()
  },
  created() {},
  onShow() {
    // this.swiperList = this.shopInfo?.shopList || this.swiperList
  },
  onReachBottom() {
    this.current++
    this.getCommodityRecommend()
  },
  methods: {
    ...mapMutations(['setCommodityInfo', 'setShopInfo']),
    collectChange(e) {
      this.isCollect = !this.isCollect
    },
    navBack() {
      uni.navigateBack()
    },
    goCommentMore() {
      uni.navigateTo({
        url: '/pages/mall/comment/comment?shopId=' + this.shopId,
      })
    },
    clickSwiper(index) {
      uni.previewImage({
        urls: this.swiperList.map((val) => val.url),
        current: index,
        loop: true,
      })
    },

    async getCommentsList() {
      let res = await shopCommentsPage({
        shopId: this.shopId,
        current: 1,
        size: 5,
      })
      this.commentData = res.data
      this.commentTotal = res.total
    },
    async getShopDetail() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await mallShopById(this.shopId)
        this.setShopInfo(res.data)
        this.isCollect = res.data.ifCollect
        if (this.shopInfo.images && this.shopInfo.images.length > 0) {
          this.shopInfo.images.forEach((e) => {
            this.swiperList.push({
              url: e,
              type: 'image',
            })
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },
    // 查看商家下面商品信息
    async getCommodityList() {
      try {
        let res = await getCommodityList({
          shopId: this.shopId,
        })
        this.prods = res.data
      } catch (e) {
        console.log(e)
      }
    },
    // 查看推荐店铺
    async getCommodityRecommend() {
      debugger
      try {
        let res = await mallShopPage({
          current: this.current,
          size: this.size,
          isRecommend: true,
          firstType: this.shopInfo.firstType,
          excludeId: this.shopId,
        })
        if (this.current == 1) {
          this.shopList = res.data
        } else {
          this.shopList = [...this.shopList, ...res.data]
        }
      } catch (e) {
        console.log(e)
      }
    },

    tab(index) {
      switch (index) {
        case 0:
          this.goto('.commodity-box')
          break
        case 1:
          this.goto('.comment-box')
          break
        case 2:
          this.goto('.article-grid-box')
          break
      }
    },
    // 跳转锚点
    goto(name) {
      uni
        .createSelectorQuery()
        .select(name)
        .boundingClientRect((data) => {
          //目标位置的节点：类class或者id
          uni
            .createSelectorQuery()
            .select('.wrap')
            .boundingClientRect((res) => {
              //最外层盒子的节点：类class或者id
              uni.pageScrollTo({
                duration: 100, //过渡时间
                scrollTop: data.top + 460 - res.top - 200, //到达距离顶部的top值
                // scrollTop:data.top - res.top,//如果置顶
              })
            })
            .exec()
        })
        .exec()
    },
  },
}
</script>
<style lang="scss" scoped>
.back-box {
  padding-left: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 999;
  top: 50rpx;
  .back-img {
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
  }
}
/deep/ .u-swiper__indicator {
  bottom: 70rpx !important;
}
.indicator {
  @include flex(row);
  justify-content: center;

  &__dot {
    width: 16rpx;
    height: 8rpx;
    background: #ffffff;
    border-radius: 5rpx;
    opacity: 0.3;
    margin: 0 8rpx;
    transition: background-color 0.3s;

    &--active {
      width: 26rpx;

      background: #ffffff;
      border-radius: 5px;
      transition: background-color 0.3s;
      opacity: 0.8;
    }
  }
}
.comment-box {
  background: #fff;
}
.commodity-box {
  background: #fff;
}
.article-grid-box {
  background: #fff;
}
.commodity-box {
  /deep/ .article-item-cont {
    padding-top: 30rpx;
  }
}
.store-block {
  position: relative;
  top: -50rpx;
}

.article-grid-box {
  padding-bottom: 80rpx;
}

.tab-header {
  padding: 30rpx;

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 42rpx;
  padding-bottom: 0;
  .right-more {
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #cccccc;
    line-height: 37rpx;
    display: flex;
    align-items: center;
  }
  .right-icon {
    width: 16rpx;
    height: 24rpx;
    margin-left: 10rpx;
  }
  .tab-header-tip {
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #cccccc;
    line-height: 37rpx;
  }
}
.tab-header-bottom-30{
  padding-bottom: 30rpx;
}
.star {
  margin-left: auto;
  font-size: 24rpx;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90rpx;
  .star-text {
    font-size: 20rpx;
  }
}
</style>
