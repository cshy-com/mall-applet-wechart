<template>
  <!--pages/order-detail/order-detail.wxml-->

  <view class="container"> </view>
</template>

<script>

import { getUrlParams } from '@/util/util'

import { getAuthorization } from '@/util/auth'
export default {
  data() {
    return {
      
      orderCode: '',
    }
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = getAuthorization()
    if (!token) {
      this.$tip.toast('暂未登录')
      uni.redirectTo({
        url: '/pages/public/login',
      })
    }

    if (options?.code) {
      this.orderCode = options.code
      console.log('this.orderCode' + this.orderCode)
      // console.log("扫码参数"+JSON.stringify(options) )
      // console.log('orderCode'+JSON.stringify(this.orderCode))
    }

    const { q } = options

    if (q) {
      let urlStr = decodeURIComponent(q)

      let urlParams = getUrlParams(urlStr)
      this.orderCode = urlParams.code
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    uni.redirectTo({
      url:
        '/pages/order/business-order-detail/business-order-detail-data?code=' +
        this.orderCode,
    })
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
  methods: {},
}
</script>
<style>
page {
  background: #f4f4f4;
}
</style>
<style lang="scss" scoped></style>
