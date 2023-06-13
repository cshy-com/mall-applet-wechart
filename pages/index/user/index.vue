<template>
  <view class="container">
    <view class="userinfo" v-if="user">
      <view class="userinfo-con" @click="getUserInfo">
        <view class="userinfo-avatar">
          <image
            :lazy-load="true"
            :lazy-load-margin="0"
            :src="user.avatarUrl ? user.avatarUrl : '/static/img/test5.png'"
          ></image>
        </view>
        <view class="userinfo-name">
          <view>{{ user.nickName ? user.nickNamenickName : '用户昵称' }}</view>
        </view>
      </view>
    </view>

    <view class="userinfo-none" v-if="!user">
      <view class="default-pic" @tap="toLogin">
        <image
          :lazy-load="true"
          :lazy-load-margin="0"
          src="/static/img/test5.png"
        ></image>
      </view>
      <view class="none-login" @tap="toLogin">
        <button class="unlogin">未登录</button>
        <button class="click-login">点击登录账号</button>
      </view>
    </view>
    <view class="user-integral">
      <view @click="integralEvent" class="user-integral-item">
        <text>我的积分</text>
        <text class="grid-text">{{userAccount.totalScore||0}}</text>
      </view>
    </view>
    <view class="u-m-t-20">
      <u-cell-group>
        <!-- <u-cell
          title="发布文章"
          isLink
          url="/pages/article/addForum"
        ></u-cell> -->
        <u-cell title="我的论坛" isLink url="/pages/article/forumList"></u-cell>
        <u-cell
          title="历史建议"
          isLink
          url="/pages/article/recommendationList"
        ></u-cell>
        <!-- <u-cell
          title="领积分快捷入口"
          isLink
          url="/pages/coupon/receive"
        ></u-cell>
        <u-cell
          title="积分支付给商家"
          isLink
          url="/pages/coupon/receive"
        ></u-cell> -->
      </u-cell-group>
    </view>
    <view class="user-block-1">
      <image
        :lazy-load="true"
        :lazy-load-margin="0"
        class="user-block-img"
        mode="aspectFit"
        src="/static/img/user1.png"
      ></image>
    </view>
    <view class="user-block-1 user-block-2">
      <image
        :lazy-load="true"
        :lazy-load-margin="0"
        class="user-block-img"
        mode="aspectFit"
        src="/static/img/user2.png"
      ></image>
    </view>
    <view class="user-block-1 user-block-3">
      <image
        :lazy-load="true"
        :lazy-load-margin="0"
        class="user-block-img"
        mode="aspectFit"
        src="/static/img/user3.png"
      ></image>
    </view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('user')
import { getUserInfo } from '@/api/index'
export default {
  data() {
    return {
      orderAmount: '',
      sts: '',
      collectionCount: 0,
      isAuthInfo: false,
      loginResult: '',
      picDomain: '', // config.picDomain
      user: {},
      userAccount:null
    }
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUser()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.user = uni.getStorageSync('user')
  },

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
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    async getUser() {
      try {
        let res = await getUserInfo()
      this.userAccount=res.data
      } catch (e) {
        console.log(e)
      }
    },
    integralEvent() {
      uni.navigateTo({
        url: '/pages/coupon/integralList',
      })
    },
    getUserInfo() {
      uni.navigateTo({
        url: '/pages/mine/updateUserInfo',
      })
      //   let that=this
      //   wx.getUserProfile({
      //   desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      //   success: (res) => {
      //     that.user=res.userInfo
      //     debugger
      //     // this.setData({
      //     //   userInfo: res.userInfo,
      //     //   hasUserInfo: true
      //     // })
      //   }
      // })

      //       wx.getUserInfo({
      //   success: function(res) {
      //     var userInfo = res.userInfo
      //     that.user=userInfo
      //     debugger
      //     // var nickName = userInfo.nickName
      //     // var avatarUrl = userInfo.avatarUrl
      //     // var gender = userInfo.gender //性别 0：未知、1：男、2：女
      //     // var province = userInfo.province
      //     // var city = userInfo.city
      //     // var country = userInfo.country
      //   }
      // })
    },
    /**
     * 去登陆
     */
    toLogin: function () {
      uni.redirectTo({
        url: '/pages/public/login',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import './index.scss';
.u-m-t-20 {
  background: #fff;
}
</style>
