<template>
  <!--pages/order-detail/order-detail.wxml-->

  <view class="container">
    <defNav :title="'转赠积分'" :isTransparent="true"></defNav>
    <image class="page-bg" :src="defBg"></image>
    <view class="page-content">
      <image class="page-content-top-img" :src="defDecoration"></image>
      <view class="page-top">
        <button class="page-top-btn" @click="goPageIntegralList()">
          转赠记录
        </button>
        <view class="page-top-box">
          <text class="page-top-box-tip"> 剩余可转赠积分 </text>
          <text class="money"> {{ totalScore }} </text>
        </view>
      </view>
      <view class="page-center">
        <view class="page-center-float-icon">
          <image class="page-center-left" :src="defDecoration1"></image>
          <image class="page-center-right" :src="defDecoration1"></image>
        </view>
        <view class="page-center-box">
          <view class="page-center-box-tip">转赠积分</view>
          <view class="page-center-row">
            <image class="qr-code-left" :src="defMoney"></image>
            <input
              class="input-money"
              type="digit"
              v-model="giftScore"
              :placeholder="'最多可转增' + totalScore + '积分'"
              placeholder-class="input-placeholder"
            />
          </view>

          <view class="page-center-tip">
            温馨提示：生成二维码后，请让对方及时扫码领取，二维码有效时间为24小时
          </view>
        </view>
      </view>
      <button class="page-footer-btn" @click="goPage">生成二维码</button>
    </view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
import { transferQrCode } from '@/api/integral'
export default {
  options: { styleIsolation: 'shared' },
  data() {
    return {
      configNav: {
        color: '#ffffff',
        title: '转赠积分',
        back: true,
        centerSlot: true,
        backgroundColor: [1, ''],
        statusBarFontColor: '#ffffff',
        statusBarBackground: '#3b6dbb',
      },

      giftScore: null,
    }
  },

  components: {},
  props: {},
  computed: {
    defDecoration() {
      return `${this.$fileUrl}/sysFile/img_zhuanz_jifenzhs.png`
    },
    defDecoration1() {
      return `${this.$fileUrl}/sysFile/img_dingd_zhuangs_1.png`
    },
    defBg() {
      return `${this.$fileUrl}/sysFile/img_zhuanz_bg.png`
    },
    defMoney() {
      return `${this.$fileUrl}/sysFile/ic_da_jifen.png`
    },
    totalScore() {
      return this.$store.state.user.integralTotal
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    ...mapActions(['setIntegralTotalAction']),
    goPageIntegralList() {
      uni.navigateTo({
        url: '/pages/coupon/integralList',
      })
    },
    async goPage() {
      if (['', null, undefined].includes(this.giftScore)) {
        uni.showToast({ title: '请输入转赠积分', duration: 2000 })
        return
      }
      if (this.giftScore > this.totalScore) {
        uni.showToast({ title: '转赠积分不能超过剩余积分', duration: 2000 })
        return
      }
      let res = await transferQrCode({
        credits: this.giftScore,
      })
      if (res && res.code == 0) {
        uni.setStorageSync('giftScoreImg', res.data.base64)
        this.setIntegralTotalAction()
        uni.redirectTo({
          url: `/pages/coupon/transferQrcode?giftScore=${this.giftScore}&id=${res.data.id}&userId=${res.data.userId}`,
        })
      }
    },
  },
}
</script>
<style>
.input-placeholder {
  font-size: 30rpx;
  color: #888888;
}
</style>
<style lang="scss" scoped>
.page-bg {
  position: fixed;
  z-index: 9;
  width: 750rpx;
  height: 629rpx;
}
.page-content {
  position: relative;
  z-index: 999;
  top: 200rpx;
  padding-bottom: 30rpx;
  .page-content-top-img {
    width: 690rpx;
    height: 194rpx;
    margin-left: 30rpx;
  }

  .page-top {
    margin-left: 30rpx;
    margin-top: -20rpx;
    background: #fff;
    border-radius: 0 0 14rpx 14rpx;
    margin-right: 30rpx;
    position: relative;
    width: 690rpx;
    height: 379rpx;
    .page-top-btn {
      width: 162rpx;
      height: 58rpx;
      background: #d9e4f6;
      border-radius: 100rpx 0px 0px 100rpx;

      position: absolute;
      right: 0;
      top: 80rpx;

      color: #4079d2;
      font-size: 26rpx;
    }
    .page-top-btn::after {
      border: none;
    }
    .page-top-box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .page-top-box-tip {
        margin-top: 80rpx;
        line-height: 80rpx;
      }
      .money {
        margin-top: 30rpx;
        font-size: 80rpx;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: #4079d2;
      }
    }
  }
  .page-center {
    margin: 0 30rpx;
    background: #fff;
    border-radius: 14rpx;
    position: relative;
    margin-top: 20rpx;
    .page-center-float-icon {
      position: absolute;
      top: -50rpx;
      left: 30rpx;
      width: 630rpx;
      display: flex;
      justify-content: space-between;
      .page-center-left,
      .page-center-right {
        width: 22rpx;
        height: 78rpx;
      }
    }
    .page-center-box {
      margin: 0 30rpx;
      margin-bottom: 30rpx;
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      padding-bottom: 30rpx;
      .page-center-box-tip {
        padding-top: 56rpx;
        font-size: 30rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-bottom: 50rpx;
      }
      .page-center-row {
        border-bottom: 1rpx solid #eeeeee;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-bottom: 30rpx;
        margin-bottom: 30rpx;
        .qr-code-left {
          width: 58rpx;
          height: 58rpx;
        }

        .input-money {
          width: 500rpx;
          margin-left: 30rpx;
        }
      }
      .page-center-tip {
      }
    }
  }

  .page-footer-btn {
    width: 690rpx;
    height: 98rpx;
    background: #4079d2;
    border-radius: 14rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 98rpx;
    margin-top: 50rpx;

    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
