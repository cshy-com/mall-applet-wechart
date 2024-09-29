<template>
  <view>
    <!-- 背景图 -->
    <view
      v-show="!isLogoSticky"
      class="home-bg"
      :style="{
        'background-image': defHomeBg,
      }"
    >
    </view>
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
              <view
                class="sticky-title flex-start"
                :class="{ 'sticky-title-opacity': isLogoSticky }"
              >
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
        <view>
          <view>
            <u-transition :show="true" mode="zoom-in">
              <view
                class="search-box-top"
                :class="{ 'search-box-top-opacity-0': isLogoSticky }"
              >
                <image class="qr-img" :src="defSearch" @click="scanCode">
                </image>
                <view class="qr-right" @click="focusInput">
                  <view class="line"></view>
                  <view class="top-text">输入关键字搜索</view>
                  <view class="line line-right"></view>
                  <view class="top-text-search">搜索</view>
                </view>
              </view>
            </u-transition>
            <!-- <search :disabled="true"></search> -->
          </view>

          <appSwipper></appSwipper>
          <view style="margin-top: 34rpx"></view>
          <category
            :isSwiper="true"
            :cateList="cateAll"
            @CateEvent="toCouponCenter"
          ></category>
        </view>
        <view style="margin-top: 30rpx"></view>

        <view class="tab-active">
          <view class="tab-active-content">
            <image  @click="goPlan"
            class="tab-icon"
            :src="activeIcon1"
            mode="aspectFill"
            lazy-load="false"
            binderror=""
            bindload=""
          >
          </image>
          <image @click="goCard"
            class="tab-icon icon-right"
            :src="activeIcon2"
            mode="aspectFill"
            lazy-load="false"
            binderror=""
            bindload=""
          >
          </image>
          </view>
        
        </view>
        <view class="tab-box animate__animated animate__fadeInUp">
          <view class="sticky-content"  >
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
                    <list
                      :prods="prods"
                      @eventParent="toProdPage"
                      :more="more"
                    ></list>
                  </view>
                </block>
              </view>
              <view class="forum-content" v-if="selectClassIndex == 1">
                <view class="home-add-btn flex-between-center" @tap="goForumList">
                  <view class="home-add-btn-left font-26">
                    <view class="title font-30-500"
                      >开始你的第一篇内容创作</view
                    >
                    <view>发布首篇内容，看看能与多少人产生共鸣</view>
                  </view>
                  <text class="home-add-btn-right font-26" 
                    >去创作</text
                  >
                </view>
                <forum
                  :list="forumList"
                  :more="moreForum"
                  :current="currentForum"
                ></forum>
              </view>
              <view v-if="selectClassIndex == 2">
                <view class="home-add-btn flex-between-center" @tap="goRecommendation">
                  <view class="home-add-btn-left">
                    <view class="title font-30-500">意见与建议发布</view>
                    <view>反馈产品及服务相关优化建议</view>
                  </view>
                  <view class="home-add-btn-right-icon" >
                    <image
                      :src="defRightImg"
                      :lazy-load="true"
                      :lazy-load-margin="0"
                      :mode="'aspectFill'"
                    ></image>
                  </view>
                </view>
                <nodata
                  v-if="noAdvices"
                  :config="{
                    content: '暂无建议记录',
                    imgUrl: defRecommen,
                  }"
                ></nodata>

                <template v-else>
                  <recommenList
                    :noData="noAdvices"
                    :opinionList="opinionList"
                    :more="moreAdvices"
                  ></recommenList>
                </template>
              </view>
              <view v-if="selectClassIndex == 3" class="project-box">
                <view
                  class="pop-box"
                  v-if="['', null, undefined].includes(this.userInfo)"
                >
                  <button @click="goLogin">去登录</button>
                </view>
                <template v-else>
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
    <loginPop
      @closeCheckPopup="closeCheckPopup"
      :show="checkPopShow"
    ></loginPop>
  </view>
</template>

<script>
import search from '@/components/search.vue'
import appSwipper from './../components/app-swipper'
import category from './../components/category'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import { getTotalPage, getUrlParams } from '@/util/util'
import { projectPage, ForumPage } from '@/api/index'
import { mallShopTypeListByParentId, getCommodityPage } from '@/api/shop.js'
import list from './../components/list.vue'
import forum from '@/components/forum'
import tabs from './../components/tabs.vue'
import projectList from '@/components/projectList'
import tabBar from './../components/tab-bar.vue'
import recommenList from '@/components/recommenList'
import { advicesList } from '@/api/index'
import { projectMore } from './../components/projectMore'
import loginPop from './../components/loginPop.vue'
export default {
  //import引入组件才能使用
  components: {
    search,
    appSwipper,
    category,
    tabs,
    list,
    forum,
    projectList,
    loginPop,
    tabBar,
    recommenList,
    projectMore,
    loginPop,
  },
  props: {},
  data() {
    return {
      statusList: [
        {
          title: '关注/推荐',
        },

        {
          title: '论坛',
        },
        {
          title: '客户意见与建议',
        },
        // {
        //   title: '项目发布',
        // },
      ],
      selectClassIndex: 0,
      scrollTop: '',
      current: 1,
      size: 10,
      total: 0,
      forumList: [],
      prods: [],
      currentForum: 1,
      sizeForum: 12,
      totalForum: 0,
      more: 'more',
      moreForum: 'more',
      loading: false,
      projectDataList: [],
      statusBarHeight: 0,
      isSticky: false,
      isLogoSticky: false,
      scrollTop: 0,
      mode: 'circle',
      iconStyle: {
        fontSize: '32rpx',
        color: '#2979ff',
        width: '78rpx',
        height: '78rpx',
      },
      currentAdvices: 1,
      sizeAdvices: 10,
      totalAdvices: 0,
      opinionList: [],
      moreAdvices: 'more',
      noAdvices: false,
      noProjectList: false,
      showS: false,
      checkPopShow: false,
      isLogoStickyShow: false,
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['cateAll', 'projectList']),
    userInfo() {
      return this.$store.state.user.userInfo
    },
    activeIcon1() {
      return `${this.$fileUrl}/sysFile/icon4.png?${Math.random()}`
    },
    activeIcon2() {
      return `${this.$fileUrl}/sysFile/icon5.png?${Math.random()}`
    },
    defHomeBg() {
      return `url(${this.$fileUrl}/sysFile/img_home_bg_1.png?${Math.random()})`
    },
    defStickyBg() {
      return this.$fileUrl + '/sysFile/img_dingbu_bg.png'
    },
    defRightImg() {
      return this.$fileUrl + '/sysFile/ic_arrow_jianyi.png'
    },
    defRecommen() {
      return this.$fileUrl + '/sysFile/img_zanwujilu.png'
    },
    defProject() {
      return this.$fileUrl + '/sysFile/img_zanwuxiangmu.png'
    },
    defBackTop() {
      return this.$fileUrl + '/sysFile/back_top.png'
    },
    defSearch() {
      return this.$fileUrl + '/sysFile/ic_geren_saoyisao.png'
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
    this.getAllCate()
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
          this.getCommodityRecommend()
        }
        break
      case 1:
        if (['', null, undefined].includes(this.userInfo)) {
          return
        }
        if (this.moreForum == 'more') {
          this.currentForum++
          this.getForumList()
        }
        break
      case 2:
        if (['', null, undefined].includes(this.userInfo)) {
          return
        }
        if (this.moreAdvices == 'more') {
          this.currentAdvices++
          this.getAdvicesList()
        }
        break
      default:
        if (this.more == 'more') {
          this.current++
          this.getCommodityRecommend()
        }
    }

    if (this.selectClassIndex == 0) {
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
        if (data.top < -50) {
          _this.isLogoSticky = true
          _this.isLogoStickyShow = true
        } else {
          _this.isLogoSticky = false
          _this.isLogoStickyShow = false
        }
        if (data.top < -440) {
          _this.isSticky = true
        } else {
          _this.isSticky = false
        }
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
    this.getAllCate()
    this.currentForum = 1
    if (!['', null, undefined].includes(this.userInfo)) {
      this.getForumList()
    }

    this.resetPage()

    uni.hideLoading()
  },
  onShow() {
    if (['', null, undefined].includes(this.userInfo)) {
      this.selectClassIndex = 0
      this.projectDataList = []
      this.opinionList = []
      this.forumList = []
    }
  },
  // 方法集合
  methods: {
    ...mapMutations(['setCateAll', 'setCommodityInfo']),
    goCard(){
      uni.navigateTo({
              url: `/pages/coupon/card`,
            })
    },
    goPlan(){
      uni.navigateTo({
              url: `/pages/coupon/plan`,
            })
    },
    scanCode() {
      if (['', null, undefined].includes(this.userInfo)) {
        this.checkPopShow = true
        return
      }
      let that = this
      uni.scanCode({
        onlyFromCamera: true,
        scanType: 'qrCode',
        success: function (res) {
          console.log('res' + JSON.stringify(res))
          let result = getUrlParams(res.result)
          console.log('code----' + JSON.stringify(result.code))
          console.log(that.userInfo.userType, +'this.userInfo.userType')

          // 用户扫一扫
          // 扫码领取积分
          if (res.result.search('integral') > -1) {
            uni.navigateTo({
              url: `/pages/coupon/receive?code=${result.code}&id=${result.id}`,
            })
          }
          // 扫码付款
          if (res.result.search('payment') > -1) {
            uni.navigateTo({
              url: '/pages/coupon/paymentCode?code=' + result.code,
            })
          }
          if (res.result.search('transfer') > -1) {
            uni.navigateTo({
              url: `/pages/coupon/transferScanCode?userId=${result.userId}&id=${result.id}`,
            })
          }
        },
      })
    },
    goLogin() {
      uni.navigateTo({ url: '/pages/public/login' })
    },
    closeCheckPopup(e) {
      this.checkPopShow = false
      if (e == 0) {
      } else {
        uni.navigateTo({ url: '/pages/public/login' })
      }
    },

    resetPage() {
      switch (this.selectClassIndex) {
        case 0:
          this.current = 1
          this.getCommodityRecommend()
          break
        case 1:
          this.currentForum = 1
          if (['', null, undefined].includes(this.userInfo)) {
            return
          }

          this.getForumList()
          break
        case 2:
          this.currentAdvices = 1
          if (['', null, undefined].includes(this.userInfo)) {
            return
          }
          this.getAdvicesList()
          break
        case 3:
          if (['', null, undefined].includes(this.userInfo)) {
            return
          }
          this.getProjectList()
          break
        default:
          this.current = 1

          this.getCommodityRecommend()
      }
    },

    focusInput() {
      if (['', null, undefined].includes(this.userInfo)) {
        this.checkPopShow = true
        return
      }
      uni.navigateTo({
        url: '/pages/mall/search-page/search-page',
      })
    },
    changeIndex(e) {
      this.selectClassIndex = e
      this.$nextTick(() => {
        uni.pageScrollTo({
          scrollTop: 460, //滚动的距离
          duration: 30, //过渡时间
        })
      })
      if (['', null, undefined].includes(this.userInfo) && e != 0) {
        return
      }

      this.resetPage()
    },

    goForumList() {
      if (['', null, undefined].includes(this.userInfo)) {
        this.checkPopShow = true
        return
      }
      uni.navigateTo({
        url: '/pages/article/forumAdd',
      })
    },
    goRecommendation() {
      if (['', null, undefined].includes(this.userInfo)) {
        this.checkPopShow = true
        return
      }
      uni.navigateTo({
        url: '/pages/article/recommendationAdd',
      })
    },
    toProdPage(item) {
      if (['', null, undefined].includes(this.userInfo)) {
        this.checkPopShow = true
        return
      }

      this.setCommodityInfo(item)

      uni.navigateTo({
        url: `/pages/mall/commodity/commodityDetail?Id=${item.id}&shopId=${item.shopId}`,
      })
    },

    toCouponCenter(item, index) {
      if (['', null, undefined].includes(this.userInfo)) {
        this.checkPopShow = true
        return
      }

      uni.navigateTo({
        url: `/pages/mall/store/index?cateId=${item.id}&title=${item.name}&index=${index}`,
      })
    },

    async getAdvicesList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await advicesList({
          current: this.currentAdvices,
          size: this.sizeAdvices,
        })

        this.totalAdvices = res.total
        let totalPage = getTotalPage(this.totalAdvices, this.sizeAdvices)

        if (this.currentAdvices == 1) {
          this.noAdvices = res.total == 0
          this.opinionList = res.data
        } else {
          this.opinionList = [...this.opinionList, ...res.data]
        }
        console.log(totalPage, '------------------', this.currentAdvices)
        if (totalPage > this.currentAdvices) {
          this.moreAdvices = 'more'
        } else {
          this.moreAdvices = 'noMore'
        }
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },
    async getForumList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await ForumPage({
          current: this.currentForum,
          size: this.sizeForum,
          type: 'comm',
        })

        this.totalForum = res.total
        let totalPage = getTotalPage(this.totalForum, this.sizeForum)

        if (this.currentForum == 1) {
          this.forumList = res.data
        } else {
          this.forumList = [...this.forumList, ...res.data]
        }

        if (totalPage > this.currentForum) {
          this.moreForum = 'more'
        } else {
          this.moreForum = 'noMore'
        }
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
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

    async getAllCate() {
      try {
        let res = await mallShopTypeListByParentId(0)
        this.setCateAll(res.data)
      } catch (err) {
        console.log('异常：', err)
      }
    },
    async getCommodityRecommend() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await getCommodityPage({
          current: this.current,
          size: this.size,
        })
        this.total = res.total
        let totalPage = getTotalPage(this.total, this.size)
        if (this.current == 1) {
          this.prods = res.data
        } else {
          this.prods = [...this.prods, ...res.data]
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
  background: #fff;
}
</style>
<style scoped lang="scss">
@import './index.scss';

.pop-box {
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 200rpx;

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

  button:after {
    border: none;
  }
}
</style>
