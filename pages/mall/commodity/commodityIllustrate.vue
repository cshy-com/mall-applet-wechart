<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-08-07 17:04:46
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-07 17:10:36
 * @FilePath: \mall-admind:\work\mall-applet\pages\mall\commodity\commodityIllustrate.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <defNav title="购买须知"></defNav>
    <view class="notes-content">
      <rich-text
        :nodes="commodityInfo.purchaseNotes"
        class="content"
      ></rich-text>
    </view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {}
  },
  // 计算属性
  computed: { ...mapGetters(['commodityInfo']) },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
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
<style>
page {
  background: #fff;
}
</style>
<style scoped lang="scss">
.notes-content {
  padding: 30rpx;
}
</style>
