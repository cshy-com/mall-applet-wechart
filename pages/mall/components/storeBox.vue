<template>
  <view>
    <view class="store-content">
 
      <!-- 店铺文字信息部分 -->
      <view class="store-content-box">
        <!-- 第一行 -->
        <view class="title">
          <text class="name" @click="goShop">{{ shopInfo.name }}</text>
          <view class="star" @click.stop="getCollect" v-if="userType == 1">
            <image
              :lazy-load="true"
              :lazy-load-margin="0"
              :src="isCollect ? defStarSelect : defStar"
            ></image>
          </view>
        </view>
        <view class="score">
          <view class="rate-left"
            ><u-rate
              activeColor="#EA531C"
              readonly
              :count="'5'"
              :value="shopInfo.score"
              size="32"
            ></u-rate
            ><text class="rate-value">{{ shopInfo.score || toRate }}</text>
          </view>
          <text class="rate-price">{{ shopInfo.totalComent || 0 }}条</text>
          <!-- <text class="rate-price"
            >¥{{ shopInfo.perCapitaConsumption }}/人</text
          > -->

          <text class="rate-price area">{{ shopInfo.areaName }}</text>
          <!-- <text class="rate-price area"></text> -->
        </view>
        <view class="type">
          <text class="text">体验感{{ shopInfo.tasteRating || toRate }} </text>
          <text class="text"
            >环境{{ shopInfo.environmentalRating || toRate }}</text
          >
          <text class="text">服务{{ shopInfo.serviceRating || toRate }}</text>
        </view>

        <view class="shop-time">
          <view class="status-time">
            <text class="base-font lable">营业中</text>
            <text class="base-font value"
              >{{ shopInfo.businessHoursStart }}-{{
                shopInfo.businessHoursEnd
              }}</text
            >
            <text class="base-font value-right">可用积分</text>
          </view>
        </view>
      </view>
      <u-gap height="1" bgColor="#EEEEEE"></u-gap>
      <view class="address">
        <text class="text base-font">{{ shopInfo.address }}</text>
      </view>
      <view class="platform-tip base-font">
        <text>折扣率不高于其他平台</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mallShopCollectAdd, mallShopCollectDel } from '@/api/shop.js'
export default {
  //import引入组件才能使用
  components: {},
  props: {
    shopInfo: {
      type: Object,
      defualt: () => {},
    },
    isCollect: {
      type: Boolean,
      defualt: false,
    },
    userType: {
      type: String,
      defualt: '1',
    },
  },
  data() {
    return {}
  },
  // 计算属性
  computed: {
    defStar() {
      return this.$fileUrl + '/sysFile/ic_xihuan_no.png'
    },
    defStarSelect() {
      return this.$fileUrl + '/sysFile/ic_xihuan_yes.png'
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getCollect() {
      let http = this.isCollect ? mallShopCollectDel : mallShopCollectAdd
      try {
 
        await http(this.shopInfo.id)
        this.$emit('collectChange', !this.isCollect)
        this.isCollect = !this.isCollect
        this.$tip.toast(this.isCollect ? '收藏成功' : '已取消收藏')
      } catch (e) {
        console.log(e)
      }
    },
    goShop(){
      this.$emit('goShop')
    }
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期：创建之前
  beforeMount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>
<style scoped lang="scss"> 

.store-content {
  background: #fff;
  border-radius: 30px 30px 0px 0px;
}

.store-content-box {
  padding: 30rpx 30rpx 20rpx 30rpx;

  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 19rpx;
    .name {
      max-width: 600rpx;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 45rpx;
    }
    .star {
      width: 30rpx;
      height: 30rpx;
      margin-left: auto;
      image {
        width: 100%;
        height: 100%;
        will-change: transform;
      }
    }
  }
  .score {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 18rpx;
    .rate-left {
      display: flex;
    }
    .rate-value {
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ea531c;
      line-height: 37rpx;
    }
    .rate-price {
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 37rpx;
      margin-left: 30rpx;
    }
    .area {
      margin-left: auto;
    }
  }
  .type {
    color: #333;
    font-size: 24rpx;
    display: flex;
    align-content: center;
    justify-content: flex-start;
    margin-bottom: 18rpx;
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
  }

  .shop-time {
    .status-time {
      display: flex;
      justify-content: flex-start;
      align-content: center;

      .value {
        margin-left: 10rpx;
      }
      .alue-right{
        margin-left: auto;
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
}
.address {
  padding-top: 20rpx;
  margin-left: 30rpx;
  .text {
    color: #333333;
  }
}
.platform-tip {
  padding-top: 10rpx;
  margin-left: 30rpx;

  padding-bottom: 30rpx;
}
.base-font {
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 37rpx;
}
</style>
