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
      <!-- 商品信息 -->
      <view class="prod-item" v-if="orderItemDtos">
        <block>
          <view class="item-cont" :data-prodid="orderItemDtos.prodId">
            <view class="prod-info">
              <view class="prodname">
                <view class="prod-pic">
                  <image :src="orderItemDtos.avatar||defaultAvatar"></image>
                </view>
                <view class="name"> {{ orderItemDtos.nickName }}</view>
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
      <view class="order-detail-footer" v-if="orderItemDtos.status == 30">
        <text class="dele-order" @tap="orderListComplete">完成订单</text>
      </view>
      <view
        class="order-detail-footer"
        v-if="orderCode && orderItemDtos.status == 10"
        @tap="verificationUpon"
      >
        <text class="dele-order">到店核销</text>
      </view>
    </view>
  </view>
</template>

<script>
// pages/order-detail/order-detail.js
// var http = require("../../utils/http.js");
import { getUrlParams } from '@/util/util'
import {
  orderDatail,
  orderComplete,
  orderForArrived,
  orderDetailByQrcode,
} from '@/api/order'
import { getAuthorization } from '@/util/auth'
export default {
  data() {
    return {
      orderItemDtos: {},
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
      ],
      stepsList: [],
      orderCode: '',
      current: 0,
      defaultAvatar:require('@/static/img/icon/head04.png')
    }
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.orderId = options.orderId
   
    if(options?.code){
      this.orderCode = (options.code)
      console.log('this.orderCode'+this.orderCode)
      // console.log("扫码参数"+JSON.stringify(options) )
      // console.log('orderCode'+JSON.stringify(this.orderCode))
    }
    this.loadOrderDetail()
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
    //确认到店核销
    async verificationUpon() {
      try {
        await orderForArrived(this.orderCode)
        uni.$u.toast('到店成功')
        this.loadOrderDetail()
      } catch (e) {
        console.log(e)
      }
    },

    /**
     * 加载订单数据
     */
    async loadOrderDetail() {
      let res

      if (this.orderId) {
        res = await orderDatail(this.orderId)
        console.log("列表进详情")
      } else {
        console.log("扫码进详情"+this.orderCode)
        res = await orderDetailByQrcode(this.orderCode)
      }

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

    //完成订单
    async orderListComplete() {
      try {
        await orderComplete(this.orderItemDtos.id)
        uni.$u.toast('完成订单')
        this.loadOrderDetail()
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
<style>
page {
  background: #f4f4f4;
}
</style>
<style lang="scss" scoped>
@import './business-order-detail-data.scss';
</style>
