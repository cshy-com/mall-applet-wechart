<template>
  <view>
    <view
      class="home-bg"
      :style="{
        'background-image': defHomeBg,
      }"
    >
    </view>
    <view
      class="back-box"
      :style="{
        top: navInfo.menuTop + 'px',
        height: navInfo.menuHeight + 'px',
      }"
    >
      <image
        @click="goBack"
        :lazy-load="true"
        :lazy-load-margin="0"
        :src="defBack"
        class="back-img"
      ></image>
    </view>
    <view class="login-box">
      <view class="logo">
        <image
          :lazy-load="true"
          :lazy-load-margin="0"
          :src="defaultLogo"
        ></image>
        <text class="title">清云私享</text>
        <text class="sub-title">便捷生活每一天</text>
      </view>

      <view class="page">
        <view class="submit" @click="submit">
          <image
            :lazy-load="true"
            :lazy-load-margin="0"
            :src="defaultPhone"
          ></image>
          <view>手机号码登录</view>
        </view>
        <view class="weixin-btn">
          <button
            type="text"
            @click="wechatLogin"
            v-if="!selected"
            :plain="true"
          >
            <view class="weixin-btn-content">
              <image
                :lazy-load="true"
                :lazy-load-margin="0"
                :src="defLoginIcon"
              ></image>

              <view>快捷方式登录</view>
            </view>
          </button>

          <button
            v-else
            type="text"
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber"
            :plain="true"
            ref="loginBtn"
          >
            <view class="weixin-btn-content">
              <image
                :lazy-load="true"
                :lazy-load-margin="0"
                :src="defLoginIcon"
              ></image>

              <view>快捷方式登录</view>
            </view>
          </button>
        </view>

        <view class="login-options">
          <check :selected="selected" @result="checkResult"
            ><view class="agreement"
              ><text>我已阅读并同意</text
              ><text class="tip" @click="watchAgreement"
                >《清云私享隐私协议》</text
              ></view
            ></check
          >
        </view>
        <view class="visit-login">
          <button class="visit-login-btn" @click="goBack">跳过登录</button>
        </view>
        <u-toast ref="uToast"></u-toast>
      </view>
    </view>
    <checkPopup
      @closeCheckPopup="closeCheckPopup"
      :show="checkPopShow"
    ></checkPopup>
  </view>
</template>

<script>
import {
  setAuthorization,
  getAuthorization,
  removeAuthorization,
} from '@/util/auth.js'
import { sendCode, login, wxLogin } from '@/api/index.js'
import check from '@/pages/public/components/check.vue'
const { mapGetters } = createNamespacedHelpers('comm')

import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('user')

import checkPopup from './components/checkPopup.vue'
export default {
  components: { check, checkPopup },
  data() {
    return {
      selected: false,
      checkPopShow: false,
      type: null, //phone wechat
    }
  },
  computed: {
    ...mapGetters(['navInfo']),
    defHomeBg() {
      return `url(${this.$fileUrl}/sysFile/img_home_bg.png)`
    },
    defaultLogo() {
      return `${this.$fileUrl}/sysFile/img_logo.png`
    },
    defaultPhone() {
      return `${this.$fileUrl}/sysFile/ic_denl_shoujihao.png`
    },
    defLoginIcon() {
      return `${this.$fileUrl}/sysFile/ic_denl_weixin.png`
    },
    defBack() {
      return this.$fileUrl + '/sysFile/ic_nav_arrow_wud_bai.png'
    },
  },

  onLoad() {
    // wx.enableAlertBeforeUnload({
    //   message: '请先登录',
    // })
    var that = this
    uni.login({
      provider: 'weixin',
      success(res) {
        that.code = res.code
      },
    })
    uni.$on('isChecked', (data) => {
      this.selected = data.data
      // console.log('监听到事件来自 update ，携带参数 msg 为：' + data.data)
    })
  },

  onReady() {},
  onShow() {
    this.setUserInfo(null)
    uni.setStorageSync('user', null)
    this.setOrderNumber(null)
    this.setIntegralTotal(null)
    removeAuthorization('Authorization')
    uni.removeStorageSync('recentSearch')
    // #ifdef MP-WEIXIN
    if (wx.hideHomeButton) {
      wx.hideHomeButton()
    }
    // #endif
  },
  beforeDestroy() {
    uni.$off('isChecked')
  },
  methods: {
    ...mapMutations(['setUserInfo','setOrderNumber','setIntegralTotal']),
    goBack() {
      uni.navigateBack()
    },
    closeCheckPopup(e) {
      // 0 不同意  1 同意
      this.checkPopShow = false
      this.selected = e == 1 ? true : false
    },
    submit() {

   
      this.type = 'phone'
      if (this.selected) {
        uni.navigateTo({
          url: '/pages/public/login2?select=' + this.selected,
        })
      } else {
        this.checkPopShow = true
      }
    },
    wechatLogin() {
      this.type = 'wechat'
      if (!this.selected) {
        this.checkPopShow = true
      }
    },
    getPhoneNumber(e) {
      console.log('e.detail.code' + e.detail.code)
      if (e.detail.code) {
        wxLogin(e.detail.code).then((res) => {
          if (res && res.code == 0) {
            setAuthorization(res.data.token)
            this.setUserInfo(res.data)
            uni.setStorageSync('user', res.data)
            uni.switchTab({
              url:
                res.data.userType == 1
                  ? '/pages/index/home/userHome'
                  : '/pages/index/home/businessHome',
            })
          } else {
            this.$u.toast(msg)
          }
        })
      } else {
        this.$u.toast('已取消授权')
      }
    },

    checkResult(e) {
      this.selected = e
    },

    watchAgreement(e) {
      uni.navigateTo({
        url: '/pages/public/agreement',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.home-bg {
  width: 100vw;
  background-size: 100%;
  background-position: 0 0;
  background-repeat: repeat;
  overflow-y: scroll;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
.back-box {
  padding-left: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 999;
  top: 50rpx;
  .back-img {
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
  }
}
.login-box {
  top: 319rpx;
  position: relative;
  z-index: 99;
  width: 100vw;
  //  height: 100vh;
}
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;

  image {
    width: 158rpx;
    height: 158rpx;
  }
  .title {
    margin-top: 30rpx;
    margin-bottom: 10rpx;
    font-size: 38rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 53rpx;
  }
  .sub-title {
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #888888;
    line-height: 42rpx;
  }
}
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;

  .form {
    width: 100%;
  }

  .form-item {
    padding: 20rpx 60rpx;
    border-bottom: 1px solid #f7f7f7;
  }
  .tip {
    font-size: 24rpx;
    color: #da2d2d;
  }
  .code-item {
    display: flex;
    justify-content: space-between;
    .view-code {
      width: 300rpx;
    }
    .btn {
      width: 200rpx;
      float: right;
      button {
        height: 85rpx;
        background: $Gradual-color;
        border-radius: 10rpx;
        font-size: 30rpx;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 85rpx;
      }
    }
  }
  .submit {
    margin: auto;
    margin-top: 270rpx;
    width: 690rpx;
    height: 88rpx;
    background: #3b6dbb;
    border-radius: 14rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    image {
      width: 42rpx;
      height: 42rpx;
      margin-right: 10rpx;
    }
  }

  .to-login {
    background: #eee !important;
    margin-top: 50rpx;
    color: #666 !important;
  }

  .code {
    width: 200rpx;
    height: 70rpx;
    background: #ffffff;
    border: 1px solid #b3b3b3;
    border-radius: 35rpx;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    color: #1a1a1a;
  }

  .code::after {
    border: none;
  }

  .login-options {
    margin-top: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .agreement {
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #888888;
      line-height: 37rpx;
      .tip {
        color: #3b6dbb;
      }
    }

    .address {
      padding: 30rpx 0;
      border-bottom: 2rpx solid #e6e6e6;

      display: flex;
      align-items: center;
      justify-content: space-between;

      text {
        background: $base-color;
        font-size: 34rpx;
        display: flex;
      }

      .txt {
        color: #999999;
        width: 90%;
        font-size: 28rpx;
      }

      .jiantou {
        display: block;
        color: #000000;
        transform: rotate(90deg);
      }
    }
  }
}

.login-options {
  width: 100%;
  margin: 58rpx auto 123rpx;

  display: flex;
  justify-content: space-between;
  .address {
    padding: 30rpx 0;
    border-bottom: 2rpx solid #e6e6e6;
    margin-bottom: 46rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    text {
      color: $base-color;
      font-size: 34rpx;
    }

    .txt {
      color: #999999;
      width: 90%;
      font-size: 28rpx;
    }

    .jiantou {
      display: block;
      color: #000000;
      transform: rotate(90deg);
    }
  }
}
.dialog-footer {
  padding: 0;

  .dialog-btn {
    color: white;
    font-size: 26rpx;
    width: 100%;
    height: 91rpx;
    line-height: 91rpx;
    background: $Gradual-color;
    text-align: center;
  }
}

.dialog-header {
  position: relative;
  text-align: center;
}

.dialog-bodys {
  height: 60vh;
  font-size: 26rpx;
  font-weight: 400;
  color: #8c888c;
  max-height: 70vh;
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
  padding: 0 10%;
}
.weixin-btn {
  margin-top: 30rpx;
  width: 690rpx;
  height: 88rpx;
  background: #61ac7f;
  border-radius: 14rpx;

  button::after {
    border: 0; // 或者 border: none;
    background: none;
  }
  button {
    width: 100%;
    border: none;
    margin: 0;
    padding: 0;
  }
  .weixin-btn-content {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 88rpx;
    image {
      width: 42rpx;
      height: 42rpx;
      margin-right: 10rpx;
    }
  }
}
.visit-login {
  button {
    width: 230rpx;
    height: 78rpx;
    background: #eeeeee;
    border-radius: 14px;
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 78rpx;
    border: none;
  }
  button:after {
    border: none;
  }
}
.nav /deep/ .hx-navbar__content__main_center {
  justify-content: center;
  width: 100vw;
  position: fixed;
}
.center {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */

  justify-content: center;
  align-items: center;

  font-size: 28rpx;
  font-family: SourceHanSerifCN-SemiBold, SourceHanSerifCN;
  font-weight: 400;
  color: #000;
}
/deep/ .u-icon--right {
  justify-content: center;
}
</style>
