<script>
import routingIntercept from '@/util/permission.js'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('comm')
export default {
  data() {
    return {
      system: [],
      menu: [],
      statusBarHeight: 0, //状态栏的高度
      navigatorHeight: 0, //导航栏高度
      menuHeight: 0, //胶囊高度
      menuTop: 0, //胶囊与顶部的距离
      totalHeight: 0, //总高度
    }
  },
  onLoad() {},
  created() {
    //获取系统信息
    uni.getSystemInfo({
      success: (res) => {
        this.system = res
      },
    })

    //获取胶囊信息
    this.menu = uni.getMenuButtonBoundingClientRect()

    //计算组件高度
    this.statusBarHeight = this.system.statusBarHeight //状态栏高度
    this.menuHeight = this.menu.height //胶囊高度
    this.menuTop = this.menu.top //胶囊与顶部的距离
    //导航栏高度= （胶囊顶部距离-状态栏高度） x 2 + 胶囊的高度
    this.navigatorHeight =
      (this.menu.top - this.system.statusBarHeight) * 2 + this.menu.height

    //总高度 = 状态栏的高度 + 导航栏高度
    this.totalHeight = this.statusBarHeight + this.navigatorHeight
    this.setNavInfo({
      menuTop: this.menuTop,
      menuHeight: this.menuHeight,
      totalHeight: this.totalHeight,
      navigatorHeight: this.navigatorHeight,
    })
  },
  methods: {
    ...mapMutations(['setNavInfo']),
  },
  onLaunch: function () {
    //   uni.loadFontFace({
    //   global: true, // 是否全局生效
    //   family: 'font-name', // 定义的字体名称
    //   source: 'url("https://xxx.com/font/font-name.ttf")', // 字体资源的地址。建议格式为 TTF 和 WOFF，WOFF2 在低版本的iOS上会不兼容。
    //   success() {
    //     console.log('成功的回调函数')
    //   },
    //   fail(){
    //     console.log('失败的回调函数')
    //   },
    //   complete(){
    //     console.log('接口调用结束的回调函数（调用成功、失败都会执行）')fq
    //   }
    // })

    const updateManager = uni.getUpdateManager() // 小程序版本更新管理器
    updateManager.onCheckForUpdate((res) => {
      // 检测新版本后的回调
      if (res.hasUpdate) {
        // 如果有新版本提醒并进行强制升级
        uni.showModal({
          content: '新版本已经准备好，是否重启应用？',
          showCancel: false,
          confirmText: '确定',
          success: (res) => {
            if (res.confirm) {
              updateManager.onUpdateReady((res) => {
                // 新版本下载完成的回调
                updateManager.applyUpdate() // 强制当前小程序应用上新版本并重启
              })

              updateManager.onUpdateFailed((res) => {
                // 新版本下载失败的回调
                // 新版本下载失败，提示用户删除后通过冷启动重新打开
                uni.showModal({
                  content: '下载失败，请删除当前小程序后重新打开',
                  showCancel: false,
                  confirmText: '知道了',
                })
              })
            }
          },
        })
      }
    })

    console.log('App Launch')
    // 对路由进行统一拦截，实现路由导航守卫 router.beforeEach 功能
    routingIntercept()
  },

  onReady() {},
  onShow: function () {
    uni.hideTabBar({
      animation: false,
    })
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>
<style lang="scss">
@import 'uview-ui/index.scss';
@import 'theme.scss';
@import 'uni.scss';
</style>
<style>
 

@import url('./static/babes.scss');

/*每个页面公共css */
page {
  background-color: #f5f5f5;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}
uni-radio .uni-radio-input,
uni-checkbox .uni-checkbox-input {
  width: 38rpx;
  height: 38rpx;
  margin-right: 0;
  margin-top: -2rpx;
}

.uni-radio-input-checked {
  background-color: #b1876f !important;
  border: 1px solid #b1876f !important;
}

.uni-checkbox-input-checked {
  color: #b1876f !important;
}

uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
  border-color: #b1876f !important;
}

.agreement uni-checkbox .uni-checkbox-input {
  margin-top: -6rpx !important;
}

.agreement uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
  font-size: 30rpx !important;
}

.uni-forms-item__label .label-text {
  font-size: 30rpx !important;
}
         
.uni-countdown__number {
  width: auto !important;
  background-color: rgba(0, 0, 0, 0) !important;
  color: #666666 !important;
  margin: 2px 0 !important;
}

.file-picker__progress {
  display: none !important;
}

.uni-file-picker__lists-box,
.uni-file-picker__lists {
  border: none !important;
}
</style>
