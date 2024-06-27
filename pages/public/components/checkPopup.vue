<template>
  <view class="box">
    <u-popup bgColor="transparent" :show="show" mode="center" @close="close">
      <view class="pop-box-content">
        <view class="pop-title"> 隐私保护协议 </view>
        <image class="pop-img" :src="defPopCenter" mode="aspectFill"></image>
        <view class="font-center">
          <view  class="font-center-box">          <text> 为了更好地保障您的合法权益，请阅读并同意一下协议</text>
          <text style="color: #3B6DBB ;">《清云私享隐私协议》</text>
          <text> ，同意后将自动登录 </text>
        </view>

        </view>
        <view class="pop-box-btn">
          <button  @click="close(0)">不同意</button>
          <button @click="close(1)">同意</button>
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
      return `${this.$fileUrl}/sysFile/img_tc_arrow_zs.png`
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
  .pop-title {
    width: 590rpx;
    height: 160rpx;
    background: linear-gradient(288deg, #3b6dbb 0%, #8fb3eb 100%);
    border-radius: 34rpx 34rpx 0 0;
    text-align: center;
    line-height: 133rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    position: relative;
    top: 21rpx;
  }
  .pop-img {
    width: 591rpx;
    height: 28rpx;
    position: relative;
  }
  .font-center {
    width: 100%;
    background: #fff;
    // position: relative;
  
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    .font-center-box{
      margin: 34rpx 0rpx 20rpx 0rpx;
    width: 490rpx;
    }

  }
 
 
  .pop-box-btn {
    width: 491rpx;

    border-radius: 0 0 14rpx 14rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 40rpx;
    padding-left: 50rpx;
    padding-right: 50rpx;
    padding-top: 27rpx;
    position: relative;
    top: -2rpx;
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
