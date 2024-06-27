<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-15 12:20:45
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-31 16:10:18
 * @FilePath: \mall-admind:\work\mall-applet\pages\order\order-list\test.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!--pages/orderList/orderList.wxml-->

  <view class="container">
    <defNav title="我的订单"></defNav>
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
          }"
          :inactiveStyle="{
            fontSize: '30rpx',
            color: '#888888',
          }"
          lineHeight="5"
          lineWidth="45"
        ></u-tabs>
      </view>
    </view>
    <!-- end 头部菜单 -->
    <view class="main">
      <nodata
        v-if="noDate"
        :config="{
          content: '暂无订单数据',
          imgUrl: defaultImg,
        }"
      ></nodata>
      <template v-else>
        <!-- 订单列表 -->
        <block v-for="(item, index) in list" :key="index">
          <businessOrderList
            :orderInfo="item"
            @toOrderDetailPage="toOrderDetailPage(item)"
          >
            <template v-slot:state>
              <view class="order-num">
                <text class="order-id">订单编号：{{ item.id }}</text>
                <view class="order-state">
                  <text
                    :class="{
                      red: item.status == 20,
                      green: item.status == 10,
                      blue: item.status == 30,
                      grey: item.status == -10,
                      orange: item.status == 40,
                    }"
                    >{{
                      item.statusName ||
                      (item.status == 20
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
                    }}</text
                  >
                </view>
              </view>
            </template>
            <template v-slot:decoration>
              <view class="decoration">
                <image :src="defDecoration"></image>
              </view>
            </template>
            <template v-slot:footer>
              <view class="prod-foot">
                <!-- <view class="btn" v-if="item.status == 30">
                  <text
                    class="button"
                    @tap="orderListComplete(item)"
                    :data-ordernum="item.orderNumber"
                    hover-class="none"
                    >完成订单</text
                  >
                </view> -->
                <view class="btn" v-if="item.status == 40">
                  <text
                    class="button blue-btn"
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
        <noMore v-if="more == 'noMore' && current > 1"></noMore>
      </template>
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
        // {
        //   name: '已到店',
        //   id: 30,
        // },
        {
          name: '已完成',
          id: 0,
        },
        {
          name: '已评论',
          id: 40,
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
      noDate: false,
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
    defDecoration() {
      return `${this.$fileUrl}/sysFile/img_dingd_zhuangs.png`
    },
    defaultImg() {
      return this.$fileUrl + '/sysFile/img_dingdan.png'
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.status && Number(options.status) > -1) {
      this.currentIndex = this.tabList.findIndex(
        (val) => val.id == options.status
      )
    } else {
      this.currentIndex = 0
    }
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
          this.noDate = res.total == 0
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
