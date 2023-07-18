<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-07 15:59:36
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-17 14:25:42
 * @FilePath: \mall-admind:\work\mall-applet\pages\coupon\scanCode.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="input-view">
      <u-input
        prefixIconStyle="font-size: 22px;color:#abacad"
        prefixIcon="account"
        v-model="num"
        type="number"
        :maxlength="5"
        placeholder="请输入积分"
        border="bottom"
      />
    </view>
    <view class="btn-view" @click="btnEvent">
      <button class="btn">支付</button>
    </view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('user')
import { getUrlParams } from '@/util/util'

import { getAuthorization } from '@/util/auth'
import { creditsConsume } from '@/api/integral'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      num: null,
      code: '',
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapActions(['setUserInfoAction']),

    async btnEvent() {
      if (!this.num) {
        this.$tip.toast('请输入积分')
        return
      }

      try {
        uni.showLoading({
          title: '加载中',
        })
        let { code } = await creditsConsume({
          shopId: Number(this.code),
          credits: Number(this.num),
        })
        if (code == 0) {
          this.setUserInfoAction()
          uni.navigateTo({
            url: `/pages/coupon/scanCodeResult?code=0`,
          })
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
<style scoped lang="scss">
.input-view {
  width: 600rpx;
  padding: 30rpx 30rpx 0 30rpx;
  margin: 0 auto;
}
.btn-view {
  width: 300rpx;
  padding: 30rpx 30rpx 0 30rpx;
  margin: 0 auto;
  button {
    background: $Gradual-color;
    color: #fff;
    border-radius: 30rpx;
    height: 85rpx;
    line-height: 85rpx;
  }
}
</style>
