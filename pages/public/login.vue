<!-- login page -->
<template>
  <view>
    <view class="page">
      <u-form
        :model="form"
        ref="loginForm"
        :label-width="0"
        :error-type="errorType"
      >
        <u-form-item prop="tel"
          ><u-input
            prefixIconStyle="font-size: 22px;color:#abacad"
            prefixIcon="account"
            maxlength="11"
            v-model="form.tel"
            placeholder="请输入手机号"
        /></u-form-item>
        <u-form-item prop="password"
          ><u-input
            prefixIconStyle="font-size: 22px;color:#abacad"
            prefixIcon="lock"
            maxlength="30"
            type="password"
            v-model="form.password"
            placeholder="请输入登录密码"
        /></u-form-item>
      </u-form>

      <view class="login-options">
        <check :selected="selected" @result="checkResult"
          ><view class="agreement" @click="watchAgreement"
            >勾选即同意隐私协议</view
          ></check
        >
      </view>

      <view class="login">
        <button @click="loginT">登录</button>

        <button class="register" @click="register">去注册</button>
      </view>

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
  </view>
</template>

<script>
import check from '@/pages/public/components/check.vue'
import popup from '@/pages/public/components/popup.vue'
import { setAuthorization, getAuthorization } from '@/util/auth.js'
import { login } from '@/api/index.js'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('user')
export default {
  components: {
    check,
    popup,
  },
  data() {
    return {
      selected: false,
      index: 0,
      array: [],

      loading: false,
      user: {
        avatar: '',
        nickName: '',
      },
      open: false,
      dialogBtn: '',
      timeCounting: false,
      agreement: '',
      areaStr: '',
      arr: [],
      allcity: [],
      cityIndex: [0, 0, 0],
      cityId: [],
      cityList: [],

      form: {
        tel: '',
        password: '',
      },
      errorType: ['toast'],
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
      },
    }
  },
  onShow() {
    // #ifdef MP-WEIXIN
    if (wx.hideHomeButton) {
      wx.hideHomeButton()
    }
    // #endif
  },
  onReady() {
    this.$refs.loginForm.setRules(this.rules)
  },
  onLoad() {},
  methods: {
    ...mapMutations(['setUserInfo']),
    // 注册
    register() {
      uni.navigateTo({
        url: '/pages/public/register',
      })
    },

    checkResult(e) {
      this.selected = e
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
    timeCount(t) {
      let time = t
      if (!this.timeCounting) {
        let it = setInterval(() => {
          if (time > 0) {
            this.timeCounting = true
            --time
            this.dialogBtn = `关闭`
          } else {
            this.dialogBtn = `关闭`
            this.timeCounting = false
            this.selected = true
            clearInterval(it)
          }
        }, 1000)
      }
    },
    //关闭弹窗
    closeCallBack() {
      this.open = false
    },
    loginT() {
      if (!this.selected) {
        this.$u.toast('请先勾选隐私协议')
        return
      }

      this.$refs.loginForm.validate().then((res) => {
        login({
          password: this.form.password,
          phoneNumber: this.form.tel,
        }).then((res) => {
          if (res && res.code == 0) {
            setAuthorization(res.data.phoneNumber)
            this.setUserInfo(res.data)
            uni.setStorageSync('user', res.data)
            uni.switchTab({
              url: '/pages/index/home/index',
            })
          } else {
            this.$u.toast(res.msg, 2500)
          }
        })
      })
    },

    // 存储用户信息
    async localUserData() {
      // let res = await this.$post(
      //   'user/info',
      //   {
      //     openid: this.$util.getOpenid(),
      //   },
      //   true
      // )
      // if (res && res.code === 0) {
      //   uni.setStorageSync('user', res.user)
      // }
    },
    toHome() {
      uni.navigateBack({
        delta: 1,
      })
    },

    setUser(user) {
      // this.user.avatar = user.avatarUrl
      // this.user.nickName = user.nickName
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding: 50rpx;
}
.logo {
  margin-top: 126rpx;

  image {
    height: 56rpx;
    width: 297rpx;
    display: flex;
    margin: auto;
  }
}

.login-avatar {
  margin-top: 65rpx;

  image {
    height: 170rpx;
    width: 170rpx;
    display: flex;
    border-radius: 50%;
    margin: auto;
    border: 1rpx solid #f1f1f1;
  }

  .user-name {
    margin-top: 22rpx;
    font-size: 30rpx;
    font-weight: 400;
    color: #1a1a1a;
    text-align: center;
  }
}

.agreement {
  color: $base-link;
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

.picker-view {
  width: 100%;
  display: flex;
  align-items: center;
}

.picker-view > view {
  width: 95%;
}

.login {
  width: 90%;
  margin: auto;

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

.close {
  position: absolute;
  right: 5%;
  font-weight: 200;
}
.register {
  background: #eee !important;
  margin-top: 50rpx;
  color: #666 !important;
}
</style>
