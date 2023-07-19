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

    <view class="search-display" v-if="recentSearch && recentSearch.length">
      <!-- 搜索历史 -->
      <view class="history-search">
        <view class="title-text history-line">
          搜索历史
          <view class="clear-history">
            <u-icon name="trash" size="28" @tap="clearSearch"></u-icon>
          </view>
        </view>

        <block v-for="(item, index) in recentSearch" :key="index">
          <view class="his-search-tags">
            <text class="tags" @click="onHistSearch(item)" :data-name="item">{{
              item
            }}</text>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      recentSearch: [],
    }
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getRecentSearch()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.title = ''
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    /**
     * 获取历史搜索
     */
    getRecentSearch: function () {
      this.recentSearch = uni.getStorageSync('recentSearch')
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
        uni.navigateTo({
          url: '/pages/mall/search-prod/search-prod?title=' + this.title,
        })
      }
    },

    /**
     * 清空搜索历史
     */
    clearSearch: function () {
      uni.removeStorageSync('recentSearch')
      this.getRecentSearch()
    },

    //点击搜素历史
    onHistSearch(e) {
      this.title = e
      this.toSearchProdPage()
    },
  },
}
</script>
<style>
@import './search-page.css';
</style>
