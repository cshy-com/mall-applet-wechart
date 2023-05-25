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
        <u-form-item class="form-item" prop="password">
          <u-input
            prefixIconStyle="font-size: 22px;color:#abacad"
            prefixIcon="lock"
            v-model="form.password"
            :maxlength="50"
            type="password"
            placeholder="请输入您的登录密码"
          />
          <view>
            <text class="tip">
              * 密码6-21字母和数字组成，不能是纯数字或纯英文</text
            >
          </view>
        </u-form-item>

        <u-form-item class="form-item" prop="confirmPass">
          <u-input
            prefixIconStyle="font-size: 22px;color:#abacad"
            prefixIcon="lock"
            v-model="form.confirmPass"
            :maxlength="50"
            type="password"
            placeholder="请确认您的登录密码"
          />
        </u-form-item>
        <u-form-item class="form-item" prop="code">
          <view class="code-item">
            <u-input
              prefixIcon="chat"
              placeholder="请输入验证码"
              v-model="form.code"
              prefixIconStyle="font-size: 22px;color:#abacad"
            >
              <template slot="suffix">
                <u-code
                  ref="uCode"
                  @change="codeChange"
                  seconds="60"
                  changeText="X秒重新获取"
                ></u-code>
                <u-button
                  @tap="getCode"
                  :text="tips"
                  color="#000"
                  type="success"
                  size="mini"
                ></u-button>
              </template>
            </u-input>
          </view>
        </u-form-item>
      </u-form>
    </view>
    <view class="submit">
      <button @click="submit">注册</button>
      <button class="to-login" @click="login">去登录</button>
    </view>

    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import util from '@/util/util.js'
import { sendCode, register } from '@/api/index.js'
export default {
  components: {},
  data() {
    return {
      seconds: 60,

      tips: '获取验证码',

      form: {
        tel: '',
        password: '',

        code: '',
        confirmPass: '',
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

        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: ['blur'],
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            // 正则检验前先将值转为字符串
            transform(value) {
              return String(value)
            },
            message: '密码6-21字母和数字组成，不能是纯数字或纯英文',
          },
        ],
        confirmPass: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: ['blur'],
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            // 正则检验前先将值转为字符串
            transform(value) {
              return String(value)
            },
            message: '密码6-21字母和数字组成，不能是纯数字或纯英文',
          },
        ],
      },
      errorType: ['toast'],
      type: 'text',
      border: true,
      tips: '',
      value: '',
    }
  },
  onLoad() {},
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },

  methods: {
    codeChange(text) {
      this.tips = text
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

    login() {
      uni.navigateBack()
    },

    submit() {
      this.$refs.uForm.validate().then(() => {
        if (this.form.confirmPass !== this.form.password) {
          this.$tip.toast('两次输入的密码不一致，请重新输入')
          return
        }
        this.$tip.showLoading().then(() => {
          register({
            code: this.form.code,
            password: this.form.password,
            phoneNumber: this.form.tel,
          }).then((res) => {
            if (res && res.code == 0) {
              this.$tip.toast('注册成功，将自动跳转登录页...')
              setTimeout(() => {
                this.login()
              }, 3000)
            } else {
              this.$u.toast(msg)
            }
          })
        })
      })
    },
    codeChange(text) {
      this.tips = text
    },

    getCodeHttp() {
      // 短信验证码
      sendCode(this.form.tel).then((res) => {
        if (res.code == 0) {
          this.$tip.toast('验证码已发送')
          this.$refs.uCode.start()
        } else {
          this.$tip.toast(res.msg)
        }
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
</style>
