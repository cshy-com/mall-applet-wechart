<template>
  <view>
    <view class="empty" v-if="!list || list.length == 0">
      <u-empty
        mode="data"
        marginTop="120"
        iconSize="140"
        textSize="32"
        :text="'暂无数据'"
      >
      </u-empty>
    </view>
    <view v-else>
      <view
        class="store-list"
        v-for="item in list"
        :key="item.id"
        @tap="($event) => goEvent(item)"
      >
        <!-- 左边图片 -->
        <view class="store-list-left">
          <image
            :lazy-load="true"
            :lazy-load-margin="0"
            class="avater"
            :src="item.mainImage || defaultImg"
            :mode="'aspectFill'"
          ></image>
          <view class="cover-box">
            <image
              :lazy-load="true"
              :lazy-load-margin="0"
              :src="fileUrl + '/sysFile/bg3.png'"
              class="cover"
            ></image>
          </view>
        </view>
        <!-- 右边介绍 -->
        <view class="store-list-right">
          <!-- 第一行 -->
          <view class="title">
            <text class="name">{{ item.name }}</text>
            <view class="tag"> 可用积分 </view>
          </view>
          <view class="score">
            <view class="rate-left"
              ><u-rate
                activeColor="#FFC64F"
                :count="count"
                readonly
                :value="item.score"
                size="32"
              ></u-rate>
            </view>
          </view>
          <view class="type">
            <text class="text">{{ item.secondTypeName }}</text>
            <text class="text">{{ item.areaName }}</text>
          </view>
          <view
            class="certificate-row"
            v-for="coupon in item.couponList"
            :key="coupon.id"
          >
            <!-- <view class="left-icon"> 券 </view> -->
            <text class="price"> ¥{{ coupon.price }} </text>
            <text class="value"> {{ coupon.total }}积分 </text>
          </view>
        </view>
      </view>
    </view></view
  >
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')

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
      defaultImg: require('@/static/img/default.png'),
    }
  },
  created() {},
  computed: {
    fileUrl() {
      return this.$fileUrl
    },
  },
  methods: {
    ...mapMutations(['setShopInfo']),
    goEvent(item) {
      this.setShopInfo(item)
      uni.navigateTo({
        url: '/pages/subPack/merchant/storeDetails?id=' + item.id,
      })
    },
    scrolltolower(e) {
      this.$emit('scrolltolower', e)
    },
  },
}
</script>

<style lang="scss" scoped>
.store-list {
  display: flex;
  justify-content: flex-start;
  align-items: top;
  font-size: 32rpx;
  color: #333;
  padding: 0 24rpx;
  margin-bottom: 22rpx;
  .store-list-left {
    width: 244rpx;
    height: 254rpx;
    position: relative;
    image {
      width: 100%;
      height: 100%;
      border-radius: 20rpx 0 0 20rpx;
      will-change: transform;
    }
    .cover-box {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 66;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cover {
      width: 240rpx;
      height: 250rpx;
    }
  }
  .store-list-right {
    line-height: 34rpx;
    flex: 1;
    position: relative;
    left: 0;

    background: #fff;
    border-radius: 0 12rpx 12rpx 0;
    padding: 20rpx;
    .title {
      display: flex;
      justify-content: start;
      align-items: center;
      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 268rpx;
        font-size: 36rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #000000;
        line-height: 50rpx;
      }
      .tag {
        background: rgba(58, 108, 186, 0.14);
        border-radius: 20rpx 0px 20rpx 0px;
        font-size: 22rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: $base-bg-blue;
        line-height: 22px;
        width: 136rpx;
        height: 40rpx;
        margin-left: auto;
        text-align: center;
      }
    }
    .score {
      display: flex;
      justify-content: start;
      align-items: center;
      margin: 6rpx 0 10rpx 0;
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
      display: flex;
      margin-bottom: 6rpx;
      .text {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 34rpx;
        margin-right: 20rpx;
      }
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

      align-items: center;
      margin-top: 10rpx;
      .left-icon {
        font-size: 24rpx;
        font-family: PingFangSC-Medium, PingFang SC;

        color: #912d17;
        line-height: 34rpx;
        width: 36rpx;
        height: 36rpx;
        background: #feeeee;
        border-radius: 4rpx;
        text-align: center;
      }
      .price {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #912d17;
        line-height: 34rpx;
        margin: 0 20rpx 0 10rpx;
      }
      .value {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 34rpx;
      }
    }
  }
}
.empty {
  margin-top: 120rpx;
  padding-bottom: 120rpx;
}
</style>
