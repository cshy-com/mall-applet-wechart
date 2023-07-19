<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-07 11:29:50
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-19 11:13:13
 * @FilePath: \mall-admind:\work\mall-applet\pages\coupon\transferAccounts.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="input-view">
      <u-input
        prefixIconStyle="font-size: 22px;color:#abacad"
        prefixIcon="account"
        v-model="tel"
        type="number"
        :maxlength="11"
        placeholder="请输入手机号"
        border="bottom"
      />
    </view>
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
      <button class="btn">转赠</button>
    </view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('user')
import { creditsTransfer } from '@/api/integral'

export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      tel: '',
      num: null,
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
      if (!this.tel) {
        this.$tip.toast('手机号不能为空')
        return
      }
      if (!uni.$u.test.mobile(this.tel)) {
        this.$tip.toast('请输入正确的手机号')
        return
      }
      if (!this.num) {
        this.$tip.toast('转出的积分不能为空')
      }

      try {
        uni.showLoading({
          title: '加载中',
        })
        let res = await creditsTransfer({
          phoneNumber: this.tel,
          credits: Number(this.num),
        })
        if (res && res.code == 0) {
          this.setUserInfoAction()
          uni.navigateTo({
            url: `/pages/coupon/scanCodeResult?code=0`,
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
       
      }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
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
    border-radius: 10rpx;
    height: 85rpx;
    line-height: 85rpx;
    height: 85rpx;
    font-weight: 400;
    font-size: 30rpx;
    height: 85rpx;
  }
}
</style>
