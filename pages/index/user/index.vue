<template>
  <view>
    <view
      class="home-bg"
      :style="{
        'background-image': defHomeBg,
      }"
    >
    </view>
    <view v-if="showS" style="position: relative; z-index: 99">
      <image
        style="width: 100vw; height: 1624rpx"
        class=""
        :src="require('@/static/img/skeleton-user.png')"
        mode="aspectFill"
        lazy-load="false"
        binderror=""
        bindload=""
      >
      </image>
    </view>
    <view class="container-box">
      <view class="container">
        <view v-if="!userInfo" class="user-login">
          <view class="user-login-title"> 欢迎来到清云私享 </view>
          <view class="user-login-btn" @click="goPage('/pages/public/login')">
            <button>立即登录</button>
          </view>
        </view>
        <view class="userinfo" v-else>
          <view class="userinfo-avatar" @click="getUserInfo">
            <image
              :lazy-load="true"
              :lazy-load-margin="0"
              :src="userInfo.avatar || defaultAvatar"
            ></image>
          </view>

          <view class="userinfo-name-box" @click="getUserInfo">
            <view class="userinfo-name">
              {{ userInfo.nickName ? userInfo.nickName : '用户昵称' }}
            </view>
            <view class="userinfo-name-more">
              <text>查看并编辑个人资料</text>
              <image
                :lazy-load="true"
                :lazy-load-margin="0"
                :src="defaultRight"
                class="right-icon"
              ></image>
            </view>
          </view>
          <view class="user-log-out" @click="logOut">
            <image
              :lazy-load="true"
              :lazy-load-margin="0"
              :src="defaultLogOut"
            ></image>
            <text>退出</text>
          </view>
        </view>

        <view class="order-box" :style="{
        'background-image': defOrderBg,
      }" >
        
          <view class="order-content">
            <view class="user-integral">
              <view class="user-integral-item">
                <view class="user-integral-item-title">
                  <view class="user-integral-item-img">
                    <image
                      :src="defIntegralIcon"
                      :lazy-load="true"
                      :lazy-load-margin="0"
                    ></image>
                  </view>
                  <text>我的积分</text>
                  <view class="btn-integral"  @click="integralEvent">
                    积分明细
                  </view>
                </view>
                <view class="user-integral-item-value" @click="integralEvent">
                  <text class="grid-text" v-if="userInfo">{{
                    integralTotal || 0
                  }}</text>
                  <text class="grid-text" v-else>0</text>
                
                </view>
              </view>
              <!-- <view class="user-integral-right-img">
                <image
                  :src="defIntegralIconBig"
                  :lazy-load="true"
                  :lazy-load-margin="0"
                ></image>
              </view> -->
            </view>
            <view class="order-title" @click="goOrderList">
              <view class="order-title-left"> 我的订单 </view>
              <view class="order-title-right">
                <text>查看更多</text>
                <image
                  :lazy-load="true"
                  :lazy-load-margin="0"
                  :src="defaultRight"
                  class="right-icon"
                ></image>
              </view>
            </view>
            <view class="order-grid">
              <view
                class="order-grid-item"
                v-for="item in orderList"
                :key="item.id"
                @click="goOrderList(item)"
              >
                <view class="order-grid-item-icon">
                  <!-- {{ JSON.stringify(item) }} -->
                  <image
                    :src="item.icon"
                    :lazy-load="true"
                    :lazy-load-margin="0"
                  ></image>
                  <view class="order-grid-item-text">
                    {{ item.title }}
                  </view>
                </view>
                <view
                  class="order-grid-item-number"
                  v-if="item.id == 20 && orderNumber.reservation > 0"
                >
                  {{ orderNumber.reservation }}</view
                >
                <view
                  class="order-grid-item-number"
                  v-if="item.id == 10 && orderNumber.reservationSuccess > 0"
                >
                  {{ orderNumber.reservationSuccess }}
                </view>
                <view
                  class="order-grid-item-number"
                  v-if="item.id == 0 && orderNumber.finish > 0"
                >
                  {{ orderNumber.finish }}
                </view>
              </view>
            </view>
           
          </view>
        </view>
        <view class="cell-group" v-if="actionSheet.length>0">
          <view class="cell-row">
            <view class="cell-row-header"> 常用功能 </view>
<view class="cell-row-box">


            <view
              class="cell-row-item"
              @click="actionSheetEvent(item)"
              v-for="item in actionSheet"
              :key="item.id"
            >
              <view class="cell-row-icon">
                <image
                  :src="item.icon"
                  :lazy-load="true"
                  :lazy-load-margin="0"
                ></image>
              </view>
              <view> {{ item.title }} </view>
            
            </view></view>
          </view>
        </view>
        <!-- 快捷入口 勿删 -->
        <!-- <view class="u-m-t-20">
          <u-cell-group>
           
            <template v-if="userInfo.userType == 1">
              <u-cell
                title="订单列表"
                isLink
                url="/pages/order/order-list/order-list"
              ></u-cell>

              <u-cell
                title="领积分快捷入口"
                isLink
                url="/pages/coupon/receive?code=8b058c3584d44b849362bb493b88d49b"
              ></u-cell>

              <u-cell
                title="积分支付给商家"
                isLink
                url="/pages/coupon/paymentCode?code=6"
              ></u-cell>
            </template>
          </u-cell-group>
        </view> -->
      </view>
    </view>

    <tab-bar
      v-if="!!userInfo"
      :selected="userInfo.userType == 1 ? 2 : 1"
    ></tab-bar>
    <tab-bar v-else :selected="2"></tab-bar>
    <logOutPop
      @closeCheckPopup="closeCheckPopup"
      :show="checkPopShow"
    ></logOutPop>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('user')
import { getUserInfo } from '@/api/index'
import { mallOrderNumbers } from '@/api/order'
import { getUrlParams } from '@/util/util'
import tabBar from './../components/tab-bar.vue'
import { removeAuthorization } from '@/util/auth'
import logOutPop from './../components/logOutPop.vue'
import { shopCreditsTotal, getUserTotal } from '@/api/integral'
export default {
  data() {
    return {
      orderAmount: '',
      sts: '',
      collectionCount: 0,
      isAuthInfo: false,
      loginResult: '',
      picDomain: '', // config.picDomain

      checkPopShow: false,
      // integralTotal: 0,
      showS: true,
    }
  },

  components: { tabBar, logOutPop },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  created() {
    // setTimeout(() => {
    //   this.showS = false
    // }, 2000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (!!this.userInfo) {
      this.getUser()
    } else {
      this.showS = false
    }
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
  onPullDownRefresh() {
    if (!!this.userInfo) {
      this.getUser()
    }
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  computed: {
    ...mapGetters(['userInfo']),
    orderNumber() {
      return this.$store.state.user.orderNumber
    },
    integralTotal() {
      return this.$store.state.user.integralTotal
    },
    defaultAvatar() {
      return `${this.$fileUrl}/sysFile/avatar.png`
    },
    defHomeBg() {
      return `url(${this.$fileUrl}/sysFile/img_geren_bg.png)`
    },
    defaultLogOut() {
      return `${this.$fileUrl}/sysFile/ic_tuichu1.png`
    },
    defaultRight() {
      return `${this.$fileUrl}/sysFile/ic_bian_arrow.png`
    },
     
    defOrderBg(){
      return `url(${this.$fileUrl}/sysFile/img_geren_jifen_bg2.png)`
    },
    orderList() {
      return [
        {
          title: '预约中',
          id: '20',
          icon: `${this.$fileUrl}/sysFile/ic_yuyuezhong.png`,
          number: 0,
        },
        {
          title: '预约成功',
          id: '10',
          icon: `${this.$fileUrl}/sysFile/ic_yuyue_chenggong.png`,
          number: 0,
        },
        // {
        //   title: '已到店',
        //   id: '30',
        //   icon: `${this.$fileUrl}/sysFile/ic_yidaodian.png`,
        // },
        {
          title: '已完成',
          id: '0',
          icon: `${this.$fileUrl}/sysFile/ic_yiwancheng.png`,
          number: 0,
        },
        {
          title: '已取消',
          id: '-10',
          icon: `${this.$fileUrl}/sysFile/ic_yiwancheng_1.png`,
          number: 0,
        },
      ]
    },
    actionSheetUser() {
      return [
        {
          title: '扫一扫',
          dis: '扫码积分核销',
          icon: `${this.$fileUrl}/sysFile/ic_geren_saoyisao.png`,
          page: '',
          id: 1,
          event: 'scanCode',
        },
        // {
        //   title: '付款码',
        //   dis: '出示付款码',
        //   icon: `${this.$fileUrl}/sysFile/ic_geren_fukuan.png`,
        //   page: '/pages/coupon/shopCode',
        //   id: 2,
        //   event: 'goPage',
        // },
        {
          title: '转赠积分',
          dis: '转赠给好友',
          icon: `${this.$fileUrl}/sysFile/ic_geren_zhuanz.png`,
          page: '/pages/coupon/transferAccounts',
          id: 6,
          event: 'goPage',
        },
        {
          title: '发布论坛',
          dis: '创作一篇你的论坛',
          icon: `${this.$fileUrl}/sysFile/ic_geren_luntan.png`,
          page: '/pages/article/forumAdd',
          id:3,
          event: 'goPage',
        },
        {
          title: '我的论坛',
          dis: '查看发表记录',
          icon: `${this.$fileUrl}/sysFile/ic_geren_wodelunt.png`,
          page: '/pages/article/forumList',
          id: 4,
          event: 'goPage',
        },
        {
          title: '我的建议',
          dis: '我有更好的想法',
          icon: `${this.$fileUrl}/sysFile/ic_geren_jianyi.png`,
          page: '/pages/article/recommendationList',
          id: 5,
          event: 'goPage',
        },
       
  // {
  //         title: '扫码领取',
  //         dis: '转赠给好友',
  //         icon: `${this.$fileUrl}/sysFile/ic_geren_zhuanz.png`,
  //         page: '/pages/coupon/receive?code=00166c828c37f8c65f4d97cf29f00433',
  //         // page: '/pages/coupon/scanCodeResult?code=14',
  //         id: 7,
  //         event: 'goPage',
  //       },
        // {
        //   title: '积分支付',
        //   dis: '转赠给好友',
        //   icon: `${this.$fileUrl}/sysFile/ic_geren_zhuanz.png`,
        //   page: '/pages/order/orderPay?code=6',
        //   // page: '/pages/coupon/scanCodeResult?code=14',
        //   id: 7,
        //   event: 'goPage',
        // },
        // {
        //   title: '积分领取',
        //   dis: '转赠给好友',
        //   icon: `${this.$fileUrl}/sysFile/ic_geren_zhuanz.png`,
        //   // page: '/pages/coupon/paymentCode?code=6',
        //   page: '/pages/coupon/paymentCode?code=72b616057106461a51156c084623a236',
        //   id: 8,
        //   event: 'goPage',
        // },
//         id: ""
// userId: ""
        // {
        //   title: '转赠扫码结果',
        //   dis: '转赠扫码结果',
        //   icon: `${this.$fileUrl}/sysFile/ic_geren_fukuan.png`,
        //   page: '/pages/coupon/transferScanCode?credits=CREDITS&userId=14&id=3c405aa188a3a1f608561d0823055dbd',
        //   id: 9,
        //   event: 'goPage',
        // },
      ]
    },
    actionSheetShop() {
      return [
        // {
        //   title: '扫一扫',
        //   dis: '扫码收款',
        //   icon: `${this.$fileUrl}/sysFile/ic_geren_saoyisao.png`,
        //   page: '',
        //   id: 1,
        //   event: 'scanCode',
        // },
        // {
        //   title: '收款码',
        //   dis: '出示收款码',
        //   icon: `${this.$fileUrl}/sysFile/ic_geren_fukuan.png`,
        //   page: '/pages/coupon/shopCode',
        //   id: 2,
        //   event: 'goPage',
        // },
        // {
        //   title: '收款',
        //   dis: '出示收款码',
        //   icon: `${this.$fileUrl}/sysFile/ic_geren_zhuanz.png`,

        //   page: '/pages/coupon/receive',
        //   id: 3,
        //   event: 'goPage',
        // },
      ]
    },
    actionSheet() {
      if (!!this.userInfo) {
        return this.userInfo.userType == 1
          ? this.actionSheetUser
          : this.actionSheetShop
      } else {
        return this.actionSheetUser
      }
    },
    defIntegralIcon() {
      return `${this.$fileUrl}/sysFile/ic_da_jifen.png`
    },
    // defIntegralIconBig() {
    //   return `${this.$fileUrl}/sysFile/img_jifen_zhuang.png`
    // },
  },
  methods: {
    ...mapMutations(['setUserInfo','setOrderNumber','setIntegralTotal']),
    ...mapActions([
      'setUserInfoAction',
      'setIntegralTotalAction',
      'setOrderNumberAction',
    ]),
    goPage(url) {
      uni.navigateTo({
        url: url,
      })
    },
    actionSheetEvent(item) {
      if (item.event == 'goPage') {
        this.goPage(item.page)
      }
      if (item.event == 'scanCode') {
        this.scanCode()
      }
    },
    scanCode() {
      if (['', null, undefined].includes(this.userInfo)) {
        uni.navigateTo({ url: '/pages/public/login' })
        return
      }
      let that = this
      uni.scanCode({
        onlyFromCamera: true,
        scanType: 'qrCode',
        success: function (res) {
          console.log('res' + JSON.stringify(res))
          let result = getUrlParams(res.result)
          console.log('code----' + JSON.stringify(result.code))
          console.log(that.userInfo.userType, +'this.userInfo.userType')
          if (that.userInfo.userType == 1) {
            // 用户扫一扫
            // 扫码领取积分
            if (res.result.search('integral') > -1) {
              uni.navigateTo({
                url: `/pages/coupon/receive?code=${result.code}&id=${result.id}`,
              })
            }
            // 扫码付款
            // if (res.result.search('payment') > -1) {
            //   uni.navigateTo({
            //     url: '/pages/coupon/paymentCode?code=' + result.code,
            //   })
            // }
            if (res.result.search('transfer') > -1) {
              uni.navigateTo({
                url: `/pages/coupon/transferScanCode?userId=${result.userId}&id=${result.id}`
              })
            }
          } else {
            // 商家扫码收款
            uni.navigateTo({
              url: '/pages/coupon/scanCodeResult?code=' + result.code,
            })
          }
        },
      })
    },
    logOut() {
      this.checkPopShow = true
    },
    closeCheckPopup(e) {
      this.checkPopShow = false
      if (e == 0) {
      } else {
        this.setUserInfo(null)
        uni.setStorageSync('user', null)
        this.setOrderNumber(null)
        this.setIntegralTotal(null)
        removeAuthorization('Authorization')
        uni.removeStorageSync('recentSearch')
        uni.navigateTo({ url: '/pages/public/login' })
      }
    },
    async getUser() {
      this.setUserInfoAction()
      this.setIntegralTotalAction(this.userInfo.userType)
      this.setOrderNumberAction()

      this.showS = false
    },
    integralEvent() {
      uni.navigateTo({
        url: '/pages/coupon/integralList',
      })
    },
    goOrderList(item) {
      let status = item ? item.id : -1
      if (this.userInfo.userType == 2) {
        uni.navigateTo({
          url: `/pages/order/business-order-list/business-order-list?status=${status}`,
        })
      } else {
        uni.navigateTo({
          url: `/pages/order/order-list/order-list?status=${status}`,
        })
      }
    },

    getUserInfo() {
      uni.navigateTo({
        url: '/pages/mine/updateUserInfo',
      })
    },
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
