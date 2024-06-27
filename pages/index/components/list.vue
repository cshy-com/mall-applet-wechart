<template>
  <view>
    <view class="hot-sale" v-if="prods && prods.length">
      <view class="hotsale-item-cont"
        ><scroll-view>
          <block v-for="(prod, index2) in prods" :key="index2">
            <view
              class="prod-items"
              @tap="toProdPage(prod)"
              :data-prodid="prod.prodId"
            >
              <view class="hot-imagecont">
                <image
                  v-show="prod.mainImage"
                  :lazy-load="true"
                  :lazy-load-margin="0"
                  :src="prod.mainImage"
                  class="hotsaleimg"
                  :showLoading="true"
                  :mode="'aspectFill'"
                ></image>
                <text class="hot-sale-value">
                  热销 {{ prod.salesVolume | handleNum }}
                </text>
              </view>
              <view class="hot-text">
                <view class="hotprod-text">
                  <image
                    class="icon"
                    v-if="prod.discountedPrice > 500"
                    :src="defIcon"
                    mode="aspectFit"
                    lazy-load="false"
                    binderror=""
                    bindload=""
                  >
                  </image>
                  <text class="def"> {{ prod.name }}</text>
                  <!-- <text class="tip">可用积分</text> -->
                </view>

                <view class="prod-text-info">
                  <text class="price">¥{{ prod.discountedPrice }}</text>

                  <text class="big-num">原价：¥{{ prod.originalPrice }}</text>

                  <!-- <view class="basket-img">
                   
                    <text class="zan-num">+</text>
                  </view> -->
                </view>
              </view>
            </view>
          </block>
        </scroll-view>
      </view>
    </view>
    <noMore v-if="more == 'noMore'"></noMore>
  </view>
</template>
<script>
import noMore from '@/components/noMore.vue'
export default {
  data() {
    return {}
  },
  components: {
    noMore,
  },
  computed: {
    defIcon() {
      return this.$fileUrl + '/sysFile/ic_pinzhi.png'
    },
  },
  props: {
    prods: {
      type: Array,
      default: () => [],
    },
    more: {
      type: String,
      default: 'more',
    },
  },
  filters: {
    
  },

  methods: {
    toProdPage(e) {
      this.$emit('eventParent', e)
    },
  },
}
</script>
<style lang="scss" scoped>
.hot-sale {
  .prod-items {
    display: inline-block;
    box-sizing: border-box;
    width: 357rpx;
    .hot-text .hotprod-text {
      margin-bottom: 10rpx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .icon {
        width: 30rpx;
        height: 30rpx;
        margin-right: 5rpx;
      }
      .tip {
        font-size: 22rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 30rpx;
      }
      .def {
        font-size: 30rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 42rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 300rpx;
      }
    }
    .hot-imagecont {
      font-size: 0;
      text-align: center;
      width: 357rpx;
      height: 357rpx;
      position: relative;
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-image: $app-load-gif;
      background-color: #f5f5f5;
      border-radius: 15rpx 15rpx 0 0;
      .hotsaleimg {
        width: 100%;
        height: 100%;
        border-radius: 15rpx 15rpx 0 0;
        z-index: 1;
        will-change: transform;
      }
      .hot-sale-value {
        position: absolute;
        line-height: 28rpx;
        background: #ea531c;
        border-radius: 5rpx;
        right: 14rpx;
        bottom: 10rpx;
        font-size: 20rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        display: flex;
        padding: 2rpx 15rpx;
        justify-content: center;
        align-items: center;
      }
    }
    .hot-text {
      font-family: PingFangSC-Medium, PingFang SC;

      background: #fff;
      position: relative;

      padding: 18rpx 20rpx 25rpx 20rpx;

      border-radius: 0px 0px 14rpx 14rpx;

      .prod-text-info {
        display: flex;
        align-items: center;

        .big-num {
          margin-left: 4rpx;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #c0c0c0;
          line-height: 42rpx;
          text-decoration: line-through;
        }

        .price {
          font-size: 36rpx;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #333333;
          line-height: 42rpx;
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
    margin: 0rpx 12rpx 12rpx 12rpx;
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
