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
    <view class="store-block">
       
      <u-swiper
        :list="swiperList"
        @change="(e) => (currentNum = e.current)"
        @click="clickSwiper($event)"
        :autoplay="false"
    
        indicatorStyle="bottom: 20rpx"
        :height="'739rpx'"
      >
      <view slot="indicator" class="indicator">
          <view
            class="indicator__dot"
            v-for="(item, index) in swiperList"
            :key="index"
            :class="[index === currentNum && 'indicator__dot--active']"
          >
          </view>
        </view>
      </u-swiper>
    

      <!-- 店铺文字信息部分 -->
      <view class="store-content-box" v-if="commodityInfo">
        <view class="tig-img" v-if="commodityInfo.discountedPrice > 500">
          <image :lazy-load="true" :lazy-load-margin="0" :src="defTag"></image>
        </view>
        <!-- 第一行 -->
        <view class="title">
          <text class="name">{{ commodityInfo.name }}</text>
          <!-- <text class="tag"> 新品 </text> -->
        </view>
        <view class="hot-text">
          <view class="prod-text-info">
            <view class="price">
              <text class="price-value" v-if="commodityInfo.discountedPrice"
                >¥ {{ commodityInfo.discountedPrice }}</text
              >
              <text class="discount-text" v-if="commodityInfo.discountRatio"
                >{{ commodityInfo.discountRatio }}折</text
              >
              <text class="price-org"
                >原价 ¥ {{ commodityInfo.originalPrice }}</text
              >
              <text class="discount-sale" v-if="commodityInfo.salesVolume"
                >热销 {{ commodityInfo.salesVolume|handleNum }}</text
              >
            </view>
          </view>
        </view>
        <view class="line"></view>
        <view class="hot-sale-info">
          <view class="hot-sale-row">
            <text class="lable">限制 </text>
            <text class="value">{{ commodityInfo.limitation }} </text>
          </view>
          <view class="hot-sale-row">
            <text class="lable">须知 </text>
            <text class="value">{{ commodityInfo.notice }} </text>
          </view>
          <view class="hot-sale-row">
            <text class="lable">保障 </text>
            <text class="value">{{ commodityInfo.guarantee }}</text>
          </view>
          <view class="hot-sale-row">
            <text class="lable">购买须知 </text>
            <view class="more value" @click="goMore">
              <text>查看更多</text>
              <image
                :lazy-load="true"
                :lazy-load-margin="0"
                :src="defaultRight"
                class="right-icon"
              ></image>
            </view>
          </view>
        </view>
      </view>
      <u-gap height="12" bgColor="#F5F5F5"></u-gap>

      <storeBox
        @goShop="goShop"
        :shopInfo="shopInfo"
        @collectChange="collectChange"
        :isCollect="isCollect"
        :userType="user.userType"
      >
      </storeBox>
      <u-gap height="12" bgColor="#F5F5F5"></u-gap>
      <view class="comment-box">
        <view class="tab-header">
          <text> 用户评价({{ commentTotal }})</text>
          <text class="tab-header-tip" v-if="commentTotal == 0"
              >暂无评价</text
            >
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
        </view>
        <comment v-if="commentTotal>0" :commentData="commentData"></comment>
      </view>
      <u-gap height="12" bgColor="#F5F5F5"></u-gap>
      <view class="article-grid-box">
        <view class="tab-header">
          <text> 推荐({{ prods2.length }})</text>
          <text class="tab-header-tip" v-if="prods2.length == 0"
              >暂无推荐</text
            >
        </view>
        <commodity :showBtn="false" v-if="prods2.length>0" :prods="prods2"> </commodity>
        <!-- <articleGrid :prods="prods2"> </articleGrid -->
      </view>
    </view>
    <!-- 购买须知 -->
    <!-- <view class="notes-block">
      <view class="notes-title">购买须知</view>
      <view class="notes-content">
        <rich-text
          :nodes="commodityInfo.purchaseNotes"
          class="content"
        ></rich-text>
      </view>
    </view> -->
    <!-- <u-gap height="40" bgColor="#f1f1f1"></u-gap> -->
    <!-- tab切换 -->

    <view class="wrap">
      <!--评价  -->
      <!-- <view class="comment-box">
        <view class="tab-header">
          <text> 评价({{ commentTotal }})</text>
        </view>
        <comment :commentData="commentData"></comment>
        <view
          @click="goCommentMore"
          class="comment-more"
          v-if="commentTotal > 5"
          >查看更多</view
        >
      </view> -->
      <!-- 推荐 -->
      <!-- <view class="article-grid-box">
        <view class="tab-header">
          <text> 推荐({{ prods2.length }})</text>
        </view>
        <commodity :prods="prods2"> </commodity
      ></view> -->
      <commFootBtn :tel="sysTel" :shopId="shopId"></commFootBtn>
    </view>

  </view>
</template>

<script>
import comment from './../components/comment.vue'
// import articleGrid from './../components/articleGrid.vue'
import commodity from './../components/commodity.vue'
import commFootBtn from './../components/commFootBtn.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import {
  getCommodityDetail,
  getCommodityPage,
  mallShopById,
  shopCommentsPage,
} from '@/api/shop.js'
 
import storeBox from './../components/storeBox'
export default {
  components: {
    // articleGrid,
    comment,
    commodity,
    commFootBtn,
 
    storeBox,
  },
  data() {
    return {
      prods2: [],
      currentNum: 0,
      tel: '027-1551512',

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
      content: ``,
      shopId: '',
      commodityId: '',
      commodityInfo: null,
      size: 10,
      current: 1,
  
      commentData: [],
      commentTotal: 0,
      isCollect: false,
      user: {},
    }
  },
  computed: {
    ...mapGetters(['shopInfo']),
    navInfo() {
      return this.$store.state.comm.navInfo
    },
    sysTel(){
      return '027-123456'
    },
    defBack() {
      return this.$fileUrl + '/sysFile/ic_nav_arrow.png'
    },
    defStar() {
      return this.$fileUrl + '/sysFile/ic_xihuan_no.png'
    },
    defStarSelect() {
      return this.$fileUrl + '/sysFile/ic_xihuan_yes.png'
    },
    defaultRight() {
      return `${this.$fileUrl}/sysFile/ic_bian_arrow.png`
    },
    defTag() {
      return `${this.$fileUrl}/sysFile/img_xq_zhunxiang.png`
    },
  },
  onShow() {},
  onLoad(option) {
    this.user = uni.getStorageSync('user')
    this.shopId = option.shopId
    this.commodityId = option.Id
    this.getShopDetail()
    this.getCommodityInfo()
    this.getCommentsList()
    this.getCommodityRecommend()
  },
  onReachBottom() {
    this.current++
    this.getCommodityRecommend()
  },
  methods: {
    ...mapMutations(['setCommodityInfo', 'setShopInfo']),
    goMore(){
      uni.navigateTo({
        url: '/pages/mall/commodity/commodityIllustrate'
      })
    },
    goShop() {
      uni.navigateTo({
        url: '/pages/mall/store/storeDetails?id=' + this.shopId,
      })
    },
    navBack() {
      uni.navigateBack()
    },
    collectChange(e) {
      this.isCollect = !this.isCollect
    },
    async getShopDetail() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await mallShopById(this.shopId)
        this.setShopInfo(res.data)
        this.isCollect = res.data.ifCollect
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },
    goCommentMore() {
      uni.navigateTo({
        url: '/pages/mall/comment/comment?shopId=' + this.shopId,
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
    clickSwiper(index) {
      uni.previewImage({
			urls: this.swiperList.map(val=>val.url),
      current:index,loop:true,
		});
    },
    // 查看推荐商品
    async getCommodityRecommend() {
      try {
        let res = await getCommodityPage({
          current: this.current,
          size: this.size,
        })
        if (this.current == 1) {
          this.prods2 = res.data
        } else {
          this.prods2 = [...this.prods2, ...res.data]
        }
      } catch (e) {
        console.log(e)
      }
    },

    async getCommodityInfo() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await getCommodityDetail(this.commodityId)
        if (res.data.images && res.data.images.length > 0) {
          res.data.images.forEach((e) => {
            this.swiperList.push({
              url: e,
              type: 'image',
            })
          })
        }
        this.commodityInfo = res.data
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
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
  options: {
    styleIsolation: 'shared',
  },
}
</script>
<style lang="scss" scoped>
/deep/ .store-content {
  border-radius: 0 !important;
}
.comment-box {
  background: #fff;
}
.article-grid-box {
  background: #fff;
}

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
.article-grid-box {
  padding-bottom: 120rpx;
}
.store-block {
  width: 750rpx;
  // height: 739rpx;
}
.indicator-num {
  padding: 2px 0;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 100px;
  width: 35px;
  @include flex;
  justify-content: center;

  &__text {
    color: #ffffff;
    font-size: 12px;
  }
}

.store-content-box {
  padding-bottom: 20rpx;
  line-height: 34rpx;
  background: #fff;
  position: relative;
  .tig-img {
    position: absolute;
    right: 30rpx;
    top: -34rpx;
    image {
      width: 92rpx;
      height: 108rpx;
    }
  }

  .title {
    display: flex;
    justify-content: start;
    align-items: center;
    align-items: center;
    padding: 30rpx 30rpx 25rpx 30rpx;
    .name {
      max-width: 576rpx;

      color: #000;
      margin-right: 20rpx;

      font-size: 30rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 42rpx;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .tag {
      font-size: 20rpx;
      color: #10bf56;
      background: #eaeaea;
      border-radius: 15rpx;
      padding: 2rpx 5rpx;
    }
  }
  .hot-text {
    font-size: 36rpx;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: #333333;
    line-height: 42rpx;
    margin-left: 30rpx;
    margin-bottom: 25rpx;
    margin-right: 30rpx;
    .prod-text-info {
      .price {
        display: flex;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        .price-value {
          color: #ff6a13;
        }
        .price-org {
          text-decoration: line-through;

          font-size: 26rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #c0c0c0;
          line-height: 37rpx;
          margin-left: 18rpx;
        }
      }

      .discount-text {
        margin-left: 5rpx;

        width: 64rpx;
        height: 32rpx;
        background: #ea531c;
        border-radius: 5rpx;
        font-size: 20rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 28rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .discount-sale {
        margin-left: auto;

        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #888888;
        line-height: 37rpx;
      }
    }
  }
  .line {
    width: 750rpx;
    height: 1rpx;
    border-top: 2rpx solid #eeeeee;
  }

  .hot-sale-info {
    margin-top: 20rpx;
    margin-left: 30rpx;
    .hot-sale-row {
      font-size: 26rpx;
      margin-bottom: 10rpx;
      line-height: 37rpx;display: flex;
    align-items: center;
      .lable {
        font-weight: 600;
        color: #333333;
        margin-right: 30rpx;
      }
      .value {
        color: #888888;
      }
      .more {
        image {
          width: 16rpx;
          height: 24rpx;
          margin-left: 10rpx;
        }
      }
    }
  }
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
</style>
