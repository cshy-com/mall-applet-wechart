<template>
  <view>
    <view class="hot-sale" v-if="prods && prods.length">
      <view class="hotsale-item-cont">
        <block v-for="(prod, index2) in prods" :key="index2">
          <view
            class="prod-items"
            @tap="toProdPage(prod.prodid)"
            :data-prodid="prod.prodId"
          >
            <view class="hot-imagecont">
              <image
                :lazy-load="true"
                :lazy-load-margin="0"
                :src="require('@/static/img/test5.png')"
                class="hotsaleimg"
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
            <view class="hot-text">
              <view class="hotprod-text">{{ prod.prodName }}</view>

              <view class="prod-text-info">
                <view class="price">
                  <text class="symbol">￥</text>
                  <text class="big-num">{{ prod.price[0] | parsePrice }}</text>
                </view>
                <view class="basket-img">
                  <text class="iconfont icon-dianzan-weijujiao"></text>
                  <text class="zan-num">123</text>
                </view>
              </view>
            </view>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    fileUrl() {
      return this.$fileUrl
    },
  },
  props: {
    prods: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
<style lang="scss" scoped>
.hot-sale {
  .prod-items {
    display: inline-block;
    box-sizing: border-box;
    width: 342rpx;
    .hot-text .hotprod-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 10rpx;
      font-weight: 600;
      color: #333333;
      font-size: 28rpx;
    }
    .hot-imagecont {
      font-size: 0;
      text-align: center;
      width: 342rpx;
      height: 356rpx;
      position: relative;
      .hotsaleimg {
        width: 341rpx;
        height: 356rpx;
        border-radius: 20rpx 20rpx 0 0;

        z-index: 1;
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
        width: 334rpx;
        height: 348rpx;
      }
    }
    .hot-text {
      font-size: 28rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 40rpx;
      background: #fff;
      position: relative;
      background: #fff;
      padding-left: 14rpx;
      padding-top: 14rpx;
      border-radius: 0 0 12rpx 12rpx;
      height: 140rpx;
      .prod-text-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price .symbol {
          font-size: 16rpx;
          font-weight: 600;
          color: #912d17;
          line-height: 22rpx;
        }
        .price .big-num {
          font-size: 32rpx;
          font-weight: 600;
          line-height: 22rpx;
          color: #912d17;
        }
        .zan-num {
          font-size: 24rpx;
          font-weight: 400;
          color: #000000;
          line-height: 34rpx;
          margin-left: 4rpx;
          margin-right: 20rpx;
        }
        .basket-img {
          display: flex;
          align-items: center;
        }
        .basket-img .iconfont {
          font-size: 44rpx;
          color: #000;
        }
      }
    }
  }
  .prod-items:nth-child(2n-1) {
    margin: 0rpx 20rpx 20rpx 24rpx;
  }
}

.prod-items .hot-text .prod-info,
.more-prod .prod-text-right .prod-info {
  font-size: 22rpx;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
