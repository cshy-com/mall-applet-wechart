<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-07-31 17:05:53
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-02 17:04:42
 * @FilePath: \mall-admind:\work\mall-applet\components\noMore.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="no-more">
    <view class="no-more-box">
      <image
        :src="defImg"
        :lazy-load="true"
        :lazy-load-margin="0"
        :mode="'aspectFill'"
      ></image>
      <text>没有更多了，我是有底线的～</text>
    </view>
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {}
  },
  // 计算属性
  computed: {
    
    defImg(){
      return this.$fileUrl + '/sysFile/img_meiyoule.png'
    }
  },
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
<style scoped lang="scss">
.no-more {
  display: flex;
  justify-content: center;
  margin: 28rpx 0 38rpx 0;
  .no-more-box {
    display: flex;
    align-items: center;
  }
  image {
    width: 60rpx;
    height: 60rpx;
  }
  text {
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #c0c0c0;
    line-height: 37rpx;
  }
}
</style>
