<template>
  <!--pages/order-detail/order-detail.wxml-->

  <view class="container">
    <view class="order-detail">
      <view class="order-steps">
        <u-steps :current="current">
          <u-steps-item
            v-for="item in stepsList"
            :key="item.id"
            :title="item.title"
            :desc="item.desc"
          ></u-steps-item>
        </u-steps>
      </view>
      <view class="qr-code">
        <u-image
          :showLoading="true"
          :src="qrCodesrc"
          width="200px"
          height="200px"
          
        ></u-image>
      </view>
      <!-- 商品信息 -->
      <view class="prod-item" v-if="orderItemDtos">
        <block>
          <view
            class="item-cont"
            @tap="toProdPage(orderItemDtos.shopId)"
            :data-prodid="orderItemDtos.shopId"
          >
            <view class="prod-pic">
              <image :src="orderItemDtos.mainImage"></image>
            </view>
            <view class="prod-info">
              <view class="prodname">
                {{ orderItemDtos.shopName }}
              </view>
              <view class="prod-info-cont">
                <text class="number"
                  >到店人数：{{ orderItemDtos.numberOfPeople }}</text
                >
              </view>
              <view class="price-nums clearfix">
                <text class="prodprice">
                  到店时间：{{ orderItemDtos.estimatedTime }}</text
                >
              </view>
            </view>
          </view>
        </block>
      </view>

      <!-- 订单信息 -->
      <view class="order-msg">
        <view class="msg-item">
          <view class="item">
            <text class="item-tit">订单编号：</text>
            <text class="item-txt">{{ orderItemDtos.id }}</text>
          </view>
          <view class="item">
            <text class="item-tit">下单时间：</text>
            <text class="item-txt">{{ orderItemDtos.createTime }}</text>
          </view>
        </view>
        <view class="msg-item">
          <view class="item">
            <text class="item-tit">订单备注：</text>
            <text class="item-txt remarks">{{ orderItemDtos.remarks }}</text>
          </view>
        </view>
      </view>
      <!-- 底部栏 -->
      <view class="order-detail-footer" v-if="orderItemDtos.status == 20">
        <text class="dele-order" @tap="delOrderList">取消订单</text>
      </view>
    </view>
  </view>
</template>

<script>
// pages/order-detail/order-detail.js
// var http = require("../../utils/http.js");
import { orderDatail, orderQrCode } from '@/api/order'
export default {
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
          title: '预约中',
          id: 20,
          desc: '',
        },
        {
          title: '预约成功',
          id: 10,
          desc: '',
        },
        {
          title: '已到店',
          id: 30,
          desc: '',
        },
        {
          title: '已完成',
          id: 0,
          desc: '',
        },
      ],
      stepsListError: [
        {
          title: '预约中',
          id: 20,
          desc: '',
        },
        {
          title: '已取消',
          id: -10,
          desc: '',
        },
      ],  stepsList: [],
      current:0
    }
  },

  components: {},
  props: {},

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
  onShow: function () {},

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
    toProdPage (e) {
      uni.navigateTo({
        url: '/pages/mall/store/storeDetails?id=' + e,
      })
    },

    /**
     * 加载订单数据
     */
    async loadOrderDetail() {
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
<style>
@import './order-detail.css';
</style>
