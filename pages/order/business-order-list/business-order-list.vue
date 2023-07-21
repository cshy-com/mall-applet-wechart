<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-15 12:20:45
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-21 10:44:42
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
        <businessOrderList
          :orderInfo="item"
          @toOrderDetailPage="toOrderDetailPage(item)"
        >
          <template v-slot:state>
            <view class="order-state">
              <text>{{
               item.statusName||( item.status == 20
                  ? '预约中'
                  : item.status == 10
                  ? '预约成功'
                  : item.status == 30
                  ? '已到店'
                  : item.status == 0
                  ? '已完成'
                  : orderInfo.status == 40
                  ? '已评论'
                  : '已取消')
              }}</text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="prod-foot">
              <view class="btn">
                <text
                  v-if="item.status == 30"
                  class="button"
                  @tap="orderListComplete(item)"
                  :data-ordernum="item.orderNumber"
                  hover-class="none"
                  >完成订单</text
                >
                <text
                  class="button"
                  v-if="item.status == 40"
                  @click="createComment(item)"
                  :data-ordernum="item.orderNumber"
                  hover-class="none"
                  >查看评价</text
                >
              </view>
            </view>
          </template>
        </businessOrderList>
      </block>
    </view>
  </view>
  <!-- end 订单列表 -->
</template>

<script>
import { orderList, orderComplete } from '@/api/order'
import { getTotalPage } from '@/util/util'
import businessOrderList from './../components/business-order-item'
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

      total: 0,
      more: 'noMore',
      size: 10,
      current: 1,
      currentIndex: 0,
      defaultAvatar: require('@/static/img/icon/head04.png'),
    }
  },

  components: { businessOrderList },
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
    this.loadOrderData()
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
  onReachBottom: function () {
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
    createComment(e) {
      uni.navigateTo({
        url: '/pages/order/order-comment/order-comment-add?orderId=' + e.id,
      })
    },
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
    onStsTap: function (e) {
      this.currentIndex = e.index
      this.loadOrderData()
    },

    /**
     * 完成订单
     */
    async orderListComplete(e) {
      try {
        await orderComplete(e.id)
        uni.$u.toast('操作成功')
        this.loadOrderData()
      } catch (e) {
        console.log(e)
      }
    },

    /**
     * 查看订单详情
     */
    toOrderDetailPage(e) {
      uni.navigateTo({
        url:
          '/pages/order/business-order-detail/business-order-detail-data?orderId=' +
          e.id,
      })
    },
  },
}
</script>
<style>
page {
  background-color: #f4f4f4;
  color: #333;
}
</style>
<style lang="scss" scoped>
/deep/ .u-tabs__wrapper__nav__line {
  left: 24rpx;
}
@import './business-order-list.scss';
</style>
