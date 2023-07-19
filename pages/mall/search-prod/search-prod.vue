<template>
  <!--pages/search-page/search-page.wxml-->
  <view class="container">
    <!-- 搜索框 -->
    <view class="search-bar">
      <view class="search-box">
        <input
          placeholder="输入关键字搜索"
          class="sear-input"
          confirm-type="search"
          @confirm="toSearchProdPage"
          v-model="title"
        />
        <image src="/static/img/icon/search.png" class="search-img"></image>
      </view>
      <text class="search-hint" @tap="toSearchProdPage">搜素</text>
    </view>

    <view class="search-display">
      <shopRow :list="shopList"> </shopRow>
    </view>
  </view>
</template>

<script>
import shopRow from '@/components/shopRow.vue'
import { getTotalPage } from '@/util/util'
import { mallShopPage } from '@/api/shop.js'

export default {
  data() {
    return {
      title: '',
      recentSearch: [],
      shopList: [],
      more: 'noMore',
      size: 10,
      current: 1,
      total: 0,
    }
  },

  components: { shopRow },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.title = options.title
    this.getPageList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
        let res = await mallShopPage({
          current: this.current,
          size: this.size,
          condition: this.title,
        })
        this.total = res.total
        let totalPage = getTotalPage(this.total, this.size)
        if (this.current == 1) {
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
        uni.hideLoading()
      }
    },

    /**
     * 搜索提交
     */
    toSearchProdPage: function () {
      if (this.title.trim()) {
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
/* pages/search-page/search-page.wxss */

/* 搜索栏 */

.search-bar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  color: #777;
  background: #fff;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.07);
  z-index: 3;
}

.search-bar .search-box {
  position: relative;
  height: 60rpx;
  background: #f7f7f7;
  z-index: 999;
  width: 80%;
  margin-left: 70rpx;
  border-radius: 50rpx;
  margin: 20rpx 0 20rpx 20rpx;
}

.sear-input {
  height: 60rpx;
  border-radius: 50rpx;
  border: 0;
  margin: 0 30rpx 0 64rpx;
  line-height: 48rpx;
  vertical-align: top;
  background: #f7f7f7;
  font-size: 28rpx;
}

.search-bar .search-hint {
  font-size: 28rpx;
  position: absolute;
  right: 30rpx;
  top: 31rpx;
  color: #eb2444;
}

.search-bar .search-box .search-img {
  width: 32rpx;
  height: 32rpx;
  position: absolute;
  left: 20rpx;
  top: 14rpx;
  display: block;
}

/* 热门搜索&搜索历史 */

.search-display {
  background: #fff;
  padding: 20rpx;
  margin-top: 100rpx;
}
 

 
 
</style>
