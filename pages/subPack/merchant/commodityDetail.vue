<template>
  <view>
    <view class="store-block">
      <!-- #ifndef APP-NVUE || MP-TOUTIAO -->
      <u-swiper
        :list="list4"
        @change="(e) => (currentNum = e.current)"
        :autoplay="false"
        indicatorStyle="right: 20px"
        height="220"
      >
        <view slot="indicator" class="indicator-num">
          <text class="indicator-num__text"
            >{{ currentNum + 1 }}/{{ list4.length }}</text
          >
        </view>
      </u-swiper>
      <!-- #endif -->
      <!-- 店铺文字信息部分 -->
      <view class="store-content-box">
        <!-- 第一行 -->
        <view class="title">
          <text class="name">寻味巴蜀2-3人餐</text>
          <text class="tag"> 新品 </text>
        </view>
        <view class="hot-text">
          <view class="prod-text-info">
            <view class="price">
              <text class="price-value">¥ 168</text>
              <text class="discount-text">8.1折</text>
              <text class="price-org">¥ 200</text>
              <text class="discount-sale">半年售 800 +</text>
            </view>
          </view>
        </view>

        <view class="hot-sale-info">
          <view class="hot-sale-row">
            <text class="lable">限制 </text>
            <text class="value">商品每桌限用1张券 </text>
          </view>
          <view class="hot-sale-row">
            <text class="lable">须知 </text>
            <text class="value">周一至周日可用 </text>
          </view>
          <view class="hot-sale-row">
            <text class="lable">保障 </text>
            <text class="value">随时退·过期自动退 </text>
          </view>
        </view>
      </view>
    </view>
    <!-- 购买须知 -->
    <view class="notes-block">
      <view class="notes-title">购买须知</view>
      <view class="notes-content">
        <view class="notes-row">
          <text class="lable">有效期</text>
          <text class="value">2023.4.10至2026.4.10 23:59</text>
        </view>
        <view class="notes-row">
          <text class="lable">使用时间</text>
          <text class="value">营业时间内可用</text>
        </view>
        <view class="notes-row">
          <text class="lable">使用规则</text>
          <text class="value"> · 可使用包间</text>
          <text class="value"> · 本单发票由商家提供，详情请咨询商家</text>
          <text class="value"> · 仅限堂食</text>
          <text class="value"> · 团购用户不可同时享受商家的其他优惠</text>
          <text class="value">
            · 饮料酒水等问题，请致电商家咨询，以商家反馈为准</text
          >
          <text class="value">
            ·如部分菜品因时令或其他不可抗拒因素导致无法提供，商家会用等价菜品替换，具体事宜请与商家协商</text
          >
          <text class="value">
            · 使用团购券购买团单，有效期以优惠券规则为准</text
          >
          <text class="value"> · 每桌最多使用1张美团券</text>
          <text class="value"> · 无需预约，消费高峰期可能需要等位</text>
        </view>
        <view class="notes-row">
          <text class="lable">价格和销量说明</text>
          <text class="value"
            >价格公开透明价格公开透明价格公开透明价格公开透明价格公开透明价格公开透明</text
          >
        </view>
      </view>
    </view>
    <u-gap height="40" bgColor="#f1f1f1"></u-gap>
    <!-- tab切换 -->

    <view class="wrap">
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
      <commFootBtn :tel="tel"></commFootBtn>
    </view>
  </view>
</template>

<script>
import comment from './../components/comment.vue'
import articleGrid from './../components/articleGrid.vue'
import commodity from './../components/commodity.vue'
import dataArr from './index.js'
import commFootBtn from './commFootBtn.vue'
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
      currentNum: 0,
      tel: '027-1551512',

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
      font-size: 20rpx;
      color: #10bf56;
      background: #eaeaea;
      border-radius: 15rpx;
      padding: 2rpx 5rpx;
    }
  }
  .hot-text {
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 40rpx;
    margin-top: 16rpx;
    margin-left: 14rpx;

    .prod-text-info {
      .price {
        display: flex;
        justify-content: flex-start;
        align-content: center;
        .price-value {
          color: #ff6a13;
        }
        .price-org {
          font-size: 24rpx;
          color: #a2a2a2;
          line-height: 34rpx;
          margin: 0 60rpx 0 15rpx;
          text-decoration: line-through;
          font-weight: 400;
        }
      }

      .discount-text {
        background: #ffe6c7;
        color: #ff6a13;
        padding: 5rpx 10rpx;
        border-radius: 10rpx;
        line-height: 30rpx;
        font-size: 20rpx;
        margin-left: 20rpx;
      }
      .discount-sale {
        margin-right: 20rpx;
        font-size: 24rpx;
        color: #a2a2a2;
        line-height: 34rpx;
        margin: 0 60rpx 0 15rpx;

        font-weight: 400;
      }
    }
  }
  .hot-sale-info {
    margin-top: 20rpx;
    .hot-sale-row {
      font-size: 24rpx;
      margin-bottom: 10rpx;
      .lable {
        font-size: 26rpx;
        font-weight: 600;
        margin-right: 20rpx;
      }
      .value {
        color: #333;
      }
    }
  }
}

.tab-header {
  font-size: 30rpx;
  border-left: 6rpx solid #ff6a13;
  padding-left: 14rpx;
  margin: 20rpx 20rpx 20rpx 20rpx;
  line-height: 30rpx;
  font-weight: 600;
}
.notes-block {
  .notes-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #000;
    margin: 20rpx;
  }
  .notes-content {
    margin: 20rpx;
    background: #fff;
    border-radius: 15rpx;
    padding: 20rpx;
    .notes-row {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #f1f1f1;
      .lable {
        font-size: 24rpx;
        font-weight: 600;
        margin-top: 10rpx;
      }
      .value {
        font-size: 24rpx;
        color: #333;
        margin-bottom: 10rpx;
      }
    }
  }
}
</style>
