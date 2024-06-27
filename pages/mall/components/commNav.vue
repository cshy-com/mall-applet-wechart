<template>
  <view class="nav">
    <hx-navbar :config="config" ref="hxnb">
      <block slot="left">
        <view class="nav-left-btn" style="" @click="navBack">
          <image
            :lazy-load="true"
            :lazy-load-margin="0"
            :src="defBack"
            class="hotsaleimg"
          ></image>
        </view>
      </block>
      <template slot="center">
        <view class="center"   >
          <text class="color" style="font-size: 18px">{{ title }}</text>
        </view>
      </template>
    </hx-navbar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      config: {
        color: ['#ffffff', '#000'],
        title: '导航',
        centerSlot: true,
        leftSlot: true,
        back: false,
        fixed: true,
        // height: '176px',
        backgroundColor: [0, ['#3a6cba']],
        // 滑动屏幕后切换颜色，注意颜色为数组时长度必须一样，还有使用滑动切换必须监听 onPageScroll 事件
        slideBackgroundColor: [1, ['#3b6dbb']],
      },
      menuButtonInfo: {
        bottom: 80,
        height: 32,
        left: 281,
        right: 368,
        top: 48,
        width: 87,
      },
      left:0
    }
  },
  options: {
    styleIsolation: 'shared',
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    defBack() {
      return this.$fileUrl + '/sysFile/ic_nav_arrow.png'
    },
  },
  created() {
    this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
   
  },
  onPageScroll(e) {
 
  },
  methods: {
    scroll(e) {
      this.$refs.hxnb.pageScroll(e)
    },
    navBack() {
      uni.navigateBack()
    },
  },
}
</script>
<style lang="scss" scoped>
.nav {
  position: relative;
  z-index: 99;
}
.nav /deep/ .hx-navbar__content__main_center {
  justify-content: center;
  width: 100vw;
  position: fixed;
}
.nav /deep/ .hx-navbar__content__main_center_txt{
  height: 64rpx;
}
.nav-left-btn {
  padding-left: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  image {
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
  }
}
.center {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */

  justify-content: center;
  align-items: center;

  color: #ffffff;
  height: 64rpx;
  font-size: 34rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 64rpx;
}
</style>
