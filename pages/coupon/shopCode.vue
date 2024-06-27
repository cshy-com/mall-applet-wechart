<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-20 15:04:02
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-21 14:09:51
 * @FilePath: \mall-admind:\work\mall-applet\pages\coupon\paymentCode.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <defNav :title="userInfo.userType == 1 ? '付款码' : '收款码'"></defNav>
    <view class="blue-bg-box">
      <view class="blue-img"> </view>
      <view class="blue-bg-content">
        <view class="blue-bg-box-text">
          <view v-if="userInfo.userType == 1"> 向商家付款 </view>
          <view class="tip" v-if="userInfo.userType == 1">
            商家扫码后 付款完成
          </view>
          <view v-if="userInfo.userType == 2"> 收款 </view>
          <view v-if="userInfo.userType == 2"> 扫一扫，向我付钱 </view>
        </view>

        <view class="decoration">
          <image :src="defDecoration"></image>
        </view>
        <view class="qr-code">
          <view class="qr-code-img">
            <image
              :lazy-load="true"
              :lazy-load-margin="0"
              :src="defCode"
            ></image
          ></view>
          <text v-if="userInfo.userType == 1">到店亮码</text>
          <text v-if="userInfo.userType == 2">收款码</text>
        </view>
      </view>
    </view>

    <!-- <view class="code">
      <image :lazy-load="true" :lazy-load-margin="0" :src="defCode"></image>
    </view>
    <view class="tip">
      <text v-if="this.userInfo.userType == 1">向商家付款</text>
      <text v-if="this.userInfo.userType == 2">快来扫一扫，向我付款吧</text>
    </view> -->
  </view>
</template>

<script>
import { paymentCode, getUserPayQrcode } from '@/api/integral'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('user')
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      defCode: require('@/static/img/qrcode.png'),
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['userInfo']),
    defDecoration() {
      return `${this.$fileUrl}/sysFile/img_dingd_yuan.png`
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getCode() {
      try {
        let http =
          this.userInfo.userType == 2 ? paymentCode({}) : getUserPayQrcode()
        let res = await http
        this.defCode = res.data
      } catch (e) {
        console.log(e)
      }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {
    this.getCode()
  },
  beforeCreate() {}, //生命周期：创建之前
  beforeMount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>
<style>
page {
  background: #3b6dbb;
}
</style>
<style scoped lang="scss">
.code {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200rpx;
  image {
    width: 300rpx;
    height: 300rpx;
  }
}
.tip {
  display: flex;
  align-items: center;
  justify-content: center;
}
.blue-bg-box {
  position: relative;
  top: 30rpx;
  .blue-img {
    width: 726rpx;
    height: 30rpx;
    background: #24549e;
    border-radius: 20rpx;
    margin-left: 12rpx;
    position: absolute;
    top: 0rpx;
  }
  .blue-bg-content {
    position: relative;
    margin-left: 30rpx;
    width: 690rpx;
    top: 15rpx;
  }
}
.blue-bg-box-text {
  font-size: 30rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 42rpx;
  padding-top: 39rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding-bottom: 20rpx;
  .tip {
    color: #888888;
    font-size: 26rpx;
    line-height: 37rpx;
    margin-top: 10tpx;
  }
}

.decoration {
  width: 690rpx;
  height: 32rpx;

  position: relative;
  top:-3rpx; 
  image {
    width: 100%;
    height: 34rpx;
  }
}
.qr-code {
  background: #fff;
  top: -3rpx;
  padding-top: 30rpx;
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 42rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 43rpx;
  position: relative;
  border-radius: 0 0 15rpx 15rpx;
  .qr-code-img {
    width: 386rpx;
    height: 386rpx;
    background: #f5f5f5;
    border-radius: 14rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    image {
      width: 357rpx;
      height: 360rpx;
      background: #fff;
    }
  }
  text {
    margin-top: 38rpx;
  }
  .qr-code-left,
  .qr-code-right {
    position: absolute;
    bottom: -47rpx;
    left: 30rpx;
    width: 17rpx;
    height: 74rpx;
  }
  .qr-code-right {
    right: 30rpx;
    left: auto;
  }
}
</style>
