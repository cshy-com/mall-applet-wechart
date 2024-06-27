<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-08-28 10:45:14
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-31 15:55:58
 * @FilePath: \mall-admind:\work\mall-applet\pages\coupon\components\transPopup.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
      return `${this.$fileUrl}/sysFile/img_tc_jifen_pass-1.png`
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
    margin-top: -2rpx;
  }
}
</style>
