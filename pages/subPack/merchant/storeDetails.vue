<template>
  <view>
    <view class="store-block">
      <!-- #ifndef APP-NVUE || MP-TOUTIAO -->
      <u-swiper
        :list="swiperList"
        previousMargin="5"
        nextMargin="5"
        circular
        :autoplay="false"
        radius="5"
        bgColor="#ffffff"
        keyName="url"
        height="220"
        :displayMultipleItems="swiperList.length > 3 ? 2.5 : 1"
      ></u-swiper>
      <!-- #endif -->
      <!-- 店铺文字信息部分 -->
      <view class="store-content-box">
        <!-- 第一行 -->
        <view class="title">
          <text class="name">{{ shopInfo.name }}</text>
          <view class="tag">
            <image
              :lazy-load="true"
              :lazy-load-margin="0"
              src="/static/img/cate/tag.png"
            ></image>
          </view>
          <view class="star" @click="getCollect">
            <u-icon
              :name="isCollect ? 'star-fill' : 'star'"
              :color="isCollect ? '#ff6a13' : '#333'"
              size="28"
            ></u-icon>
            <text class="star-text">{{ isCollect ? '取消收藏' : '收藏' }}</text>
          </view>
        </view>
        <view class="score">
          <view class="rate-left"
            ><u-rate
              activeColor="#FFC64F"
              readonly
              :count="count"
              :value="shopInfo.score"
              size="32"
            ></u-rate
            ><text class="rate">{{ shopInfo.score | toRate }}</text>
          </view>
          <text class="value">{{ shopInfo.totalComent || 123 }}条</text>
          <text class="value">¥{{ shopInfo.perCapitaConsumption }}/人</text>
        </view>
        <view class="type">
          <text class="type-value"
            >口味{{ shopInfo.tasteRating | toRate }}
          </text>
          <text class="type-value"
            >环境{{ shopInfo.environmentalRating | toRate }}</text
          >
          <text class="type-value"
            >服务{{ shopInfo.serviceRating | toRate }}</text
          >
          <text class="type-name">{{ shopInfo.characteristic }}</text>
          <text class="type-name">{{ shopInfo.areaName }}</text>
        </view>

        <view class="comment">
          <!-- <view class="icon">
            <image
              :lazy-load="true"
              :lazy-load-margin="0"
              src="/static/img/cate/comment.png"
            ></image>
          </view>
          <text class="number"> {{ shopInfo.ranking }} </text> -->
          <text class="identifying"> 可用积分 </text>
        </view>
        <view class="shop-time">
          <view class="status-time">
            <text class="lable">营业中</text>
            <text class="value"
              >{{ shopInfo.businessHoursStart }}-{{
                shopInfo.businessHoursEnd
              }}</text
            >
          </view>
          <!-- <view class="tag">
            <text class="tag-value" v-for="item in tags" :key="item.id">{{
              item
            }}</text>
          </view> -->
        </view>
        <view class="address">
          <text class="text">{{ shopInfo.address }}</text>
        </view>
        <view class="platform-tip">
          <text> * 增加折扣率不高于其他平台</text>
        </view>
      </view>
    </view>
    <u-gap height="40" bgColor="#f1f1f1"></u-gap>
    <!-- tab切换 -->
    <view class="shop-tab">
      <text class="shop-tab-text" @tap="tab(0)">菜品</text>
      <text class="shop-tab-text" @tap="tab(1)">评价</text>
      <text class="shop-tab-text" @tap="tab(2)">推荐</text>
    </view>
    <view class="wrap">
      <!-- 店铺商品 -->
      <view class="commodity-box">
        <view class="tab-header">
          <text> 推荐菜({{ prods.length }})</text>
        </view>
        <commodity :prods="prods"> </commodity>
      </view>
      <!--评价  -->
      <view class="comment-box">
        <view class="tab-header">
          <text> 评价(10)</text>
        </view>
        <comment></comment
      ></view>
      <!-- 推荐 -->
      <view class="article-grid-box">
        <view class="tab-header">
          <text> 推荐({{ prods2.length }})</text>
        </view>
        <commodity :prods="prods2"> </commodity>
        <!-- <articleGrid :prods="prods2"> </articleGrid -->
        ></view
      >
      <!-- 底部操作按钮 -->
      <commFootBtn :tel="shopInfo.tel"></commFootBtn>
    </view>
  </view>
</template>

<script>
import comment from './../components/comment.vue'
import articleGrid from './../components/articleGrid.vue'
import commodity from './../components/commodity.vue'
import dataArr from './index.js'
import commFootBtn from './commFootBtn.vue'
import { createNamespacedHelpers } from 'vuex'
import {
  mallShopById,
  mallShopCollectAdd,
  mallShopCollectDel,
  getCommodityList,
  getCommodityPage,
} from '@/api/shop.js'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')

export default {
  components: {
    articleGrid,
    comment,
    commodity,
    commFootBtn,
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
    }
  },
  computed: {
    ...mapGetters(['shopInfo']),
  },
  onLoad(option) {
    this.shopId = option.id
    this.getShopDetail()
    this.getCommodityList()
    this.getCommodityRecommend()
  },
  onShow() {
    // this.swiperList = this.shopInfo?.shopList || this.swiperList
  },
  onReachBottom() {
    this.current++
    this.getCommodityRecommend()
  },
  methods: {
    ...mapMutations(['setCommodityInfo', 'setShopInfo']),

    async getCollect() {
      let http = this.isCollect ? mallShopCollectDel : mallShopCollectAdd
      try {
        await http(this.shopId)
        this.isCollect = !this.isCollect
        this.$tip.toast(this.isCollect ? '收藏成功' : '已取消收藏')
      } catch (e) {
        console.log(e)
      }
    },
    async getShopDetail() {
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
.store-block {
  padding: 20rpx;
}
.store-content-box {
  padding-bottom: 20rpx;
  line-height: 34rpx;

  .title {
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 20rpx 0;
    .name {
      max-width: 356rpx;
      font-size: 36rpx;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #000;
      margin-right: 20rpx;
    }
    .tag {
      width: 40rpx;
      height: 40rpx;
      image {
        width: 100%;
        height: 100%;
        will-change: transform;
      }
    }
  }
  .score {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 10rpx;
    .rate-left {
      display: flex;
    }
    .rate {
      color: #ffc64f;
      font-size: 30rpx;
      margin-left: 10rpx;
    }
    .value {
      margin-left: 20rpx;
      font-size: 24rpx;
    }
  }
  .type {
    color: #333;
    font-size: 24rpx;
    display: flex;
    align-content: center;
    justify-content: flex-start;
    margin-bottom: 10rpx;
    .type-value {
      margin-right: 20rpx;
    }
    .type-name {
      margin-left: 50rpx;
    }
  }
  .comment {
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #f5f2f2;
    margin-bottom: 10rpx;
    .icon {
      width: 116rpx;
      height: 40rpx;
      image {
        width: 100%;
        height: 100%;
        will-change: transform;
      }
    }
    .number {
      background: rgb(256, 236, 223);
      padding: 4rpx;
      font-size: 20rpx;
      color: rgb(181, 149, 125);
    }
    .identifying {
      font-size: 20rpx;
      background: rgb(245, 245, 245);
      padding: 4rpx;
    }
  }
  .shop-time {
    border-bottom: 1rpx solid #f5f2f2;
    margin-bottom: 10rpx;
    .status-time {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      .lable {
        font-size: 28rpx;
        color: #000;
        font-weight: 600;
      }
      .value {
        font-size: 24rpx;
        color: #000;
        margin-left: 10rpx;
      }
    }
    .tag {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      flex-wrap: wrap;
      .tag-value {
        font-size: 24rpx;
        color: #545454;
        padding: 5rpx;
        background: #eaeaea;
        border-radius: 5rpx;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
      }
    }
  }
  .address {
    margin-top: 10rpx;
    .text {
      font-size: 28rpx;
      color: #000;
      font-weight: 600;
    }
  }
}

.shop-tab {
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 20rpx;
  padding: 20rpx 100rpx;
  .shop-tab-text {
    font-size: 28rpx;
    color: #000;
    font-weight: 600;
  }
}
.article-grid-box {
  padding-bottom: 80rpx;
}

.tab-header {
  font-size: 30rpx;
  border-left: 6rpx solid #ff6a13;
  padding-left: 14rpx;
  margin: 20rpx 20rpx 20rpx 20rpx;
  line-height: 30rpx;
  font-weight: 600;
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
.platform-tip {
  font-size: 24rpx;
  color: #000;
  border-top: 1px solid #e6e6e6;
  padding-top: 10rpx;
  margin-top: 10rpx;
}
</style>
