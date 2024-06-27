<template>
  <view class="page">
    <u-popup bgColor="transparent" :show="show" mode="center" @close="close">
      <view class="pop-box-content">
        <image
          class="close-icon-img"
          :src="defPopCenter"
          mode="aspectFill"
        ></image>
        <view class="pop-box">
          <slot name="footer"></slot>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  // 计算属性
  computed: {
    defPopCenter() {
      return `${this.$fileUrl}/sysFile/img_tanchuang_chengg.png`
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    close() {
      this.$emit('close')
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
.pop-box-content {
  position: relative;
  width: 632rpx;
  height: 480rpx;

  .close-icon-img {
    width: 100%;
    height: 100%;
  }
  .pop-box {
    position: absolute;
    bottom: 43rpx;
    left: 50rpx;
  }
}
</style>
