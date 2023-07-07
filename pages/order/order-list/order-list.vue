<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-15 12:20:45
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-07 10:24:00
 * @FilePath: \mall-admind:\work\mall-applet\pages\order\order-list\test.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!--pages/orderList/orderList.wxml-->

  <view class="container">
    <!-- 头部菜单 -->
    <view class="order-tit">
      <view class="order-tab">
        <u-tabs
          :scrollable="true"
          :current="currentIndex"
          :list="tabList"
          @click="onStsTap"
          lineColor="#3b6dbb"
          :activeStyle="{
            color: '#3b6dbb',
            fontWeight: 'bold',
            transform: 'scale(1.05)',
          }"
          lineHeight="5"
          lineWidth="45"
        ></u-tabs>
      </view>
    </view>
    <!-- end 头部菜单 -->
    <view class="main">
      <view class="empty" v-if="list.length == 0"> 还没有任何相关订单 </view>
      <!-- 订单列表 -->
      <block v-for="(item, index) in list" :key="index">
        <orderItem
          :orderInfo="item"
          @toOrderDetailPage="toOrderDetailPage(item)"
        >
          <template v-slot:state>
            <view class="order-state">
              <text>{{
                item.status == 20
                  ? '预约中'
                  : orderInfo.status == 10
                  ? '预约成功'
                  : orderInfo.status == 30
                  ? '已到店'
                  : orderInfo.status == 0
                  ? '已完成'
                  : '已取消'
              }}</text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="prod-foot">
              <view class="btn" v-if="item.status == 20">
                <text
                  class="button"
                  @tap="onCancelOrder"
                  :data-ordernum="item.orderNumber"
                  hover-class="none"
                  >取消订单</text
                >
              </view>
              <view class="btn" v-if="item.status == 0">
                <text
                  class="button"
                  @click="createComment(item)"
                  :data-ordernum="item.orderNumber"
                  hover-class="none"
                  >评价</text
                >
              </view>
            </view></template
          >
        </orderItem>
      </block>
    </view>
  </view>
  <!-- end 订单列表 -->
</template>

<script>
// var http = require('../../utils/http.js')
import orderItem from './../components/order-item'
import { orderList } from '@/api/order'
import { getTotalPage } from '@/util/util'
export default {
  data() {
    return {
      list: [],
      tabList: [
        {
          name: '全部',
          id: null,
        },
        {
          name: '预约中',
          id: 20,
        },
        {
          name: '预约成功',
          id: 10,
        },
        {
          name: '已到店',
          id: 30,
        },
        {
          name: '已完成',
          id: 0,
        },
        {
          name: '已取消',
          id: -10,
        },
      ],
      current: 1,

      total: 0,
      more: 'noMore',
      size: 10,
      currentIndex: 0,
    }
  },

  components: { orderItem },
  props: {},
  computed: {
    orderDetailsState(status) {
      return (
        'order-sts  ' +
        (status == 1 ? 'red' : '') +
        '  ' +
        (status == 5 || status == 6 ? 'gray' : '')
      )
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options.sts) {
    //   this.setData({
    //     sts: options.sts
    //   })
    //   this.loadOrderData(options.sts, 1)
    // } else {
    this.loadOrderData()
    // }
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
  onPullDownRefresh() {
    this.current = 1
    this.loadOrderData()
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.more == 'more') {
      this.current++
      this.loadOrderData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    /**
     * 加载订单数据
     */
    async loadOrderData() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await orderList({
          current: this.current,
          size: this.size,
          status: this.tabList[this.currentIndex].id,
        })

        this.total = res.total
        let totalPage = getTotalPage(this.total, this.size)

        if (this.current == 1) {
          this.list = res.data
        } else {
          this.list = [...this.list, ...res.data]
        }
        if (totalPage > this.current) {
          this.more = 'more'
        } else {
          this.more = 'noMore'
        }
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },

    /**
     * 状态点击事件
     */
    onStsTap(e) {
      this.currentIndex = e.index
      this.loadOrderData()
    },

    /**
     * 取消订单
     */
    onCancelOrder: function (e) {
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
    createComment(e) {
      uni.navigateTo({
        url: '/pages/order/order-comment/order-comment-add?orderId=' + e.id,
      })
    },
    /**
     * 查看订单详情
     */
    toOrderDetailPage(e) {
      uni.navigateTo({
        url: '/pages/order/order-detail/order-detail?orderId=' + e.id,
      })
    },
  },
}
</script>
<style scoped lang="scss">
/deep/ .u-tabs__wrapper__nav__line {
  left: 24rpx;
}
@import './order-list.scss';
</style>
<style>
page {
  background-color: #f4f4f4;
  color: #333;
}
</style>
