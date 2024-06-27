<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-12 11:00:49
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-30 09:32:23
 * @FilePath: \mall-applet\pages\components\articleGrid.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="">
    <block>
      <!-- 商城热卖 -->
      <view class="article-block">
        <view class="empty" v-if="!prods || prods.length == 0">
          <nodata
      :config="{
                  content: '暂无数据',
                  height:'400rpx',
                  background:'#fff'
                }"
      >
      </nodata>
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
                <view class="discount-sale"> 销量 {{ prod.salesVolume }} </view>
                <view class="prod-text-info">
                  <view class="price">
                    <text class="price-value">¥ {{ prod.discountedPrice }}</text>
                    <text class="discount-text" v-if="prod.discountRatio"
                      >{{ prod.discountRatio }}折</text
                    >
                    <text class="price-org">原价 ¥ {{ prod.originalPrice }}</text>
                  </view>
                  <view class="btn" v-if="showBtn" >
                    <button class="btn-value" text="" size="small">预定</button>
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
    showBtn:{
      type:Boolean,
      default:true
    }
    
  },
  methods: {
    ...mapMutations(['setCommodityInfo']),
    toProdPage(e) {
      this.setCommodityInfo(e)
      uni.navigateTo({
        url: `/pages/mall/commodity/commodityDetail?Id=${e.id}&shopId=${e.shopId}`,
      })
    },
  },
}
</script>

<style lang="scss">
.article-item-cont {
  padding: 30rpx;
  background: #fff;
  padding-bottom: 0;
 
}
.article-block .prod-items {
  box-sizing: border-box;

  display: flex;
  justify-content: flex-start;

  border-bottom: 1px solid #eeeeee;
  padding-bottom: 30rpx;
  margin-bottom: 30rpx;

  .hot-imagecont {
    margin-right: 20rpx;
    width: 144rpx;
    height: 144rpx;
    image {
      width: 100%;
      height: 100%;
      border-radius: 14rpx;
    }
  }
  .hot-text {
    font-size: 32rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 45rpx;
    flex: 1;

    .hotprod-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 10rpx;
      width: 500rpx;
    }
    .discount-sale {
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 37rpx;
    }
    .prod-text-info {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .price {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .price-value {
          font-size: 36rpx;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #ea531c;
          line-height: 42rpx;
          margin-right: 10rpx;
        }
        .discount-text {
          margin-right: 10rpx;
          width: 64rpx;
          height: 32rpx;
          background: #ea531c;
          border-radius: 5rpx;
          background: rgba(251, 221, 210, 1);
          font-size: 20rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ea531c;
          line-height: 32rpx;
          text-align: center;
        }
        .price-org {
          font-size: 26rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #c0c0c0;
          line-height: 37rpx;
          text-decoration: line-through;
        }
      }

      .btn {
        button {
          width: 110rpx;
          height: 56rpx;
          background: #3b6dbb;
          border-radius: 40rpx;
          font-size: 30rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 56rpx;
          padding: 0;
          margin: 0;
        }
      }
    }
  }
}
.article-block .prod-items:nth-last-child(1) {
  border-bottom: none;
}
</style>
