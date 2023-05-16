<template>
  <view>
    <!-- 店家部分 -->

    <view
      class="store-list"
      v-for="item in list"
      :key="item.id"
      @tap="($event) => goEvent(item)"
    >
      <!-- 左边图片 -->
      <view class="store-list-left">
        <image class="avater" :src="item.shopAvater"></image>
      </view>
      <!-- 右边介绍 -->
      <view class="store-list-right">
        <!-- 第一行 -->
        <view class="title">
          <text class="name">{{ item.shopName }}</text>
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
              v-model="item.rate"
            ></u-rate
            ><text class="rate">{{ item.rate }}</text>
          </view>
          <text class="value">{{ item.totalComent }}条</text>
          <text class="value">¥{{ item.averagePrice }}/人</text>
        </view>
        <text class="type">{{ item.characteristic }}</text>
        <view class="comment">
          <view class="icon">
            <image src="/static/img/cate/comment.png"></image>
          </view>
          <text class="number"> {{ item.ranking }} </text>
          <text class="identifying" v-if="item.canCoupon"> 可用消费券 </text>
        </view>

        <view
          class="certificate-row"
          v-for="coupon in item.couponList"
          :key="coupon.id"
        >
          <view class="left-icon">
            <image src="/static/img/cate/certificate.png"></image>
          </view>
          <text class="price"> ¥{{ coupon.price }} </text>
          <text class="value"> {{ coupon.total }}代金券 </text>
        </view>
      </view>
    </view></view
  >
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      value: 4.6,
      count: 5,
    }
  },
  methods: {
    goEvent(item) {
      this.$emit('eventParent', item)
    },
  },
}
</script>

<style lang="scss">
.store-list {
  display: flex;
  justify-content: flex-start;
  align-items: top;
  font-size: 32rpx;
  color: #333;
  padding: 0 20rpx;
  background: #fff;
  padding-right: 0;
  padding-bottom: 20rpx;
  .store-list-left {
    width: 180rpx;
    height: 180rpx;
    margin-top: 10rpx;
    image {
      width: 100%;
      height: 100%;
      border-radius: 20rpx;
    }
  }
  .store-list-right {
    margin-left: 20rpx;
    border-bottom: 1rpx solid #f5f2f2;
    padding-bottom: 20rpx;
    line-height: 34rpx;
    flex: 1;
    .title {
      display: flex;
      justify-content: start;
      align-items: center;
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
    }
    .comment {
      display: flex;
      align-items: center;
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
    .certificate-row {
      display: flex;
      margin-top: 12rpx;
      align-items: center;
      .left-icon {
        width: 40rpx;
        height: 40rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .price {
        color: rgb(248, 108, 47);
        margin: 0 10rpx;
        font-size: 24rpx;
      }
      .value {
        font-size: 24rpx;
      }
    }
  }
}
</style>
