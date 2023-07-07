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
    // selected: {
    //   // 当前选中的tab index
    //   type: Number,
    //   default: 0,
    // },
  },

  data() {
    return {
      color: '#333333',
      selectedColor: '#333333',
      listUser: [
        {
          pagePath: '/pages/index/home/userHome',
          iconPath: '/static/img/tab_home_selected.png',
          selectedIconPath: '/static/img/tab_home_selectedHl.png',
          text: '首页',
        },
        {
          pagePath: '/pages/index/collection/index',
          iconPath: '/static/img/tab_lobby_selected.png',
          selectedIconPath: '/static/img/tab_lobby_selectedHl.png',
          text: '我的收藏',
        },
        {
          pagePath: '/pages/index/user/index',
          iconPath: '/static/img/tab_user_selected.png',
          selectedIconPath: '/static/img/tab_user_selectedHl.png',
          text: '个人中心',
        },
      ],
      listShop: [
        {
          pagePath: '/pages/index/home/businessHome',
          iconPath: '/static/img/tab_home_selected.png',
          selectedIconPath: '/static/img/tab_home_selectedHl.png',
          text: '首页',
        },
        {
          pagePath: '/pages/index/user/index',
          iconPath: '/static/img/tab_user_selected.png',
          selectedIconPath: '/static/img/tab_user_selectedHl.png',
          text: '个人中心',
        },
      ],
      list: [],
      user: {},
      selected: 0,
    
    }
  },
  computed: {
    
  },
  watch: {
   
  },
  created() {
    this.user = uni.getStorageSync('user')
    console.log('tab-this.user:' + this.user)
    if (!this.user) {
      uni.redirectTo({
        url: '/pages/public/login',
      })
      return
    }
    if (this.user.userType == 1) {
      this.list = this.listUser
    }
    if (this.user.userType == 2) {
      this.list = this.listShop
    }
    this.getCurrentPageUrl()
  },
  onShow() {},
  methods: {
  
    switchTab(item, index) {
       

   
     
      let url = item.pagePath
      if (index == 0) {
        switch (this.user.userType) {
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
      this.selected = index
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
  height: 100rpx;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom); // 适配iphoneX的底部
  z-index: 9999;
  .tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .tab_img {
      width: 37rpx;
      height: 41rpx;
    }
    .tab_text {
      font-size: 20rpx;
      margin-top: 9rpx;
    }
  }
}
</style>
