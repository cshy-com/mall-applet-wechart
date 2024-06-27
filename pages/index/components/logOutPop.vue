<template>
  <view class="box">
    <u-popup bgColor="transparent" :closeOnClickOverlay="false" :show="show" mode="center" @close="close">
      <view class="pop-box-content">
       
        <image class="pop-img" :src="defPopCenter" mode="aspectFill"></image>
        <view class="font-center">
          <text> 退出登录后，便不能在平台预约了，我们会想你的，记得常回来看看哦～</text>
          
        </view>
        <view class="pop-box">
          <button  @click="close(0)">取消</button>
          <button @click="close(1)">退出登录</button>
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
      return `${this.$fileUrl}/sysFile/img_tc_denglu.png`
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    close(e) {
      this.$emit('closeCheckPopup', e)
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
  width: 590rpx;
  overflow: hidden;
  
  .pop-img {
    width: 590rpx;
    height: 238rpx;
    position: relative;
  }
  .font-center {
    width: 490rpx;
    background: #fff;
    position: relative;
    padding: 34rpx 50rpx 47rpx 50rpx;
  }
 
 
  .pop-box {
    width: 490rpx;

    border-radius: 0 0 14rpx 14rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 40rpx;
    padding-left: 50rpx;
    padding-right: 50rpx;
 
    button {
      width: 230rpx;
      height: 78rpx;
      background: #3b6dbb;
      border-radius: 14rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 78rpx;
    }
    button:nth-child(1) {
      background: #eeeeee;
      color: #666666;
    }
    button:after{
      border:none
    }
  }
}
</style>
