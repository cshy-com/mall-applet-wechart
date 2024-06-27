<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-08-25 11:53:07
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-09-06 09:24:55
 * @FilePath: \mall-admind:\work\mall-applet\pages\coupon\transferScanCode.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <defNav :isTransparent="true"></defNav>
    <image class="page-bg" :class="{ gry: expired }" :src="defBg"> </image>
    <view class="page-box" :class="{ gry: expired }" v-if="transferCodeInfo">
      <view class="box">
        <view class="user-box">
          <view class="user">
            <image class="user-avatar" :src="user.avatar || defAvatar"> </image>
            <text class="user-name">{{ user.nickName }}</text>
          </view>
        </view>
        <view class="money">
          <text class="status" v-if="transferCodeInfo.status == 1">已领取</text>
          <text class="status" v-if="[2, 0].includes(transferCodeInfo.status)"
            >待领取</text
          >
          <text class="status" v-if="transferCodeInfo.status == 3">已过期</text>

          <text>{{ transferCodeInfo.credits }}</text>
        </view>
        <view class="time">
          <text class="lable">转账时间</text>
          <text>{{ transferCodeInfo.createTime }}</text>
        </view>
      </view>
      <!-- && !source -->
      <template v-if="userInfo">
        <view class="box-btn" v-if="userInfo.nickName!==user.nickName"  @click="receiveIntegral">
        领取积分
      </view>
      </template>
      
      <button
        v-if="!userInfo"
        class="box-btn"
        type="text"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
        :plain="true"
      >
        领取积分
      </button>

      <view class="box-footer-tip"> 温馨提示：24小时内未领取，将退还积分 </view>
    </view>
    <view :class="{ expired: expired }">
      <image class="page-expired-icon" :src="defExpired"> </image>
    </view>
    <transPopup :show="show" @close="close">
      <template slot="footer">
        <view class="pop-tip"
          >恭喜你！{{ transferCodeInfo.credits }}积分领取成功</view
        >
        <view class="foot-btn">
          <button @click="goHome">去首页</button>
          <button @click="goPage">去查看</button>
        </view>
      </template>
    </transPopup>
  </view>
</template>

<script>
import { transferQrCodeScan, getTransferInfo } from '@/api/integral'
import { getUrlParams } from '@/util/util'
import transPopup from './components/transPopup'
import { getUserInfoById, wxLogin } from '@/api/index'
import { createNamespacedHelpers } from 'vuex'

const { mapMutations, mapGetters, mapActions } = createNamespacedHelpers('user')
import { setAuthorization, getAuthorization } from '@/util/auth.js'
export default {
  //import引入组件才能使用
  components: { transPopup },
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
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['userInfo']),
    defBg() {
      return `${this.$fileUrl}/sysFile/img_saoma_bg.png`
    },
    defAvatar() {
      return `${this.$fileUrl}/sysFile/avatar.png`
    },
    defExpired() {
      return `${this.$fileUrl}/sysFile/img_shixiao_bq.png`
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapActions(['setUserInfoAction', 'setIntegralTotalAction']),
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
          this.receiveIntegral()
        }
      })
    },
    goPage() {
      this.show=false
      uni.navigateTo({
        url: '/pages/coupon/integralList',
      })
    },
    goHome() {
      uni.switchTab({
        url: '/pages/index/home/userHome',
      })
    },
    async getInfo() {
    
      let { code, data } = await getUserInfoById({
        userId: this.userId,
      })
   
      if (code == 0) {
        this.user = data
      }
   
      let res1 = await getTransferInfo(this.Id)
      if (res1.code == 0) {
        this.transferCodeInfo = res1.data
        if ([1, 3].includes(this.transferCodeInfo.status)) {
          this.expired = true
        }
      }
  
    },
    async receiveIntegral() {
      console.log("codeId"+this.Id,'sourceUserId'+this.userId)
      let { code, data } = await transferQrCodeScan({
        codeId: this.Id,
        sourceUserId: this.userId,
      })
      if (code == 0) {
        this.setUserInfoAction()
        this.setIntegralTotalAction(this.userInfo.userType)
        this.show = true
      }
    },
    close() {
      this.show = false
    },
  },
  onLoad(options) {
    const { q } = options

    if (q) {
      let urlStr = decodeURIComponent(q)

      let urlParams = getUrlParams(urlStr)
      this.Id = urlParams.id
      this.userId = urlParams.userId
   
    }
    if (options?.id) {
      this.Id = options.id
    }
    if (options?.userId) {
      this.userId = options.userId
    }
    if (options?.source) {
      this.source = options.source
    }

  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  onShow() {
    this.getInfo()
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
<style scoped lang="scss">
.expired {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 100;
  .page-expired-icon {
    position: absolute;
    left: 490rpx;
    top: 1070rpx;
    width: 200rpx;
    height: 200rpx;
  }
}
.gry {
  -webkit-filter: grayscale(0.95);
}
.page-bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
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
    position: fixed;
    width: 100%;
    top: 35vh;
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
    .user-avatar {
      width: 46rpx;
      height: 43rpx;
      margin-right: 11rpx;
      border-radius: 50%;
    }
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
    border-bottom: 2rpx solid #eeeeee;
    margin-top: 46rpx;
    .status {
      font-size: 28rpx;

      font-weight: 400;
      color: #888888;

      line-height: 40rpx;
    }
  }
  .time {
    margin: 0 60rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;

    font-weight: 400;
    color: #333333;
    .lable {
      color: #888888;
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
  border: none;    position: fixed;
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
  background: #3b6dbb;
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
    background: #d9e4f6;
    margin-right: 30rpx;
    color: #3b6dbb;
  }
}
</style>
