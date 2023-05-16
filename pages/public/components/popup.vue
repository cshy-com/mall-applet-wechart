<template>
  <!--弹窗组件-->
  <view
    v-if="visible"
    class="popup-box"
    :class="shadow ? 'sha-dow' : 'close'"
    @click="close"
  >
    <view
      :animation="animationData"
      @click.stop="dothis"
      v-if="windowPosition == 'center'"
      class="window center"
      :style="{
        'border-radius': (dialogData.radius ? dialogData.radius : 15) + 'rpx',
        height: dialogData.height ? dialogData.height + 'rpx' : 'auto',
        width: (dialogData.width ? dialogData.width : 86) + '%',
        left: (100 - (dialogData.width ? dialogData.width : 86)) / 2 + '%',
      }"
    >
      <slot></slot>
    </view>
    <view
      v-if="windowPosition == 'bottom'"
      @click.stop="dothis"
      class="window bottom"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'xPopup',
  props: {
    visible: {
      //是否开启弹窗
      type: Boolean,
      default: false,
    },
    shadow: {
      //是否开启遮罩
      type: Boolean,
      default: true,
    },
    dialogData: {
      type: Object,
      default: function () {
        return {
          top: 80,
          radius: 15,
          height: 0,
          width: 86,
          duration: 500,
          animateType: 'ease-out',
        }
      },
    },
    allowClickShadowClose: {
      //允许点击遮罩层关闭
      type: Boolean,
      default: true,
    },
    windowPosition: {
      //窗体出现的位置 默认为下方（注意下方时关闭遮罩） bottom|center
      type: String,
      default: 'center',
    },
  },

  data() {
    return {
      animationData: {},
      height: -200,
      closing: false,
    }
  },
  watch: {
    visible(n, o) {
      if (n) {
        this.starAnimate()
      }
    },
  },
  mounted() {
    this.animation = uni.createAnimation({
      duration: this.dialogData.duration,
      timingFunction: this.dialogData.animateType,
    })
    // this.height = this.dialogData.height ? this.dialogData.height : -200;
    this.animation.top(this.dialogData.top).step()
    this.animationData = this.animation.export()
  },
  methods: {
    close() {
      if (this.allowClickShadowClose) {
        if (this.visible && !this.closing) {
          this.closeAnimate()
          this.closing = true
          setTimeout(() => {
            this.closing = false
            this.$emit('closeCallBack')
          }, this.dialogData.duration)
        }
      }
    },
    dothis() {},
    starAnimate() {
      this.animation.top(this.dialogData.top).step()
      this.animationData = this.animation.export()
    },
    closeAnimate() {
      this.animation.top(this.height).step()
      this.animationData = this.animation.export()
    },
  },
}
</script>

<style scoped>
.popup-box {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  transition: all 0.5s;
}

.sha-dow {
  background-color: rgba(0, 0, 0, 0.5);
}

.window {
  position: absolute;
  background-color: white;
  transition: all 0.7s;
  min-height: 200rpx;
  overflow: hidden;
  max-height: 90vh;
}

.bottom {
  width: 100%;
  left: 0%;
  animation: shadowAnimate_bottom 0.5s both;
}

.center {
  box-shadow: 0 0 10px 0px #676666;
  margin: auto;
}

@keyframes shadowAnimate_bottom {
  0% {
    bottom: -100%;
  }

  100% {
    bottom: 0%;
  }
}
</style>
