<template>
  <view>
    
      <view
        class="store-list flex-start font-32-500 "
        v-for="item in list"
        :key="item.id"
        @tap="($event) => goEvent(item)"
      >
        <!-- 左边图片 -->
        <view class="store-list-left ">
          <image
            :lazy-load="true"
            :lazy-load-margin="0"
            class="avater bachground-def-img"
            :src="item.mainImage"
            :mode="'aspectFill'"
            @error="imageError($event, index, i)"
          ></image>
        </view>
        <!-- 右边介绍 -->
        <view class="store-list-right">
          <!-- 第一行 -->
          <view class="title flex-start-center">
            <text class="name  font-32-500 over-ellipsis-1">{{ item.name }}</text>
             <view class="star">
              <image
                :lazy-load="true"
                :lazy-load-margin="0"
                class="avater"
                :src="item.ifCollect?defStarSelect:defStar"
                :mode="'aspectFill'"
              ></image>
            </view>  
          
          </view>
          <view class="score flex-start-center">
            <view class="rate-left"
              ><u-rate
                activeColor="#EA531C"
                :count="count"
                readonly
                :value="item.score"
                size="32"
              ></u-rate>
              <text class="rate-value font-26">{{ item.score }}</text>
            </view>
            <!-- <view class="rate-price font-26">
              ¥{{ item.perCapitaConsumption }}/人
            </view> -->
          </view>
          <view class="type">
            <text class="text font-26"
              ><text v-if="isShowPid">{{ item.firstTypeName }}/</text
              >{{ item.secondTypeName }}</text
            >
            <text class="text font-26">{{ item.areaName }}</text>
            <text class="text tag font-26"> 可用积分 </text>
          </view>
          <!-- 店铺下的商品 -->
          <view class="commodity-box" v-if="item.commodities&&item.commodities.length>0">
            <view class="line"></view>
            <view class="certificate-row flex-center font-26" v-for="commodity in item.commodities" :key="commodity.id">
              <!-- <view class="price  "> ¥{{commodity.discountedPrice}} </view>
              <text class="price-line ">¥{{commodity.originalPrice}}</text> -->

              {{commodity.shopId=="8e42c6091eb00598e3a3912a2537744b"?"合作方案洽谈中":"优惠方案协商中"}}
              <text class="commodity-title over-ellipsis-1">{{commodity.name}}</text>
            </view>
            
          </view>
        </view>
      </view>
    </view> 
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
    isShowPid: {
      type: Boolean, //是否展示一级分类
      default: false,
    },
  },
  data() {
    return {
      value: 4.6,
      count: 5,
    }
  },
  created() {},
  computed: {
    defBg() {
      return this.$fileUrl + '/sysFile/bg3.png'
    },
    defaultImg() {
      return this.$fileUrl + '/sysFile/img_zanwu_tuijian.png'
    },
    defStar() {
      return this.$fileUrl + '/sysFile/ic_xihuan_no.png'
    },
    defStarSelect() {
      return this.$fileUrl + '/sysFile/ic_xihuan_yes.png'
    },
  },
  methods: {
    ...mapMutations(['setShopInfo']),
    goEvent(item) {
      this.setShopInfo(item)
      uni.navigateTo({
        url: '/pages/mall/store/storeDetails?id=' + item.id,
      })
    },
    imageError(e, index, i) {
      this.list[index]['mainImage'] = defaultImg
    },
    scrolltolower(e) {
      this.$emit('scrolltolower', e)
    },
  },
}
</script>

<style lang="scss" scoped>
.store-list {
   
  align-items: top;
   
  color: #333;
  margin: 0 12rpx 12rpx 12rpx;
  border-radius: 14px;
  background: #fff;
  padding: 32rpx 30rpx;
  
  .store-list-left {
    width: 144rpx;
    height: 144rpx;
  
      background-color: #f5f5f5;
    image {
      width: 100%;
      height: 100%;
      border-radius: 14rpx;
      will-change: transform;
    }
  }
  .store-list-right {
    flex: 1;
    position: relative;
    left: 0;
    margin-left: 20rpx;

    .title {
   
      .name {
        
        width: 450rpx;
       
        color: #333333;
        line-height: 45rpx;
      }
      .star {
        width: 30rpx;
        height: 30rpx;
        margin-right: auto;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
    .score {
      
      margin-top: 10rpx;
      .rate-left {
        display: flex;
        .rate-value {
          
          color: #ea531c;
          line-height: 37rpx;
        }
      }
      .rate-price {
        
        line-height: 37rpx;
        margin-left: 30rpx;
      }
 
    }
    .type {
      display: flex;
      margin-top: 10rpx;
      .text {
        
    
        
        margin-right: 20rpx;

       
        color: #666666;
        line-height: 37rpx;
      }
      .tag {
        margin-left: auto;
      }
    }

    .commodity-box {
      .line {
        width: 502rpx;
        height: 1rpx;
        border-top: 2rpx solid #eeeeee;
        margin-bottom: 10rpx;

        margin-top: 20rpx;
      }
    }
    
    .certificate-row {
      
      margin-top: 10rpx;
      .price {
      
        color: #ea531c;
        line-height: 37rpx;
      }
      .price-line {
        margin-left: 10rpx;
        
        color: #c0c0c0;
        line-height: 37rpx;
        text-decoration: line-through;
      }
      .commodity-title {
       height: 50rpx;
        color: #666666;
        margin-left: 30rpx;
        width: 286rpx;
       
      }
    }
  }
}
 
</style>
