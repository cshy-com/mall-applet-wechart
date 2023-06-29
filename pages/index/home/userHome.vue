<template>
  <!--index.wxml-->
  <view class="container">
    <view class="container-top">
      <view class="header-top"><text>私人银行服务平台</text></view>
      <commSearch :placeholder="'输入关键字搜索'"></commSearch>
      <view class="content">
        <view class="swiper">
          <u-swiper
            :list="list3"
            indicator
            indicatorMode="line"
            circular
            height="200"
          ></u-swiper>
        </view>
        <cateGroup
          :isSwiper="true"
          :cateList="cateAll"
          @CateEvent="toCouponCenter"
        ></cateGroup>
      </view>
    </view>
    <view class="container-center">
      <tabs
        :list="statusList"
        :selectIndex="selectClassIndex"
        @changeIndex="changeIndex"
      ></tabs>
      <view class="home-content">
        <!-- 推荐 -->
        <view class="updata" v-if="selectClassIndex == 0">
          <block>
            <!-- 商城热卖 -->
            <view>
              <list :prods="prods" @eventParent="toProdPage"></list>
            </view>
          </block>
        </view>
        <view class="forum-content" v-if="selectClassIndex == 1">
          <forum :list="list" ></forum>
        </view>
        <view v-if="selectClassIndex == 2">
          <recommendation></recommendation>
        </view>
        <view v-if="selectClassIndex == 3" class="project-box">
          <projectList :list="projectList"></projectList>
          <view class="btn">
            <button @tap="goProjectList">查看更多</button>
          </view>
        </view>
      </view>
    </view>
    <tab-bar :userIdentity="1" :selected="0"></tab-bar>
  </view>
</template>

<script>
import tabs from '@/components/tabs.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import commSearch from '@/components/commSearch.vue'
import list from './../components/list.vue'
import { mallShopTypeListByParentId, getCommodityPage } from '@/api/shop.js'
import { ForumPage } from '@/api/index'
import cateGroup from '@/components/cateGroup'
import forum from '@/components/forum'
import recommendation from './../components/recommendation'
import forumData from '@/mock/index.js'
import projectList from '@/components/projectList'
import tabBar from '@/components/tab-bar.vue'
import { getTotalPage } from '@/util/util'
export default {
  data() {
    return {
      indicatorDots: true,
      indicatorColor: '#d1e5fb',
      indicatorActiveColor: '#1b7dec',
      autoplay: true,
      interval: 2000,
      duration: 1000,
      list3: [
        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
      ],

      seq: 0,
      news: [],
      statusList: [
        {
          title: '关注/推荐',
        },

        {
          title: '论坛',
        },
        {
          title: '客户建议',
        },
        {
          title: '项目发布',
        },
      ],
      selectClassIndex: 0,

      sts: 0,
      scrollTop: '',
      current: 1,
      size: 10,
      total: 0,
      updata: true,
      list: [],
      prods: [],
      currentForum: 1,
      sizeForum: 10,
      totalForum: 0,
      more: 'more',
      moreForum: 'more',
    }
  },

  components: {
    tabs,
    commSearch,
    list,
    cateGroup,
    forum,
    recommendation,
    projectList,
    tabBar,
  },
  props: {},
  computed: {
    ...mapGetters(['cateAll', 'projectList']),
    fileUrl() {
      return this.$fileUrl
    },
  },
  created() {
    uni.showLoading({
      title: '加载中',
    })
    this.getAllCate()
    this.getCommodityRecommend()
    uni.hideLoading()
  },
  onLoad() {},
  onReady() {},
  onShow() {},

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
        if (this.moreForum == 'more') {
          this.currentForum++
          this.getForumList()
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
  methods: {
    ...mapMutations(['setCateAll', 'setCommodityInfo']),
    resetPage() {
      switch (this.selectClassIndex) {
        case 0:
          this.current = 1
          this.getCommodityRecommend()
          break
        case 1:
          this.currentForum = 1
          this.getForumList()
          break
        default:
          this.current =1
          this.getCommodityRecommend()
      }
    },
    // 论坛列表
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
          this.list = res.data
        } else {
          this.list = [...this.list, ...res.data]
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
    goProjectList() {
      uni.navigateTo({
        url: '/pages/article/projectList',
      })
    },
    changeIndex(e) {
      this.selectClassIndex = e
      this.resetPage()
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
        uni.hideLoading()
      }
    },
    //获取所有一级分类
    async getAllCate() {
      try {
        let res = await mallShopTypeListByParentId(0)
        this.setCateAll(res.data)
      } catch (err) {
        console.log('异常：', err)
      }
    },
    changeStu(index) {
      this.selectClassIndex = index
    },

    // 页面滚动到指定位置指定元素固定在顶部
    onPageScroll: function (e) {
      //监听页面滚动
      // this.setData({
      //   scrollTop: e.scrollTop
      // });
    },
    toProdPage(item) {
      this.setCommodityInfo(item)

      uni.navigateTo({
        url: `/pages/mall/commodity/commodityDetail?Id=${item.id}&shopId=${item.shopId}`,
      })
    },

    toCouponCenter(item) {
      uni.navigateTo({
        url: `/pages/mall/store/index?cateId=${item.id}&title=${item.name}`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import './index.scss';
.swiper {
  height: 200rpx;
  margin: 20rpx;
}
.project-box {
  padding-bottom: 40rpx;
  .btn {
    width: 600rpx;
    margin: 0 auto;
    margin-top: 40rpx;
  }
}
</style>
