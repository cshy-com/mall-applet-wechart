<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-16 09:16:21
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-16 16:55:03
 * @FilePath: \mall-applet\pages\subPack\merchant\commFootBtn.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <!-- 底部操作按钮 -->
    <view class="footer-btn">
      <view class="left-icon">
        <button  class="btn"
          open-type="contact"
          @contact="handleContact"
          show-message-card
          :send-message-title="shopInfo.name"
          :send-message-path="
            '/pages/subPack/merchant/storeDetails?id=' + shopInfo.id
          "
          :sendMessageImg="shopInfo.mainImage"
        >
          <u-icon
            :name="'server-man'"
            size="40"
            label="客服"
            labelPos="bottom"
            labelSize="24"
            @tap='handleContact'
          ></u-icon>
        </button>
      </view>
      <view class="foot-btn-def" v-if="user.userType==1">
        <u-button
          class="foot-btn-value"
          text="预定"
          size="small"
          @click="showModal"
          @confirm="confirm"
          @cancel="cancel"
        ></u-button>
      </view>
      <view class="foot-btn-def foot-btn-right">
        <u-button
          class="foot-btn-value"
          text="客户反馈"
          size="small"
          @tap="feedback"
        ></u-button>
      </view>
    </view>

    <u-action-sheet
      :actions="list"
      :closeOnClickOverlay="true"
      :closeOnClickAction="true"
      :title="title"
      :show="show"
      @select="selectClick"
      :cancelText="'取消'"
      :safeAreaInsetBottom="true"
      @close="close"
    ></u-action-sheet>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
export default {
  props: {
    tel: {
      type: String, //父页面传过来关于商家的联系方式
      default: '',
    },
    shopId:{
      type:String,
      default:''
    }
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
      user: uni.getStorageSync('user')
    }
  },
  computed: {
    ...mapGetters(['shopInfo']),
  },
  methods: {
    handleContact(e) {

      // console.log('path----------------' + JSON.stringify( e.detail.path))
      // console.log('query----------------' + JSON.stringify(e.detail.query))
      // return
      // this.$u.toast('正在开发中，敬请期待')
    },
    feedback() {
      this.$u.toast('正在开发中，敬请期待')
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
        url:'/pages/order/submit-order/index?shopId='+this.shopId
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
.footer-btn {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: space-around;
  background: #fff;
  padding: 10rpx;
  height: 90rpx;
  border-top: 1px solid #f1f1f1;
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
    width: 100rpx;
    .btn{
      background: none;
    }
    .btn::after{ border: none;}
  }
}
</style>
