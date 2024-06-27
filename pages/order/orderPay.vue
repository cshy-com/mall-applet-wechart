<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-08-25 11:53:07
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-04-03 17:00:31
 * @FilePath: \mall-admind:\work\mall-applet\pages\coupon\transferScanCode.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <defNav :isTransparent="true"></defNav>
    <image class="page-bg" :src="defBg"> </image>
    <view class="page-box">
      <view class="box">
        <view class="user-box">
          <view class="user">
            <text class="user-name">设置积分数额</text>
          </view>
        </view>
        <view class="money">
          <input
            class="input-money"
            v-model="credits"
            type="digit"
            placeholder="请输入需要支付的积分"
            placeholder-class="placeholder-class"
          />
          <view class="status"> 当前可用积分 {{ totalScore }} </view>
        </view>
      </view>
      <!-- && !source -->
      <view class="box-btn" @click="payOrder"> 立即支付 </view>

      <view class="box-footer-tip"> 温馨提示：点击确定支付，即可付款成功 </view>
    </view>

    <payPop :show="show" @close="close">
      <template slot="footer">
        <view class="pop-tip">恭喜你！支付成功</view>
        <view class="foot-btn">
          <button @click="goHome">去首页</button>
          <button @click="goPage">去评价</button>
        </view>
      </template>
    </payPop>
  </view>
</template>

<script>
import { transferQrCodeScan, getTransferInfo } from '@/api/integral'
import { getUrlParams } from '@/util/util'
import payPop from './components/payPop'
import { getUserInfoById, wxLogin } from '@/api/index'
import { createNamespacedHelpers } from 'vuex'
import { finishOrder } from '@/api/order'
const { mapMutations, mapGetters, mapActions } = createNamespacedHelpers('user')
import { setAuthorization, getAuthorization } from '@/util/auth.js'
export default {
  //import引入组件才能使用
  components: { payPop },
  props: {},
  data() {
    return {
      show: false,
      expired: false,
      userId: null,
      Id: '',
      user: null,
      transferCodeInfo: null,
      source: null,
      credits: null,
      orderId: null,
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['userInfo']),
    defBg() {
      return `${this.$fileUrl}/sysFile/img_saoma_bg_order.png`
    },
    defAvatar() {
      return `${this.$fileUrl}/sysFile/avatar.png`
    },
    defExpired() {
      return `${this.$fileUrl}/sysFile/img_shixiao_bq.png`
    },
    totalScore() {
      return this.$store.state.user.integralTotal
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapActions(['setUserInfoAction', 'setIntegralTotalAction']),
    async payOrder(item) {
      if (['', null, undefined].includes(this.credits)) {
        uni.showToast({icon:'none', title: '请输入需要支付的积分', duration: 2000 })
        return
      }
      if (this.credits > this.totalScore) {
        uni.showToast({icon:'none',  title: '支付的积分不能超过剩余积分', duration: 2000 })
        return
      }
      let { code, data } = await finishOrder({
        orderId: this.orderId,
        credits: this.credits,
      })
      if (code == 0) {
        this.setIntegralTotalAction()
        this.show = true
      }
    },

    goPage() {
      uni.navigateTo({
        url:
          '/pages/order/order-comment/order-comment-add?orderId=' +
          this.orderId,
      })
    },
    goHome() {
      uni.switchTab({
        url: '/pages/index/home/userHome',
      })
    },

    close() {
      this.show = false
    },
  },
  onLoad(options) {
    if (options?.orderId) {
      this.orderId = options.orderId
    }
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  onShow() {},
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
.placeholder-class {
  font-size: 30rpx;
  color: #888888;
}
</style>
<style scoped lang="scss">
.page-bg {
  position: fixed;
  width: 100vw;
  height: 1624rpx;
  left: 0;
  top: 0;
  z-index: 9;
}
.page-box {
  position: fixed;
  z-index: 99;
  width: 100%;
}
.box {
  // position: fixed;
  width: 100%;
  margin-top: 500rpx;
  .user-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .user-name {
      font-size: 30rpx;

      font-weight: 500;
      color: #333333;
    }
  }
  .money {
    margin: 0 60rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 80rpx;
    margin-bottom: 30rpx;
    font-weight: 500;
    color: #333333;
    line-height: 103rpx;
    padding-bottom: 30rpx;

    margin-top: 46rpx;
    .input-money {
      text-align: center;
      padding-bottom: 30rpx;
      border-bottom: 1rpx solid #eeeeee;
      margin-bottom: 30rpx;
      height: 103rpx;
      line-height: 103px;
    }
    .status {
      font-size: 28rpx;

      font-weight: 400;
      color: #666666;

      line-height: 40rpx;
    }
  }
}
.box-btn {
  margin: 237rpx 30rpx 40rpx 30rpx;
  width: 690rpx;
  height: 98rpx;
  background: #ffffff;
  border-radius: 14rpx;
  font-size: 32rpx;
  line-height: 98rpx;
  font-weight: 400;
  color: #ef6635;
  text-align: center;
  border: none;
  position: fixed;
  top: 60vh;
}
.box-footer-tip {
  font-size: 26rpx;
  text-align: center;
  font-weight: 400;
  color: #ffffff;
  line-height: 37rpx;
  position: fixed;
  width: 100%;
  text-align: center;
  bottom: 9vh;
}
.pop-tip {
  margin-top: 41rpx;
  margin-bottom: 45rpx;
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 42rpx;
  text-align: center;
}
button {
  width: 250rpx;
  height: 78rpx;
  background: linear-gradient(135deg, #fb9c7a 0%, #ea531c 100%);
  border-radius: 14rpx;
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 78rpx;
}
button::after {
  border: none;
}
.foot-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  button:nth-child(1) {
    background: linear-gradient(135deg, #fee9e2 0%, #fbddd2 100%);
    margin-right: 30rpx;
    color: #eb5722;
  }
}
</style>
