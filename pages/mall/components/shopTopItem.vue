<template>
  <view class="store-list-box">
    <view
      class="store-list"
      v-for="item in list"
      :key="item.id"
      @tap="($event) => goEvent(item)"
    >
      <view class="store-list-top">
        <view class="title">
          <text class="name">{{ item.name }}</text>
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
        <view class="score">
          <view class="rate-left"
            ><u-rate
              activeColor="#EA531C"
              :count="count"
              readonly
              :value="item.score"
              size="32"
            ></u-rate>
            <text class="rate-value">{{ item.score }}</text>
          </view>
          <!-- <view class="rate-price"> ¥{{ item.perCapitaConsumption }}/人 </view> -->
          <view class="type">
            <!-- <text class="text"
              ><text v-if="isShowPid">{{ item.firstTypeName }}/</text
              >{{ item.secondTypeName }}</text
            > -->
            <text class="text">{{ item.areaName }}</text>
            <text class="text tag"> 可用积分 </text>
          </view>
        </view>
      </view>
      <view class="store-list-buttom">
        <image
          :lazy-load="true"
          :lazy-load-margin="0"
          class="avater"
          :src="item.mainImage"
          :mode="'aspectFill'"
          @error="imageError($event, index, i)"
        ></image>
        <image
          :lazy-load="true"
          :lazy-load-margin="0"
          class="avater"
          :src="item.images[0]"
          :mode="'aspectFill'"
          @error="imageError($event, index, i)"
        ></image>
        <image
          :lazy-load="true"
          :lazy-load-margin="0"
          class="avater"
          :src="item.images[1]"
          :mode="'aspectFill'"
          @error="imageError($event, index, i)"
        ></image>
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
.store-list-box {
  margin: 0;
  border-radius: 0 0 14px 14rpx;
  background: #fff;
  padding: 0 30rpx;
  margin: 12rpx;
  margin-top: 0;
  padding-top: 30rpx;
}
.store-list {
  display: flex;
  justify-content: flex-start;
  align-items: top;
  font-size: 32rpx;
  color: #333;

  margin-bottom: 30rpx;
  flex-direction: column;
  border-bottom: 1rpx solid #eeeeee;
  padding-bottom: 30rpx;
  .store-list-top {
    flex: 1;
    position: relative;
    left: 0;

    .title {
      display: flex;
      justify-content: start;
      align-items: center;

      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 690rpx;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 45rpx;
      }
      .star {
        width: 30rpx;
        height: 30rpx;
        margin-right: auto;display: flex;
    align-items: center;
    justify-content: center;
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
      margin-top: 10rpx;
      .rate-left {
        display: flex;
        .rate-value {
          font-size: 26rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ea531c;
          line-height: 37rpx;
        }
      }
      .rate-price {
        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 37rpx;
        margin-left: 30rpx;
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
      margin-left: auto;
      .text {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 34rpx;
        margin-right: 20rpx;

        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 37rpx;
      }
      .tag {
        margin-right: 0;
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
      .price {
        font-size: 26rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ea531c;
        line-height: 37rpx;
      }
      .price-line {
        margin-left: 10rpx;
        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #c0c0c0;
        line-height: 37rpx;
        text-decoration: line-through;
      }
      .commodity-title {
        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        margin-left: 30rpx;
        width: 286rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .store-list-buttom {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 30rpx;
    image {
      border-radius: 14rpx 0 0 14rpx;
      will-change: transform;
      width: 224rpx;
      height: 224rpx;
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-image: $app-load-gif;
      background-color: #f5f5f5;
    }
    image:nth-child(2) {
      margin: 0 8rpx;
      border-radius: 0;
    }
    image:nth-child(3) {
      border-radius: 0 14rpx 14rpx 0;
    }
  }
}
.store-list:last-child{
  border-bottom: none;
}
</style>
