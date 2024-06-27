<template>
  <!--pages/order-detail/order-detail.wxml-->

  <view class="container">
    <defNav title="订单详情"></defNav>
    <view class="order-detail" v-if="orderItemDtos && orderItemDtos.id">
      <view class="blue-bg-box">
        <view class="blue-img"> </view>
        <view class="order-steps">
          <steps
            :step="current"
            :stepList="stepsList"
            :activeCheckedImg="defStepsOrange"
            :checkedImg="defStepBlue"
            :unCheckedImg="defStepGrey"
          ></steps>
        </view>
      </view>
      <view class="decoration">
        <image :src="defDecoration"></image>
      </view>
     


      <!-- 商品信息 -->
      <view class="order-box">
        <template v-if="orderItemDtos">
          <businessOrderList :orderInfo="orderItemDtos"></businessOrderList>
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
      <!-- <view class="order-detail-footer" v-if="orderItemDtos.status == 30">
        <text class="dele-order" @tap="orderListComplete">完成订单</text>
      </view> -->
      <!-- <view
        class="order-detail-footer"
        v-if="orderCode && orderItemDtos.status == 10"
        @tap="verificationUpon"
      >
        <text class="dele-order blue-btn">到店核销</text>
      </view> -->
      <view
        class="order-detail-footer"
        v-if="orderItemDtos.status == 40"
        @tap="createComment"
      >
        <text class="dele-order blue-btn">查看评价</text>
      </view>
    </view></view
  >
</template>

<script>
import steps from './../components/steps'
import businessOrderList from './../components/business-order-item'
import {
  orderDatail,
  orderComplete,
  orderForArrived,
  orderDetailByQrcode,
} from '@/api/order'

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
      orderCode: '',
      current: 0,
    }
  },

  components: { businessOrderList, steps },
  props: {},
  computed: {
    defDecoration() {
      return `${this.$fileUrl}/sysFile/img_dingd_yuan.png`
    },
    defDecoration1() {
      return `${this.$fileUrl}/sysFile/img_dingd_zhuangs_1.png`
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

    if (options?.code) {
      this.orderCode = options.code
      console.log('this.orderCode' + this.orderCode)
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
    createComment() {
      uni.navigateTo({
        url:
          '/pages/order/order-comment/order-comment-add?orderId=' +
          this.orderId,
      })
    },
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
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res

        if (this.orderId) {
          res = await orderDatail(this.orderId)
          console.log('列表进详情')
        } else {
          console.log('扫码进详情' + this.orderCode)
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
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
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
