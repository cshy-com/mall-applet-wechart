<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-16 09:16:21
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-24 09:32:55
 * @FilePath: \mall-applet\pages\subPack\merchant\commFootBtn.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <!-- 底部操作按钮 -->
    <view class="footer-btn">
      <view class="left-icon">
        <button
          class="btn"
          open-type="contact"
          @contact="handleContact"
          show-message-card
          :send-message-title="shopInfo.name"
          :send-message-path="
            '/pages/mall/store/storeDetails?id=' + shopInfo.id
          "
          :sendMessageImg="shopInfo.mainImage"
        >
          <image
            :lazy-load="true"
            :lazy-load-margin="0"
            :src="defService"
          ></image>
          <text>客服</text>
        </button>
      </view>
      <view class="foot-btn-left" :class="{'round':user.userType == 2}">
        <button @tap="feedback"
          class="btn-text"
         
        >
        客户反馈 
        </button>
      </view>
      <view class="foot-btn-right" v-if="user.userType == 1" >
        <button class="btn-text"   @click="showModal"
          @confirm="confirm"
          @cancel="cancel">预定</button>
      </view>
    </view>
    <view class="view-action" v-if="show">
      <u-action-sheet
        :actions="list"
        :closeOnClickOverlay="true"
        :closeOnClickAction="true"
        :title="title"
        :show="show"
        @select="selectClick"
        :cancelText="'取消'"
        round="27rpx"
        :safeAreaInsetBottom="true"
        @close="close"
      ></u-action-sheet>
    </view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
export default {
  options: { styleIsolation: 'shared' },
  props: {
    tel: {
      type: String, //父页面传过来关于商家的联系方式
      default: '',
    },
    shopId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
      title: '选择预定方式',
      list: [
        {
          name: '平台预定',
          index: 0,
        },
        {
          name: '人工预定',
          index: 1,
        },
      ],
      user: uni.getStorageSync('user'),
    }
  },
  computed: {
    ...mapGetters(['shopInfo']),
    defService() {
      return this.$fileUrl + '/sysFile/ic_nav_kefu.png'
    },
  },
  methods: {
    handleContact(e) {
      // console.log('path----------------' + JSON.stringify( e.detail.path))
      // console.log('query----------------' + JSON.stringify(e.detail.query))
      // return
      // this.$u.toast('正在开发中，敬请期待')
    },
    feedback() {
      this.$u.toast('即将开放，敬请期待')
    },
    close() {
      this.show = false
    },
    showModal() {
      this.show = true
    },
    selectClick(item) {
      if (item.index == 0) {
        uni.navigateTo({
          url: '/pages/order/submit-order/index?shopId=' + this.shopId,
        })
        return
      }
      if (item.index == 1) {
        uni.makePhoneCall({
          phoneNumber: this.tel.toString(), //电话号码
          success: function (e) {
            console.log(e)
          },
          fail: function (e) {
            console.log(e)
          },
        })
      }
      console.log(index)
    },
  },
}
</script>

<style lang="scss" scoped>
.view-action {
  /deep/ .u-action-sheet__header {
    background: #fff;
    margin: 0 12rpx;
    border-radius: 27rpx 27rpx 0 0;
    border-bottom: 1rpx solid #eeeeee;
    text {
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 40rpx;
    }
    .u-action-sheet__header__icon-wrap{
      display: none;
    }
  }
  
  /deep/ .u-popup__content {
    background: none;
    background-color: none !important;
  }
  /deep/ .u-action-sheet__item-wrap {
    background: #fff;
    margin: 0 12rpx;
    border-radius: 0 0 27rpx 27rpx;
  }
  /deep/ .u-action-sheet__item-wrap__item__name,
  /deep/ .u-action-sheet__cancel-text {
    color: #007aff;
  }

  /deep/ .u-gap {
    display: none;
  }
  /deep/ .u-action-sheet__cancel-text {
    margin: 0 13rpx;
    background: #fff;
    border-radius: 27rpx;
    margin-top: 12rpx;
  }
}
.footer-btn {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: flex-start;
  background: #fff;
  padding-bottom: env(safe-area-inset-bottom);
  height: 99rpx;

  box-shadow: 0px -2px 20px 0px rgba(0, 0, 0, 0.1);

  .foot-btn-def {
    width: 25%;

    /deep/ button {
      background: #ff6a13;
      border-radius: 30rpx;
      color: #fff;
      height: 70rpx !important;
    }
  }
  .left-icon {
    width: 197rpx;
    .btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0;
      padding: 0;
      background: none;
      image {
        width: 52rpx;
        height: 52rpx;
      }
      text {
        font-size: 20rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 28rpx;
      }
    }
    .btn::after {
      border: none;
    }
  }
  .foot-btn-left {
    button {
      width: 200rpx;
      height: 70rpx;
      background: #75bb44;
      border-radius: 40rpx 0px 0px 40rpx;
      margin-top: 14rpx;
      line-height: 70rpx;
    }
  }
  .foot-btn-right {
    button {
      width: 323rpx;
      height: 70rpx;
      background: #3b6dbb;
      border-radius: 0px 40rpx 40rpx 0px;
      margin-top: 14rpx;
      line-height: 70rpx;
    }
  }
  .round{
    margin-left: auto;
    margin-right: 30rpx;
    button{
      width: 500rpx;
      border-radius: 40rpx;
    }
  }
  .btn-text {
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 42rpx;
  }
}
</style>
