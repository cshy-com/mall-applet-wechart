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
    <view class="page">
      <view class="logo">
        <image
          :lazy-load="true"
          :lazy-load-margin="0"
          :src="defaultLogo"
        ></image>
        <text class="title">清云私享</text>
        <text class="sub-title">便捷生活每一天</text>
      </view>
      <view class="form">
        <view class="form-top">
          <image
            :lazy-load="true"
            :lazy-load-margin="0"
            :src="defaultBgTop"
          ></image>
        </view>
        <view class="form-box">
          <u-form
            :model="form"
            ref="uForm"
            :label-width="0"
            :error-type="errorType"
          >
            <u-form-item class="form-item" prop="tel"
              ><u-input
                prefixIconStyle="font-size: 22px;color:#abacad"
                prefixIcon="account"
                v-model="form.tel"
                type="number"
                :maxlength="11"
                placeholder="请输入您的手机号"
              >
                <template slot="prefix">
                  <view class="prefix-img">
                    <image
                      :lazy-load="true"
                      :lazy-load-margin="0"
                      :src="delPhone"
                    ></image>
                  </view>
                </template>
              </u-input>
            </u-form-item>

            <u-form-item class="form-item" prop="code">
              <view class="code-item">
                <u-input
                  prefixIcon="chat"
                  placeholder="请输入验证码"
                  v-model="form.code"
                  prefixIconStyle="font-size: 22px;color:#abacad"
                >
                  <template slot="prefix">
                    <view class="prefix-img">
                      <image
                        :lazy-load="true"
                        :lazy-load-margin="0"
                        :src="defCode"
                      ></image>
                    </view>
                  </template>
                  <template slot="suffix">
                    <view class="view-code">
                      <u-code
                        ref="uCode"
                        @change="codeChange"
                        seconds="60"
                        @end="end"
                        @start="start"
                        changeText="X秒重新获取"
                      ></u-code>
                    </view>
                    <view class="btn">
                      <button
                        @tap="getCode"
                        color="#000"
                        type="success"
                        size="mini"
                        :class="{ active: activeCode }"
                      >
                        {{ tips }}
                      </button>
                    </view>
                  </template>
                </u-input>
              </view>
            </u-form-item>
          </u-form>
          <view class="submit">
            <button @click="submit">登录</button>
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
        </view>
      </view>

      <u-toast ref="uToast"></u-toast>
    </view>
    <checkPopup
      @closeCheckPopup="closeCheckPopup"
      :show="checkPopShow"
    ></checkPopup>
  </view>
</template>

<script>
import { setAuthorization, getAuthorization } from '@/util/auth.js'
import { sendCode, login, wxLogin } from '@/api/index.js'
import check from '@/pages/public/components/check.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('user')
const { mapGetters } = createNamespacedHelpers('comm')

import checkPopup from './components/checkPopup.vue'
export default {
  components: { check, checkPopup },
  data() {
    return {
      seconds: 60,
      tips: '获取验证码',

      form: {
        tel: '',

        code: '',
      },
      checkPopShow: false,
      rules: {
        tel: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: ['blur'],
          },
          {
            pattern:
              /^(13[0-9]|14[4579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[1589])\d{8}$/,
            // 正则检验前先将值转为字符串
            transform(value) {
              return String(value)
            },
            message: '手机号格式不正确',
          },
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: ['blur'],
          },
        ],
      },
      errorType: ['toast'],
      type: 'text',
      border: true,
      tips: '',
      value: '',
      selected: false,
      code: '',

      config: {
        color: ['#000', '#000'],
        title: '登录',

        back: false,
        fixed: true,
        centerSlot: true,
      },
      activeCode: false,
    }
  },
  created() {},
  onLoad(options) {
    if (options.select == 'true') {
      this.selected = true
    }
  },
  computed: {
    ...mapGetters(['navInfo']),
    defBack() {
      return this.$fileUrl + '/sysFile/ic_nav_arrow_wud_bai.png'
    },
    defHomeBg() {
      return `url(${this.$fileUrl}/sysFile/img_home_bg.png)`
    },
    defaultLogo() {
      return `${this.$fileUrl}/sysFile/img_logo.png`
    },
    defaultBgTop() {
      return `${this.$fileUrl}/sysFile/img_dl_zs_jian.png`
    },
    delPhone() {
      return `${this.$fileUrl}/sysFile/ic_dl_shouji.png`
    },
    defCode() {
      return `${this.$fileUrl}/sysFile/ic_dl_yanzhengma.png`
    },
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  onShow() {
    // #ifdef MP-WEIXIN
    if (wx.hideHomeButton) {
      wx.hideHomeButton()
    }
    // #endif
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    closeCheckPopup(e) {
      // 0 不同意  1 同意
      this.checkPopShow = false
      this.selected = e == 1 ? true : false

      uni.$emit('isChecked', {
        data: this.selected,
      })
    },
    codeChange(text) {
      this.tips = text
    },
    goBack() {
      uni.navigateBack()
    },

    getCode() {
      if (!this.form.tel) {
        this.$tip.toast('手机号不能为空')

        return false
      } else {
        if (!uni.$u.test.mobile(this.form.tel)) {
          this.$tip.toast('请输入正确的手机号')

          return false
        }
      }
      if (this.$refs.uCode.canGetCode) {
        this.$tip.tipLoading('正在获取验证码').then(() => {
          this.getCodeHttp()
        })
      } else {
        this.$tip.toast('倒计时结束后再发送')
      }
    },
    checkResult(e) {
      this.selected = e
      uni.$emit('isChecked', {
        data: this.selected,
      })
    },

    watchAgreement(e) {
      uni.navigateTo({
        url: '/pages/public/agreement',
      })
    },

    loginSubmit() {
      login({
        code: this.form.code,

        phoneNumber: this.form.tel,
      })
        .then((res) => {
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
        .catch(() => {
          uni.hideLoading()
        })
    },

    submit() {
      if (!this.selected) {
        this.checkPopShow = true
        return
      }
      if (['001', '002', '003', '004', '005','006'].includes(this.form.tel)) {
        if (['', null, undefined].includes(this.form.code)) {
          return this.$tip.toast('验证码不能为空')
        } else {
          this.$tip.tipLoading('正在登录').then(() => {
            this.loginSubmit()
          })
        }
      } else {
        this.$refs.uForm.validate().then(() => {
          this.$tip.tipLoading('正在登录').then(() => {
            this.loginSubmit()
          })
        })
      }
    },
    codeChange(text) {
      this.tips = text
    },

    getCodeHttp() {
      // 短信验证码
      sendCode(this.form.tel)
        .then((res) => {
          if (res.code == 0) {
            this.$tip.toast('验证码已发送')
            this.$refs.uCode.start()
          } else {
            this.$tip.toast(res.msg)
          }
        })
        .catch(() => {
          uni.hideLoading()
        })
    },
    end() {
      this.activeCode = false
      // this.$tip.toast('倒计时结束')
    },
    start() {
      this.activeCode = true
      this.$tip.toast('验证码已发送')
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
.page {
  top: 200rpx;
  position: relative;
  z-index: 99;
  width: 100vw;
  // height: 100vh;
  .logo {
    display: flex;
    flex-direction: column;
    // align-items: center;
    margin-left: 30rpx;
    image {
      width: 124rpx;
      height: 124rpx;
    }
    .title {
      margin-top: 29rpx;
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
  .form {
    width: 100%;
    position: relative;
    .form-box {
      background: #fff;
      padding-bottom: 600rpx;
    }
    .prefix-img {
      width: 42rpx;
      height: 42rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .form-top {
      width: 750rx;
      height: 74rpx;
      // position: absolute;
      // top: 0;
      // left: 0;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  /deep/ .u-form-item {
    margin: 0 40rpx;
  }
  /deep/ .u-input {
    border-radius: 14rpx !important;
    border: 2rpx solid #eeeeee;
    padding: 24rpx !important;
  }
  .form-item {
    padding: 20rpx 60rpx;
    border-bottom: 1px solid #f7f7f7;
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
      height: 40rpx;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      button {
        background: none;
        border-radius: 0rpx;

        text-align: center;

        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #3b6dbb;
        height: 40rpx;
        line-height: 40rpx;
        margin: 0;
        padding: 0;
      }
      .active {
        color: #cccccc;
      }
      button:after {
        border: none;
      }
    }
  }
  .submit {
    width: 690rpx;
    margin: auto;
    margin-top: 50rpx;
    button {
      height: 88rpx;
      background: #3b6dbb;
      border-radius: 14rpx;

      text-align: center;
      color: #ffffff;

      font-size: 32rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 88rpx;
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
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30rpx;

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
  margin-top: 80rpx;

  button::after {
    border: 0; // 或者 border: none;
    background: none;
  }
  button {
    border: none;
  }
  .weixin-btn-content {
    display: flex;
    align-content: center;
    flex-direction: column;
    justify-content: center;

    text {
      font-size: 24rpx;
    }
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
