<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-07-27 10:20:46
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-03-01 09:32:08
 * @FilePath: \mall-applet\pages\order\order-list\order-list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-15 12:20:45
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-29 17:20:06
 * @FilePath: \mall-admind:\work\mall-applet\pages\order\order-list\test.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="container">
    <defNav title="我的订单"></defNav>
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
          <orderItem
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
                        : orderInfo.status == 10
                        ? '预约成功'
                        : orderInfo.status == 30
                        ? '已到店'
                        : orderInfo.status == 0
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
                <view class="btn" v-if="item.status == 20 || item.status == 10">
                  <text
                    class="button"
                    @tap="onCancelOrder(item)"
                    :data-ordernum="item.orderNumber"
                    hover-class="none"
                    >取消预约</text
                  >
                </view>
                <view
                  class="btn"
                  v-if="item.status == -10 || item.status == 40"
                >
                  <text
                    class="button"
                    @tap="onCreateOrder(item)"
                    :data-ordernum="item.orderNumber"
                    hover-class="none"
                    >{{ item.status == -10 ? '重新预约' : '再次预约' }}</text
                  >
                </view>
                <view class="btn" v-if="item.status == 10">
                  <text
                    class="button blue-btn-def"
                    @tap="payOrder(item)"
                    :data-ordernum="item.orderNumber"
                    hover-class="none"
                    >积分付款</text
                  >
                </view>
                <view class="btn" v-if="item.status == 40">
                  <text
                    class="button blue-btn"
                    @click="createComment(item)"
                    :data-ordernum="item.orderNumber"
                    hover-class="none"
                    >查看评价</text
                  >
                </view>
                <view class="btn" v-if="item.status == 0">
                  <text
                    class="button blue-btn"
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
        <noMore v-if="more == 'noMore' && current > 1"></noMore>
      </template>
    </view>
    <u-modal
      :title="'是否确认取消预约？'"
      @cancel="show = false"
      :showCancelButton="true"
      :show="show"
      @confirm="confirm"
      ref="uModal"
      :asyncClose="true"
    ></u-modal>
    <payPop :show="payPopShow"> </payPop>
  </view>
  <!-- end 订单列表 -->
</template>

<script>
import payPop from './../components/payPop'
import orderItem from './../components/order-item'
import { orderList, orderStatusChange, finishOrder } from '@/api/order'
import { getTotalPage } from '@/util/util'
export default {
  data() {
    return {
      list: [],
      payPopShow: false,
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
      current: 1,

      total: 0,
      more: 'noMore',
      size: 10,
      currentIndex: 0,
      noDate: false,
      show: false,
      selectOrder: null,
    }
  },

  components: { orderItem, payPop },
  props: {},
  computed: {
    defDecoration() {
      return `${this.$fileUrl}/sysFile/img_dingd_zhuangs.png`
    },
    defaultImg() {
      return this.$fileUrl + '/sysFile/img_dingdan.png'
    },
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
  onShow: function () {
    uni.$on('refresh', (data) => {
      if (data.refresh) {
        this.loadOrderData()
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
    async payOrder(item) {
      uni.navigateTo({
        url: '/pages/order/orderPay?orderId=' + item.id,
      })
      // let { code, data } = await finishOrder({
      //   orderId: item.id,
      //   credits: 10,
      // })
      // if (code == 0) {
      //   this.loadOrderData()
      // }
      // this.payPopShow = true
    },
    onCreateOrder(item) {
      uni.navigateTo({
        url: '/pages/order/submit-order/index?shopId=' + item.shopId,
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
    onStsTap(e) {
      this.current = 1
      this.currentIndex = e.index
      this.loadOrderData()
    },

    /**
     * 取消订单
     */
    onCancelOrder(item) {
      this.show = true
      this.selectOrder = item
    },
    async confirm() {
      try {
        await orderStatusChange({ orderId: this.selectOrder.id })
        this.show = false
        this.$tip.successToast('已取消预约！')
        this.loadOrderData()
      } catch (e) {
        console.log(e)
      }
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
