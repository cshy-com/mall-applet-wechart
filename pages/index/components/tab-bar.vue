<template>
  <view class="tab-bar">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="tab-bar-item"
      @click="switchTab(item, index)"
    >
      <image
        class="tab_img"
        :src="selected === index ? item.selectedIconPath : item.iconPath"
      ></image>
      <view
        class="tab_text"
        :style="{ color: selected === index ? selectedColor : color }"
        >{{ item.text }}</view
      >
    </view>
  </view>
</template>

<script>
export default {
  props: {
    selected: {
      // 当前选中的tab index
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      color: '#999999',
      selectedColor: '#3B6DBB ',
      listUser: [
        {
          pagePath: '/pages/index/home/userHome',
          iconPath: '/static/tabbar/home.png',
          selectedIconPath: '/static/tabbar/home_select.png',
          text: '首页',
        },
        {
          pagePath: '/pages/index/collection/index',
          iconPath: '/static/tabbar/star.png',
          selectedIconPath: '/static/tabbar/star_select.png',
          text: '我的收藏',
        },
        {
          pagePath: '/pages/index/user/index',
          iconPath: '/static/tabbar/user.png',
          selectedIconPath: '/static/tabbar/user_select.png',
          text: '个人中心',
        },
      ],
      listShop: [
        {
          pagePath: '/pages/index/home/businessHome',
          iconPath: '/static/tabbar/home.png',
          selectedIconPath: '/static/tabbar/home_select.png',
          text: '首页',
        },
        {
          pagePath: '/pages/index/user/index',
          iconPath: '/static/tabbar/user.png',
          selectedIconPath: '/static/tabbar/user_select.png',
          text: '个人中心',
        },
      ],
      list: [],
      user: {},
      // selected: 0,
    }
  },
  computed: {
    userInfo(){
      return this.$store.state.user.userInfo
    },
  },
  watch: {},
  created() {
    
    console.log('tab-this.user:' + this.userInfo)
    if (['', null, undefined].includes(this.userInfo)) {
      this.list = this.listUser
      
    }
    if (this.userInfo?.userType == 1) {
      this.list = this.listUser
    }
    if (this.userInfo?.userType == 2) {
      this.list = this.listShop
    }
    this.getCurrentPageUrl()
  },
  onShow() {},
  methods: {
    switchTab(item, index) {
      let url = item.pagePath
      if (index == 0) {
        switch (this.userInfo?.userType) {
          // 普通用户
          case 1:
            url = '/pages/index/home/userHome'
            break
          // 商家
          case 2:
            url = '/pages/index/home/businessHome'
            break
        }
      }
      uni.switchTab({
        url,
      })
      // this.getCurrentPageUrl()
    },
    getCurrentPageUrl() {
      console.log('执行了吗')

      const pages = getCurrentPages() // 获取当前页面栈
      const currentPage = pages[pages.length - 1] // 获取当前页面
      const currentPath = '/' + currentPage.route // 获取当前页面路径
      let index = this.list.findIndex((val) => val.pagePath === currentPath)
      // this.selected = index
      console.log('重新赋值了')
    },
  },
}
</script>

<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 98rpx;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100%;
  background-position: 0 0;
  background-repeat: no-repeat;
  padding-bottom: env(safe-area-inset-bottom); // 适配iphoneX的底部
  z-index: 9999;
  box-shadow: 0px -2px 20px 0px rgba(0, 0, 0, 0.1);
  .tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .tab_img {
      width: 50rpx;
      height: 50rpx;
    }
    .tab_text {
      font-size: 20rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 28rpx;
    }
  }
}
</style>
