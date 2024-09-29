<template>
  <!--pages/order-detail/order-detail.wxml-->

  <view class="container">
    <defNav title="订单详情"></defNav>
    <view class="order-detail">
      <view class="blue-bg-box">
        <view class="blue-img"> </view>
        <view class="order-steps">
          <steps :step="current" :stepList="stepsList"  
          :activeCheckedImg="defStepsOrange"
          :checkedImg="defStepBlue" :unCheckedImg="defStepGrey"></steps>
        </view>
      </view>
      <view class="decoration">
        <image :src="defDecoration"></image>
      </view>
      <!-- <view class="qr-code">
        <view class="qr-code-img"> <image :src="qrCodesrc"></image></view>
        <text>到店亮码核销</text>
        <image class="qr-code-left" :src="defDecoration1"></image>
        <image class="qr-code-right" :src="defDecoration1"></image>
      </view> -->
      <!-- 商品信息 -->
      <view class="order-box">
        <template v-if="orderItemDtos">
          <orderItem
            :orderInfo="orderItemDtos"
            @toOrderDetailPage="toProdPage(orderItemDtos.shopId)"
          >
          </orderItem>
        </template>
      </view>
      <!-- 订单信息 -->
      <view class="order-msg">
        <view class="msg-item">
          <view class="msg-item-title">订单详情</view>
          <view class="item">
            <text class="item-tit">订单编号：</text>
            <text class="item-txt">{{ orderItemDtos.id }}</text>
          </view>
          <view class="item">
            <text class="item-tit">下单时间：</text>
            <text class="item-txt">{{ orderItemDtos.createTime }}</text>
          </view>
          <view class="item">
            <text class="item-tit">订单备注：</text>
            <text class="item-txt remarks">{{ orderItemDtos.remarks }}</text>
          </view>
        </view>
        
      </view>
      <!-- 底部栏 -->
      <view class="order-detail-footer" v-if="orderItemDtos.status == 20">
        <text class="dele-order" @tap="delOrderList">取消预约</text>
      </view>
      <view class="order-detail-footer" v-if="orderItemDtos.status == 0">
        <text class="dele-order blue-btn" @tap="createComment">评价</text>
      </view>
      <view class="order-detail-footer" v-if="orderItemDtos.status == 10">
        <text class="dele-order blue-btn-def" @tap="payOrder">积分付款</text>
      </view>
      <view class="order-detail-footer" v-if="orderItemDtos.status == 40">
        <text class="dele-order blue-btn" @tap="createComment">查看评价</text>
      </view>
    </view>
  </view>
</template>

<script>
// pages/order-detail/order-detail.js
import orderItem from './../components/order-item'
import { orderDatail, orderQrCode } from '@/api/order'
import steps from "./../components/steps"
export default {
  options: { styleIsolation: 'shared' }  ,
  data() {
    return {
      orderItemDtos: {
        orderNumber: 29109,
        status: 2,
        shopName: '测试的店铺',
        shopAvatar:
          'https://www.bankservice.shop/file/upload/2023/05/30/3f1852903b12a771810f3367f62d0daf366564_20230530152038A015.jpg',
        number: 1,
        time: '2023-09-08 13:00',
      },
      remarks: '',
      actualTotal: 0,
      userAddrDto: null,
      orderNumber: '',
      createTime: '',
      status: 0,
      productTotalAmount: '',
      transfee: '',
      reduceAmount: '',
      prodid: '',
      total: 0, // 商品总额
      qrCodesrc: 'https://cdn.uviewui.com/uview/album/1.jpg', // 二维码信息
      orderId: '',

      stepsListSuccess: [
        // {
        //   title:'已取消',
        //   id:-10
        // },
        {
          name: '预约中',
          id: 20,
          desc: '',
        },
        {
          name: '预约成功',
          id: 10,
          desc: '',
        },
        // {
        //   name: '已到店',
        //   id: 30,
        //   desc: '',
        // },
        {
          name: '已完成',
          id: 0,
          desc: '',
        },
        {
          name: '已评论',
          id: 40,
          desc: '',
        },
      ],
      stepsListError: [
        {
          name: '预约中',
          id: 20,
          desc: '',
        },
        {
          name: '已取消',
          id: -10,
          desc: '',
        },
      ],
      stepsList: [],
      current: 0,
    }
  },

  components: { orderItem ,steps},
  props: {},
  computed: {
    defDecoration1() {
      return `${this.$fileUrl}/sysFile/img_dingd_zhuangs_1.png`
    },
    defDecoration() {
      return `${this.$fileUrl}/sysFile/img_dingd_yuan.png`
    },
    defStepBlue() {
      return `${this.$fileUrl}/sysFile/ic_xq_jiedian_lans.png`
    },
    defStepGrey() {
      return `${this.$fileUrl}/sysFile/ic_xq_jiedian_huise.png`
    },
    defStepsOrange() {
      return `${this.$fileUrl}/sysFile/ic_xq_jiedian_huangs.png`
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.orderId = options.orderId
    this.loadOrderDetail()
    this.getCodeImg()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    uni.$on('refresh', (data) => {
      if (data.refresh) {
        this.loadOrderDetail()
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    uni.$off('refresh')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadOrderDetail()
    this.getCodeImg()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    async getCodeImg() {
      let res = await orderQrCode(this.orderId)
      this.qrCodesrc = res.data
    },
    //跳转商品详情页
    toProdPage(e) {
      uni.navigateTo({
        url: '/pages/mall/store/storeDetails?id=' + e,
      })
    },
    createComment(e) {
      uni.navigateTo({
        url:
          '/pages/order/order-comment/order-comment-add?orderId=' +
          this.orderId,
      })
    },
    payOrder(e){
      uni.navigateTo({
        url: '/pages/order/orderPay?orderId=' + this.orderId,
      })
    },
    /**
     * 加载订单数据
     */
    async loadOrderDetail() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await orderDatail(this.orderId)
        this.orderItemDtos = res.data
        if (this.orderItemDtos.status >= 0) {
          this.stepsList = this.stepsListSuccess
          this.current = this.stepsList.findIndex(
            (val) => val.id == res.data.status
          )
        } else {
          this.stepsList = this.stepsListError

          this.current = 1
        }
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },

    //删除已完成||已取消的订单
    delOrderList: function () {
      uni.makePhoneCall({
        phoneNumber: '017-71237819', //电话号码
        success: function (e) {
          console.log(e)
        },
        fail: function (e) {
          console.log(e)
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/ .hx-navbar{
  z-index: 9999
}
@import './order-detail.scss';
</style>
