<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-08-01 11:23:16
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-09-04 16:43:21
 * @FilePath: \mall-admind:\work\mall-applet\components\defNav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="nav">
    <hx-navbar :config="config" ref="navs" v-if="!isTransparent">
      <view slot="center">
        <view class="center" style="">
          <text class="color" v-if="title">{{ title }}</text>
        </view>
      </view>
    </hx-navbar>
    <template v-else>
      <view
        class="back-box"
        :style="{
          top: navInfo.menuTop + 'px',
          height: navInfo.menuHeight + 'px',
        }"
      >
        <image
          @click="goBack"
          :lazy-load="true"
          :lazy-load-margin="0"
          :src="defBack"
          class="back-img"
        ></image>
      </view>
      <view
        class="nav-title"
        :style="{
          top: navInfo.menuTop + 'px',
          height: navInfo.menuHeight + 'px',
          'line-height': navInfo.menuHeight + 'px',
        }"
        >{{ title }}</view
      >
    </template>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('comm')
export default {
  //import引入组件才能使用
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    configNav: {
      type: Object,
      default: () => {},
    },
    isTransparent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      config: {
        color: '#ffffff',
        title: '标题',
        back: true,
        centerSlot: true,
        backgroundColor: [1, '#3b6dbb'],
        statusBarFontColor: '#ffffff',
        statusBarBackground: '#3b6dbb',
      },
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['navInfo', 'userInfo']),
    defBack() {
      return this.$fileUrl + '/sysFile/ic_nav_arrow_wud_bai.png'
    },
  },
  options: {
    styleIsolation: 'shared',
  },
  // 监听data中的数据变化
  watch: {
    configNav: {
      handler(newVal, oldVal) {
        this.config = newVal
      },
      deep: true,
    },
  },
  // 方法集合
  methods: {
    goBack() {
      console.log('点击返回')
      var pages = getCurrentPages()
      console.log(pages.length+'pages.length')
      if (pages.length >= 2) {
        uni.navigateBack()
      } else {
        debugger
        uni.switchTab({
          url:
            this.userInfo?.userType == 2
              ? '/pages/index/home/businessHome'
              : '/pages/index/home/userHome',
        })
      }
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
.back-box {
  padding-left: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 999;
  top: 50rpx;
  .back-img {
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
  }
}
.nav-title {
  width: 100vw;
  position: absolute;
  text-align: center;
  font-size: 34rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;

  z-index: 99;
}
.nav /deep/ .hx-navbar__content__main_center {
  justify-content: center;
  width: 100vw;
  position: fixed;
}
.center {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */

  justify-content: center;
  align-items: center;

  font-size: 34rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
</style>
