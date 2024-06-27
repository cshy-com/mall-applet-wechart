<template>
  <view>
    <!-- 背景图 -->
    <view v-if="showS" style="position: relative; z-index: 99">
      <image
        style="width: 100vw; height: 1624rpx"
        class=""
        :src="require('@/static/img/skeleton-home.png')"
        mode="aspectFill"
        lazy-load="false"
        binderror=""
        bindload=""
      >
      </image>
    </view>
    <view class="home-content-bg">
      <!-- 内容 -->
      <view class="home-content">
        <u-sticky index="1" :offsetTop="0" :customNavHeight="0">
          <u-transition :show="true" mode="zoom-in">
            <view class="illustrate">
              <view class="sticky-title flex-start sticky-title-opacity">
                <view
                  class="sticky-search flex-center font-30"
                  @click="focusInput"
                >
                  <image :src="defHomeSearch" />
                  <text>搜索</text></view
                >
                <view class="logo-text flex-center">
                  <text class="logo-sub-title font-32-500"
                    >清云私享品质生活</text
                  >
                  <text class="logo-title font-20"
                    >私人银行客户·生活服务平台</text
                  >
                </view>
              </view>
            </view>
          </u-transition>
        </u-sticky>

        <view
          style="padding-bottom: 130rpx"
          class="tab-box animate__animated animate__fadeInUp"
        >
          <view class="sticky-content">
            <u-sticky :offsetTop="180" index="2" zIndex="999" bgColor="#f5f5f5">
              <view>
                <tabs
                  :list="statusList"
                  :selectIndex="selectClassIndex"
                  @changeIndex="changeIndex"
                  :isSticky="isSticky"
                ></tabs>
              </view>
            </u-sticky>
            <view class="tab-content">
              <!-- 推荐 -->
              <view class="updata" v-if="selectClassIndex == 0">
                <block>
                  <!-- 商城热卖 -->
                  <view>
                    <shopRow :list="shopList"></shopRow>
                  </view>
                </block>
              </view>

              <view v-if="selectClassIndex == 1" class="project-box">
                <nodata
                  v-if="noProjectList"
                  :config="{
                    content: '暂未发布项目',
                    imgUrl: defProject,
                  }"
                ></nodata>
                <template v-else>
                  <projectList
                    :list="projectDataList.slice(0, 4)"
                  ></projectList>
                  <projectMore
                    :list="projectDataList.slice(4, 5)"
                  ></projectMore>
                </template>
              </view>
            </view> </view
        ></view>
      </view>
    </view>
    <view class="wrap">
      <u-back-top
        :scrollTop="scrollTop"
        :mode="mode"
        :iconStyle="iconStyle"
        bottom="200"
        right="30"
        :icon="defBackTop"
      ></u-back-top>
    </view>
    <tab-bar :selected="0"></tab-bar>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import { getTotalPage } from '@/util/util'
import { projectPage } from '@/api/index'
import { mallShopPage } from '@/api/shop'

import tabs from './../components/tabs.vue'
import projectList from '@/components/projectList'
import tabBar from './../components/tab-bar.vue'

import { projectMore } from './../components/projectMore'

import { shopRow } from '@/components/shopRow'
export default {
  //import引入组件才能使用
  components: {
    tabs,
    projectList,
    tabBar,
    projectMore,
    shopRow,
  },
  props: {},
  data() {
    return {
      statusList: [
        {
          title: '店铺推荐',
        },

        {
          title: '项目发布',
        },
      ],
      selectClassIndex: 0,
      scrollTop: '',
      current: 1,
      size: 10,
      total: 0,

      more: 'more',

      loading: false,
      projectDataList: [],
      statusBarHeight: 0,
      isSticky: false,
      isLogoSticky: true,
      scrollTop: 0,
      mode: 'circle',
      iconStyle: {
        fontSize: '32rpx',
        color: '#2979ff',
        width: '78rpx',
        height: '78rpx',
      },

      noProjectList: false,
      showS: false,

      isLogoStickyShow: false,
      shopList: [],
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['projectList']),
    userInfo() {
      return this.$store.state.user.userInfo
    },

    defProject() {
      return this.$fileUrl + '/sysFile/img_zanwuxiangmu.png'
    },
    defBackTop() {
      return this.$fileUrl + '/sysFile/back_top.png'
    },

    defHomeSearch() {
      return this.$fileUrl + '/sysFile/ic_home_sousuo.png'
    },
  },
  // 监听data中的数据变化
  watch: {},
  options: {
    styleIsolation: 'shared',
  },
  onPullDownRefresh() {
    this.resetPage()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  onReachBottom: function () {
    switch (this.selectClassIndex) {
      case 0:
        if (this.more == 'more') {
          this.current++
          this.getPageList()
        }
        break

      default:
        if (this.more == 'more') {
          this.current++
          this.getPageList()
        }
    }
  },

  onPageScroll(e) {
    let _this = this
    let info = uni.createSelectorQuery().select('.home-content')
    info
      .boundingClientRect(function (data) {
        //data - 各种参数
        // console.log(data) // 获取元素宽度
        // 下面的容器露出相应的结算栏就置于底部
        console.log(data.top)
      })
      .exec()
    this.scrollTop = e.scrollTop
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight

    uni.showLoading({
      title: '加载中',
    })

    this.resetPage()

    uni.hideLoading()
  },
  onShow() {},
  // 方法集合
  methods: {
    ...mapMutations([]),

    resetPage() {
      switch (this.selectClassIndex) {
        case 0:
          this.current = 1
          this.getPageList()
          break

        case 1:
          this.getProjectList()
          break
        default:
          this.current = 1

          this.getPageList()
      }
    },

    focusInput() {
      uni.navigateTo({
        url: '/pages/mall/search-page/search-page',
      })
    },
    changeIndex(e) {
      this.selectClassIndex = e
      this.$nextTick(() => {
        uni.pageScrollTo({
          scrollTop: 0, //滚动的距离
          duration: 30, //过渡时间
        })
      })

      this.resetPage()
    },

    async getProjectList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await projectPage({
          current: 1,
          size: 20,
        })
        this.noProjectList = res.data.length == 0
        this.projectDataList = res.data
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },

    async getPageList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await mallShopPage({
          current: this.current,
          size: this.size,
        })
        this.total = res.total
        let totalPage = getTotalPage(this.total, this.size)
        if (this.current == 1) {
          this.noDate = res.total == 0
          this.shopList = res.data
        } else {
          this.shopList = [...this.shopList, ...res.data]
        }

        if (totalPage > this.current) {
          this.more = 'more'
        } else {
          this.more = 'noMore'
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.showS = false
        uni.hideLoading()
      }
    },
  },

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
<style>
page {
  background: #f5f5f5;
}
</style>
<style scoped lang="scss">
@import './index.scss';

.home-content {
  margin-top: 0;
  .illustrate {
    margin-bottom: 0;
  }
}
</style>
