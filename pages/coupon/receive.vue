<template>
  <!--pages/order-detail/order-detail.wxml-->

  <view class="container">
    <defNav :title="'领取积分'" :isTransparent="true"></defNav>
    <image class="page-bg" :src="defBg"></image>
    <view class="page-content" v-if="ticketInfo">
      <image class="page-content-top-img" :src="defDecoration"></image>
      <view class="page-top">
        <view class="source"> 来源于：{{ ticketInfo.firstPartyName }} </view>
        <view class="money">
          <text class="money-tip"> 积分值 </text>
          <text>{{ ticketInfo.number }}</text>
        </view>
        <view class="line"></view>
        <view class="list-box">
          <view class="lable">积分状态</view>
          <view clss="status" v-if="ticketInfo.ifFailure == 0">待领取</view>
          <view clss="status" v-if="ticketInfo.ifFailure == 1">已失效</view>
        </view>
        <view class="list-box">
          <view class="lable">失效时间</view>
          <view>{{ ticketInfo.failureDate }}</view>
        </view>
        <view class="line"></view>
        <view class="list-box">
          <view class="lable">创建时间</view>
          <view>{{ ticketInfo.createTime }}</view>
        </view>
        <view class="list-box">
          <view class="lable">积分券号</view>
          <view class="code-number">{{ ticketInfo.id }}</view>
        </view>
      </view>
      <view class="box-btn" v-if="ticketInfo.ifFailure == 0">
        <button
          class="btn"
          type="text"
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumber"
          :plain="true"
        >
          手机号领取积分
        </button>
        <button class="btn" v-if="showDef" @click="getTicket">
          账号直接领取积分
        </button>
      </view>
      <view class="box-tip" v-if="userInfo" @click="goHome">
        {{ticketInfo.ifFailure == 0?'暂不领取去首页 >':'去首页 >'}}
      </view>
    </view>
    <u-modal :show="show" :content="content" @confirm="confirm"></u-modal>
  </view>
</template>

<script>
import { getUrlParams } from '@/util/util'
import { setAuthorization, getAuthorization } from '@/util/auth.js'
import { mallIntegralTicket, mallIntegralTicketObj } from '@/api/integral'
import { wxLogin } from '@/api/index.js'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapGetters, mapActions } = createNamespacedHelpers('user')
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      show: false,

      content: '领取成功，去其他地方逛逛吧',
      userType: 1,
      code: '',
      Id: '',
      showDef: false,
      config: {
        color: ['#000', '#000'],
        title: '领取积分',

        back: false,
        fixed: true,
        centerSlot: true,
      },
      ticketInfo: null,
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['userInfo']),
    defDecoration() {
      return `${this.$fileUrl}/sysFile/img_zhuanz_jifenzhs.png`
    },
    defBg() {
      return `${this.$fileUrl}/sysFile/img_zhuanz_bg.png`
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapActions(['setUserInfoAction', 'setIntegralTotalAction']),
    async getTicketInfo() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        console.log(this.Id)
        let { code, data } = await mallIntegralTicketObj(this.Id)
        if (code == 0) {
          this.ticketInfo = data
        }
      } finally {
        uni.hideLoading()
      }
    },
    confirm(e) {
      this.goHome()
    },
    goHome() {
      uni.switchTab({
        url:
          this.userType == 1
            ? '/pages/index/home/userHome'
            : '/pages/index/home/businessHome',
      })
    },
    // 获取当前微信用户手机号，领取积分
    getPhoneNumber(e) {
      wxLogin(e.detail.code).then((res) => {
        if (res && res.code == 0) {
          // 如果已经有用户登录 当前用户不同，清空搜索历史
          if (this.userInfo && this.userInfo != res.data.userId) {
            uni.removeStorageSync('recentSearch')
          }

          setAuthorization(res.data.token)
          this.setUserInfo(res.data)
          uni.setStorageSync('user', res.data)
          this.getTicket()
        }
      })
    },
    // 积分入账
    async getTicket() {
      try {
        uni.showLoading({
          title: '加载中',
        })
        let { code, msg } = await mallIntegralTicket({ code: this.code })

        if (code == 0) {
          this.show = true
          this.setUserInfoAction()
          this.setIntegralTotalAction(this.userInfo.userType)
        } else {
          this.content = msg + ',去其他地方逛逛吧'
          this.show = true
        }
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  onLoad: function (options) {
    const { q } = options

    if (q) {
      let urlStr = decodeURIComponent(q)

      let urlParams = getUrlParams(urlStr)
      this.code = urlParams.code
      this.Id = urlParams.id
      console.log('urlParams' + JSON.stringify(urlParams))
      console.log('code' + this.code)
      console.log('Id' + this.Id)
    }
    if (options?.code) {
      this.code = options.code
    }
    if (options.id) {
      this.Id = options.id
    }
    this.getTicketInfo()
  },
  onShow() {
    if (this.userInfo) {
      this.showDef = true
    }
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
    height: 742rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    .source {
      text-align: center;
      padding-top: 77rpx;
      font-weight: 500;
      color: #333333;
      font-size: 30rpx;
      margin-bottom: 50rpx;
    }
    .money {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 500;
      color: #4079d2;
      line-height: 103rpx;
      font-size: 80rpx;
      .money-tip {
        text-align: center;
        color: #333333;
        font-size: 30rpx;
        line-height: 42rpx;
        margin-bottom: 10rpx;
      }
    }
    .line {
      width: 630rpx;
      height: 1rpx;
      border-top: 1rpx solid #eeeeee;
      margin: 30rpx;
    }
    .list-box {
      display: flex;
      justify-content: space-between;
      margin: 0 30rpx;
      .lable {
        color: #888888;
      }
      .status {
        color: #4079d2;
      }
      .code-number {
        width: 480rpx;
        overflow-wrap: break-word;
        text-align: right;
      }
    }
  }

  .box-btn {
    display: flex;
    margin: 0 30rpx;
    margin-top: 79rpx;
    .btn {
      width: 330rpx;
      height: 98rpx;
      background: #4079d2;
      border-radius: 14rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 98rpx;
    }
    .btn::after {
      border: none;
    }
    .btn:nth-child(1) {
      background: #d1dcee;
      color: #4079d2;
      border: none;
    }
  }
  .box-tip {
    margin-top: 50rpx;
    font-size: 28epx;
    font-weight: 400;
    color: #888888;
    line-height: 40rpx;
    text-align: center;
  }
}
</style>
