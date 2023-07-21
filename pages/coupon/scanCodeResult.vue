<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-07-04 13:40:21
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-21 10:41:28
 * @FilePath: \mall-admind:\work\mall-applet\pages\coupon\scanCodeResult.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <u-empty
      textSize="30"
      mode="favor"
      :text="reaultCode == 0 ? '支付成功' : '支付失败'"
    >
    </u-empty>
    <view class="btn">
      <button @click="goHome">返回首页</button>
    </view>
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      reaultCode: 0,
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    goHome() {
      uni.switchTab({
        url: '/pages/index/home/userHome',
      })
    },
  },
  onLoad(option) {
    this.reaultCode = option.code
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
.btn {
  width: 90%;
  margin: auto;
  margin-top: 40rpx;

  button {
    height: 85rpx;
    background: $Gradual-color;
    border-radius: 10rpx;
    font-size: 30rpx;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    line-height: 85rpx;
  }
}
</style>
