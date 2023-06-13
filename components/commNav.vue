<template>
  <view class="nav">
    <hx-navbar :config="config" ref="hxnb">
      <block slot="left">
        <view class="nav-left-btn" style="" @click="navBack">
          <image
            :lazy-load="true"
            :lazy-load-margin="0"
            :src="fileUrl + '/sysFile/back.png'"
            class="hotsaleimg"
          ></image>
        </view>
      </block>
      <view slot="center">
        <view class="center" style="">
          <text class="color" style="font-size: 18px">{{ title }}</text>
        </view>
      </view>
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

        backgroundColor: [0, ['#3a6cba']],
        // 滑动屏幕后切换颜色，注意颜色为数组时长度必须一样，还有使用滑动切换必须监听 onPageScroll 事件
        slideBackgroundColor: [1, ['#3b6dbb']],
      },
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
    fileUrl() {
      return this.$fileUrl
    },
  },
  created() {},
  onPageScroll(e) {
    // // 重点，用到滑动切换必须加上
    // debugger
    // this.$refs.hxnb.pageScroll(e)
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
.nav /deep/ .hx-navbar__content__main_center {
  justify-content: center;
  width: 100vw;
  position: fixed;
}
.nav-left-btn {
  padding-left: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  image {
    width: 56rpx;
    height: 56rpx;
    border-radius: 50%;
  }
}
.center {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */

  justify-content: center;
  align-items: center;

  font-size: 36rpx;
  font-family: SourceHanSerifCN-SemiBold, SourceHanSerifCN;
  font-weight: 600;
  color: #ffffff;
}
</style>
