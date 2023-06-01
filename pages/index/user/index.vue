<template>
  <view class="container">
    <view class="userinfo" v-if="user">
      <view class="userinfo-con">
        <view class="userinfo-avatar">
          <image
            :lazy-load="true"
            :lazy-load-margin="0"
            :src="user.pic ? user.pic : '/static/img/test5.png'"
          ></image>
        </view>
        <view class="userinfo-name">
          <view>{{ user.username ? user.username : '用户昵称' }}</view>
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

    <!-- <view class="u-m-t-20">
      <u-cell-group>
        <u-cell
          title="发布文章"
          isLink
          url="/pages/subPack/forum/addForum"
        ></u-cell>
      </u-cell-group>
    </view> -->
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('user')
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
    }
  },

  components: {},
  props: {},

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
  methods: {
    ...mapGetters(['userInfo']),

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
</style>
