<template>
  <!--pages/search-page/search-page.wxml-->
  <view class="container">
    <defNav title="搜索" ref="navs"></defNav>
    <!-- 搜索框 -->
    <view class="search">
      <search :title="title" @confirm="toSearchProdPage"></search>
    </view>

    <view class="search-display">
      <nodata
        v-if="noDate"
        :config="{
          content: '暂无数据',
          imgUrl: defaultImg,
        }"
      ></nodata>
      <template v-else>
        <shopRow v-if="searchType == 0" :list="dataList"> </shopRow>
        <commodity v-if="searchType == 1" :prods="dataList" :showBtn="false">
        </commodity>
        <forum v-if="searchType == 2" :list="dataList"> </forum>
        <recommenList v-if="searchType == 3" :opinionList="dataList">
        </recommenList>
        <projectList v-if="searchType == 4" :list="dataList"> </projectList>
        <noMore v-if="more == 'noMore' && current > 1"></noMore>
      </template>
    </view>
  </view>
</template>

<script>
import search from '@/components/search.vue'
import shopRow from '@/components/shopRow.vue'
import forum from '@/components/forum.vue'
import recommenList from '@/components/recommenList.vue'
import projectList from '@/components/projectList.vue'
import commodity from './../components/commodity'
import { getTotalPage } from '@/util/util'
import { mallShopPage, getCommodityPage } from '@/api/shop.js'
import { ForumPage, projectPage, advicesList } from '@/api/index.js'
export default {
  data() {
    return {
      title: '',
      recentSearch: [],

      more: 'noMore',
      size: 10,
      current: 1,
      total: 0,
      noDate: false,
      searchType: null,
      dataList: [],
    }
  },

  components: { shopRow, search, commodity, forum, recommenList, projectList },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.title = options.title
    this.searchType = options.type
    this.getPageList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  computed: {
    defaultImg() {
      return this.$fileUrl + '/sysFile/img_zanwu_tuijian.png'
    },
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.prodName = ''
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.current = 1
    this.getPageList()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.more == 'more') {
      this.current++
      this.getPageList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    async getPageList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let https = [
          mallShopPage,
          getCommodityPage,
          ForumPage,
          advicesList,
          projectPage,
        ]
        let params = {
          current: this.current,
          size: this.size,
          condition: this.title,
        }
        if (this.searchType == 2) {
          params.type = 'comm'
        }
        let res = await https[this.searchType](params)
        this.total = res.total
        let totalPage = getTotalPage(this.total, this.size)
        if (this.current == 1) {
          this.noDate = res.total == 0
          this.dataList = res.data
        } else {
          this.dataList = [...this.dataList, ...res.data]
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

    /**
     * 搜索提交
     */
    toSearchProdPage(e) {
      this.title = e.trim()
      if (this.title) {
        // 记录最近搜索
        let recentSearch = uni.getStorageSync('recentSearch') || []
        recentSearch = recentSearch.filter((item) => item !== this.title)
        recentSearch.unshift(this.title)
        if (recentSearch.length > 10) {
          recentSearch.pop()
        }
        uni.setStorageSync('recentSearch', recentSearch)
        this.current = 1
        this.more = 'more'
        this.shopList = []
        this.getPageList()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.search {
  padding: 15rpx 0;
  background: #ffffff;
}

/* 热门搜索&搜索历史 */

.search-display {
  margin-top: 12rpx;
}
</style>
