<template>
  <view class="page">
    <view class="form">
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
        /></u-form-item>

        <u-form-item class="form-item" prop="code">
          <view class="code-item">
            <u-input
              prefixIcon="chat"
              placeholder="请输入验证码"
              v-model="form.code"
              prefixIconStyle="font-size: 22px;color:#abacad"
            >
              <template slot="suffix">
                <view class="view-code">
                  <u-code
                    ref="uCode"
                    @change="codeChange"
                    seconds="60"
                    changeText="X秒重新获取"
                  ></u-code>
                </view>
                <view class="btn">
                  <u-button
                    @tap="getCode"
                    :text="tips"
                    color="#000"
                    type="success"
                    size="mini"
                  ></u-button>
                </view>
              </template>
            </u-input>
          </view>
        </u-form-item>
      </u-form>
    </view>
    <view class="login-options">
      <check :selected="selected" @result="checkResult"
        ><view class="agreement" @click="watchAgreement"
          >勾选即同意隐私协议</view
        ></check
      >
    </view>
    <view class="submit">
      <button @click="submit">登录</button>
    </view>
    <view class="weixin-btn">
      <button
        type="text"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
        :plain="true"
      >
        <view class="weixin-btn-content">
          <u-icon name="weixin-circle-fill" size="80"></u-icon>
          <text>微信登录</text>
        </view>
      </button>
    </view>

    <u-toast ref="uToast"></u-toast>
    <popup
      :visible="open"
      :allowClickShadowClose="false"
      @closeCallBack="closeCallBack"
    >
      <view>
        <view class="dialog-header">
          <text>协议及隐私说明</text>
        </view>
        <view class="dialog-bodys">
          <view> 这里是说明 </view>
        </view>
        <view class="dialog-footer">
          <view class="dialog-btn" @click="closeDialog">{{ dialogBtn }}</view>
        </view>
      </view>
    </popup>
  </view>
</template>

<script>
import util from '@/util/util.js'
import { setAuthorization, getAuthorization } from '@/util/auth.js'
import { sendCode, login, wxLogin } from '@/api/index.js'
import check from '@/pages/public/components/check.vue'
import popup from '@/pages/public/components/popup.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('user')
export default {
  components: { check, popup },
  data() {
    return {
      seconds: 60,

      tips: '获取验证码',

      form: {
        tel: '',

        code: '',
      },

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
      open: false,
      dialogBtn: '',
    }
  },
  onLoad() {
    var that = this
    uni.login({
      provider: 'weixin',
      success(res) {
        that.code = res.code
      },
    })
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
    codeChange(text) {
      this.tips = text
    },
    getPhoneNumber(e) {
      wxLogin(e.detail.code).then((res) => {
        if (res && res.code == 0) {
          setAuthorization(res.data.token)
          this.setUserInfo(res.data)
          uni.setStorageSync('user', res.data)
          uni.switchTab({
              url: res.data.userType==1?'/pages/index/home/userHome':'/pages/index/home/businessHome',
            })
        } else {
          this.$u.toast(msg)
        }
      })
    },
    getCode() {
      if (!this.form.tel) {
        this.$tip.toast('手机号不能为空')

        return false
      } else {
        if (!util.regular().mobile.test(this.form.tel)) {
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
    },
    //关闭弹窗
    closeCallBack() {
      this.open = false
    },
    watchAgreement(e) {
      this.open = true
      // if (!this.selected) {
      //   this.timeCount(5)
      //   this.dialogBtn = `关闭`
      // } else {
      this.dialogBtn = `关闭`
      // }
    },
    closeDialog() {
      // if (this.selected) {
      this.closeCallBack()
      // }
    },
    wechartLogin() {
      this.$tip.toast('正在开发，敬请期待')
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
              url: res.data.userType==1?'/pages/index/home/userHome':'/pages/index/home/businessHome',
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
        this.$tip.toast('请先勾选隐私协议')
        return
      }

      this.$refs.uForm.validate().then(() => {
        this.$tip.tipLoading('正在登录').then(() => {
          this.loginSubmit()
        })
      })
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
      this.$tip.toast('倒计时结束')
    },
    start() {
      this.$tip.toast('倒计时开始')
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding: 50rpx;

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
    width: 90%;
    margin: auto;
    margin-top: 123rpx;
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
    width: 90%;
    margin: 58rpx auto 123rpx;

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
</style>
