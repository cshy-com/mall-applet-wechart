<template>
  <view>
    <view class="store-block">
      <!-- #ifndef APP-NVUE || MP-TOUTIAO -->
      <u-swiper
        :list="list4"
        previousMargin="5"
        nextMargin="5"
        circular
        :autoplay="false"
        radius="5"
        bgColor="#ffffff"
        keyName="url"
        height="220"
        displayMultipleItems="2.5"
      ></u-swiper>
      <!-- #endif -->
      <!-- 店铺文字信息部分 -->
      <view class="store-content-box">
        <!-- 第一行 -->
        <view class="title">
          <text class="name">店铺名称名称</text>
          <view class="tag">
            <image src="/static/img/cate/tag.png"></image>
          </view>
        </view>
        <view class="score">
          <view class="rate-left"
            ><u-rate
              activeColor="#FA6B31"
              disabled
              :count="count"
              v-model="value"
            ></u-rate
            ><text class="rate">4.6</text>
          </view>
          <text class="value">790条</text>
          <text class="value">¥83/人</text>
        </view>
        <view class="type">
          <text class="type-value">口味4.7 环境4.8 服务4.8</text>
          <text class="type-name">川菜管</text>
        </view>

        <view class="comment">
          <view class="icon">
            <image src="/static/img/cate/comment.png"></image>
          </view>
          <text class="number"> 武昌区川菜环境榜第一名 </text>
          <text class="identifying"> 可用消费券 </text>
        </view>
        <view class="shop-time">
          <view class="status-time">
            <text class="lable">营业中</text>
            <text class="value">11:00-20:30</text>
          </view>
          <view class="tag">
            <text class="tag-value" v-for="item in tags" :key="item.id">{{
              item
            }}</text>
          </view>
        </view>
        <view class="address">
          <text class="text">湖北省武汉市武昌区世贸商城F区3楼</text>
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
          <text> 推荐菜(5)</text>
        </view>
        <commodity :prods="prods" @eventParent="toProdPage"> </commodity>
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
          <text> 推荐(6)</text>
        </view>
        <articleGrid :prods="prods2"> </articleGrid
      ></view>
      <!-- 底部操作按钮 -->
      <commFootBtn :tel="'027-15152142'"></commFootBtn>
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
      prods: dataArr.shopProds,
      prods2: dataArr.prods,
      list4: [
        {
          url: 'https://cdn.uviewui.com/uview/resources/video.mp4',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东',
          poster: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
          type: 'video',
        },
        {
          url: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          title: '身无彩凤双飞翼，心有灵犀一点通',
          type: 'image',
        },
        {
          url: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
        },
        {
          url: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          title: '身无彩凤双飞翼，心有灵犀一点通',
          type: 'image',
        },
        {
          url: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
        },
      ],
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
    }
  },
  methods: {
    ...mapGetters(['getShopInfo']),
    toProdPage() {
      debugger
      uni.navigateTo({ url: '/pages/subPack/merchant/commodityDetail' })
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
      width: 356rpx;
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
      color: rgb(181, 149, 125);
      font-size: 20rpx;
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
      }
    }
    .number {
      background: rgb(256, 236, 223);
      padding: 4rpx;
      font-size: 20rpx;
      color: rgb(181, 149, 125);
    }
    .identifying {
      margin-left: 10rpx;
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
</style>
