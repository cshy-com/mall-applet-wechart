<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-07 15:59:36
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-17 17:09:01
 * @FilePath: \mall-admind:\work\mall-applet\pages\coupon\scanCode.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view
      class="back-box"
      :style="{
        top: navInfo.menuTop + 'px',
        height: navInfo.menuHeight + 'px',
      }"
    >
      <image
        @click="goBack"
        :lazy-load="true"
        :lazy-load-margin="0"
        :src="defBack"
        class="back-img"
      ></image>
    </view>
    <view
      class="nav-title"
      :style="{
        top: navInfo.menuTop + 'px',
        height: navInfo.menuHeight + 'px',
        'line-height': navInfo.menuHeight + 'px',
      }"
      >收款</view
    >
    <view class="box-bg">
      <image
        :lazy-load="true"
        :lazy-load-margin="0"
        :src="defaultBg"
        class="box-bg-img"
      ></image>
    </view>

    <view class="input-view">
      <view class="total-box">
        <view class="total-img">
          <image
            :lazy-load="true"
            :lazy-load-margin="0"
            :src="defTotalLeft"
          ></image>
        </view>
        <!-- <view class="total-number">
          <text class="number"> {{ totalScore || 0 }} </text>
          <text class="total-tip"> 剩余可支付积分 </text>
        </view> -->
      </view>
      <view class="acc-img">
        <image
          :lazy-load="true"
          :lazy-load-margin="0"
          :src="defTotalCenter"
        ></image>
      </view>

      <view class="trans-input">
        <u-number-box
          :max="totalScore"
          v-model="num"
          @change="numChange"
          :step="1"
          :min="0"
        >
          <view slot="minus" class="minus">
            <image
               
              class=""
              :src="defIconReduce"
              mode="aspectFill"
              lazy-load="false"
              binderror=""
              bindload=""
            >
            </image>
          </view>
          <view slot="input">
            <input
              class="input"
              v-model="num"
              type="number"
              :min="1"
              :max="totalScore"
              placeholder="请输入积分"
              placeholder-class="placeholder-class"
            />
          </view>

          <view slot="plus" class="plus">
            <image
             
              class=""
              :src="defIconAdd"
              mode="aspectFill"
              lazy-load="false"
              binderror=""
              bindload=""
            >
            </image>
          </view>
        </u-number-box>
      </view>
      <view class="btn-view" @click="btnEvent">
        <button class="btn">确认收款</button>
      </view>
    </view>
    <u-popup bgColor="transparent" :show="show" mode="center" @close="close">
      <view class="pop-box-content">
        <image
          @click="close()"
          class="close-img"
          :src="defPopClose"
          mode="aspectFill"
        ></image>
        <image
          class="close-icon-img"
          :src="defPopCenter"
          mode="aspectFill"
        ></image>
        <view class="pop-box">
          <view class="pop-tip">收款成功</view>
          <button @click="goHome">返回首页</button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapActions } = createNamespacedHelpers('user')
const { mapGetters } = createNamespacedHelpers('comm')
import { getUrlParams } from '@/util/util'

import { getAuthorization } from '@/util/auth'
import { mallShopPayed } from '@/api/integral'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      num: null,
      code: '',

      show: false,
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['navInfo']),
    totalScore() {
      return this.$store.state.user.integralTotal
    },
    defBack() {
      return this.$fileUrl + '/sysFile/ic_nav_arrow_wud_bai.png'
    },
    defaultBg() {
      return `${this.$fileUrl}/sysFile/img_zhuanz_jifen.jpg`
    },
    defIconAdd() {
      return `${this.$fileUrl}/sysFile/ic_yud_jia.png`
    },
    defIconReduce() {
      return `${this.$fileUrl}/sysFile/ic_yud_jian_no.png`
    },
    defTotalLeft() {
      return `${this.$fileUrl}/sysFile/ic_da_jifen.png`
    },
    defTotalCenter() {
      return `${this.$fileUrl}/sysFile/img_jifen_zhuang.png`
    },
    defPopClose() {
      return `${this.$fileUrl}/sysFile/ic_tc_quxiao.png`
    },
    defPopCenter() {
      return `${this.$fileUrl}/sysFile/img_tc_jifen_pass.png`
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapActions(['setUserInfoAction']),
    goHome() {
      uni.switchTab({
        url: '/pages/index/home/businessHome',
      })
    },
    close() {
      this.show = false
    },
    goBack() {
      this.goHome()
    },
    async btnEvent() {
      if (!this.num) {
        this.$tip.toast('请输入积分')
        return
      }
     
      try {
        uni.showLoading({
          title: '加载中',
        })
        let { code } = await mallShopPayed({
          userId: this.code,
          credits: Number(this.num),
        })
        if (code == 0) {
          this.setUserInfoAction()
          this.show = true
          this.user.totalScore = this.user.totalScore - Number(this.num)
        }
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  onLoad: function (options) {
    let token = getAuthorization()
    if (!token) {
      this.$tip.toast('暂未登录')
      uni.redirectTo({
        url: '/pages/public/login',
      })
    }

    if (options?.code) {
      this.code = options.code
      console.log('this.orderCode' + this.code)
      // console.log("扫码参数"+JSON.stringify(options) )
      // console.log('orderCode'+JSON.stringify(this.orderCode))
    }

    const { q } = options

    if (q) {
      let urlStr = decodeURIComponent(q)

      let urlParams = getUrlParams(urlStr)
      this.code = urlParams.code
    }
  },
  onShow() {
    this.user = uni.getStorageSync('user')
  },
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期：创建之前
  beforeMount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>

<style>
page {
  background: #fff;
}
.placeholder-class {
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;

  text-align: center;
}
</style>
<style scoped lang="scss">
.box-bg {
  position: relative;
  .box-bg-img {
    width: 750rpx;
    height: 526rpx;
    position: absolute;
    left: 0;
    top: 0;
  }
}
.pop-box-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  .close-img {
    width: 58rpx;
    height: 58rpx;
  }
  .close-icon-img {
    width: 589rpx;
    height: 270rpx;
  }
  .pop-box {
    width: 589rpx;
    height: 270rpx;
    border-radius: 0 0 14rpx 14rpx;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .pop-tip {
      margin-top: 41rpx;
      margin-bottom: 45rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 42rpx;
    }
    button {
      width: 270rpx;
      height: 78rpx;
      background: #3b6dbb;
      border-radius: 14rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 78rpx;
    }
  }
}
.input-view {
  position: relative;
  top: 187rpx;
  .input {
    font-size: 50rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    text-align: center;
  }
  .total-box {
    margin-left: 30rpx;
    display: flex;
    justify-content: flex-start;
    .total-img {
      image {
        width: 68rpx;
        height: 68rpx;
      }
    }
    .total-number {
      margin-left: 20rpx;
      display: flex;
      flex-direction: column;
      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 42rpx;

      .number {
        font-size: 60rpx;

        font-weight: 500;

        line-height: 84rpx;
        margin-bottom: 10rpx;
      }
    }
  }
  .acc-img {
    width: 226rpx;
    height: 173rpx;
    margin: 0 auto;
    margin-top: 20rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }

  .trans-input {
    height: 120rpx;
    margin: 0 20rpx;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      width: 450rpx;
      margin: 0 30rpx;
    }
    .minus,
    .plus {
      width: 60rpx;
      height: 60rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.btn-view {
  margin: 0 auto;
  margin-top: 184rpx;
  button {
    width: 690rpx;
    height: 88rpx;
    background: #3b6dbb;
    border-radius: 14rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 88rpx;
  }
}
.back-box {
  padding-left: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 999;
  top: 50rpx;
  .back-img {
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
  }
}
.nav-title {
  width: 100vw;
  position: absolute;
  text-align: center;
  font-size: 34rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;

  z-index: 99;
}
</style>
