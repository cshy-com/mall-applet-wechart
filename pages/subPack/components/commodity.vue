<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-12 11:00:49
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-05 17:08:59
 * @FilePath: \mall-applet\pages\components\articleGrid.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="">
    <block>
      <!-- 商城热卖 -->
      <view class="article-block">
        <view class="empty" v-if="!prods || prods.length == 0">
          <u-empty
            mode="data"
            marginTop="120"
            iconSize="140"
            textSize="32"
            :text="'暂无数据'"
          >
          </u-empty>
        </view>

        <view class="article-item-cont" v-else>
          <block v-for="(prod, index2) in prods" :key="index2">
            <view
              class="prod-items"
              @tap="toProdPage(prod)"
              :data-prodid="prod.prodId"
            >
              <view class="hot-imagecont">
                <!-- prod.pic -->
                <image
                  :lazy-load="true"
                  :lazy-load-margin="0"
                  :showLoading="true"
                  :mode="'aspectFill'"
                  :src="prod.mainImage"
                  class="articleimg"
                ></image>
              </view>
              <view class="hot-text">
                <view class="hotprod-text">{{ prod.name }}</view>
                <!-- <view class="prod-info">{{prod.brief}}</view> -->
                <view class="prod-text-info">
                  <view class="price">
                    <text class="price-value">{{ prod.discountedPrice }}</text>
                    <text class="price-org">{{ prod.originalPrice }}</text>
                    <view class="btn">
                      <u-button
                        class="btn-value"
                        text="抢购"
                        size="small"
                      ></u-button>
                    </view>
                  </view>
                  <view class="discount">
                    <text class="discount-text" v-if="prod.discountRatio"
                      >{{ prod.discountRatio }}折</text
                    >
                    <text class="discount-sale"
                      >销量 {{ prod.salesVolume }} +</text
                    >
                  </view>
                </view>
              </view>
            </view>
          </block>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
export default {
  data() {
    return {}
  },
  props: {
    prods: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations(['setCommodityInfo']),
    toProdPage(e) {
      this.setCommodityInfo(e)
      uni.navigateTo({
        url: `/pages/subPack/merchant/commodityDetail?Id=${e.id}&shopId=${e.shopId}`,
      })
    },
  },
}
</script>

<style lang="scss">
.article-block .prod-items {
  display: inline-block;
  background: #fff;
  box-sizing: border-box;
  width: 342rpx;
  padding-bottom: 20rpx;
  background: #ffffff;
  border-radius: 12rpx;
  .hot-imagecont {
    font-size: 0;
    text-align: center;
    width: 341rpx;
    height: 260rpx;
    image {
      width: 100%;
      height: 100%;
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
    .hotprod-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 10rpx;
    }
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
        .btn {
          button {
            background: #ff6a13;
            border-radius: 30rpx;
            color: #fff;
            width: 30rpx;
            height: 46rpx;
          }
        }
      }
      .zan-num {
        font-size: 24rpx;
        font-weight: 400;
        color: #000000;
        line-height: 34rpx;
        margin-left: 4rpx;
        margin-right: 20rpx;
      }
      .discount {
        display: flex;
        align-items: center;
        font-size: 20rpx;
        color: #999;
        font-weight: 400;
        display: flex;
        justify-content: space-between;
        .discount-text {
          background: #ffe6c7;
          color: #ff6a13;
          padding: 5rpx 10rpx;
          border-radius: 10rpx;
          line-height: 20rpx;
        }
        .discount-sale {
          margin-right: 20rpx;
        }
      }
    }
  }
}

.article-block .prod-items:nth-child(2n-1) {
  margin: 0rpx 20rpx 20rpx 24rpx;
}
.prod-items .hot-text .prod-info,
.more-prod .prod-text-right .prod-info {
  font-size: 22rpx;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.zan-icon {
  width: 50rpx;
  height: 50rpx;
}
</style>
