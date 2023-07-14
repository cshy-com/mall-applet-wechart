<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-20 15:04:02
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-13 14:01:10
 * @FilePath: \mall-admind:\work\mall-applet\pages\coupon\paymentCode.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="code">
      <image :lazy-load="true" :lazy-load-margin="0" :src="defCode"></image>
    </view>
  </view>
</template>

<script>
import { mallShowPaymentCode } from '@/api/integral'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      defCode: require('@/static/img/qrcode.png'),
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getCode() {
      try {
        let res = await mallShowPaymentCode({})
        this.defCode = res.data
      } catch (e) {
        console.log(e)
      }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {
    this.getCode()
  },
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
.code {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200rpx;
  image {
    width: 300rpx;
    height: 300rpx;
  }
}
</style>
