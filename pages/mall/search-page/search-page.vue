<template>
  <!--pages/search-page/search-page.wxml-->
  <view class="container">
    <defNav title="搜索" ref="navs"></defNav>
    <!-- 搜索框 -->
    <view class="search">
      <uni-data-select
        v-model="value"
        :localdata="range"
        @change="change"
        :clear="false"
      ></uni-data-select>
      <search @confirm="toSearchProdPage"></search>
    </view>

    <view class="search-display" v-if="recentSearch && recentSearch.length">
      <!-- 搜索历史 -->
      <view class="history-search">
        <view class="title-text history-line">
          <text>搜索历史</text>

          <view class="clear-history" @tap="clearSearch">
            <image :src="delIcon" mode="aspectFit"> </image>
          </view>
        </view>

        <block>
          <view class="history-search-tags">
            <text
              class="tags"
              v-for="(item, index) in recentSearch"
              :key="index"
              @click="onHistSearch(item)"
              :data-name="item"
              >{{ item }}</text
            >
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
import search from '@/components/search.vue'
export default {
  data() {
    return {
      title: '',
      recentSearch: [],
      value: 0,
      rangeUser: [
        { value: 0, text: '店铺' },
        { value: 1, text: '商品' },
        { value: 2, text: '论坛' },
        { value: 3, text: '建议' },
      ],
      rangeShop: [
        { value: 0, text: '店铺' },
        { value: 1, text: '商品' },
        { value: 4, text: '项目' },
         
      ],
    }
  },

  components: { search },
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
  computed: {
    delIcon() {
      return this.$fileUrl + '/sysFile/ic_sousuo_shanchu.png'
    },
    userInfo() {
      return this.$store.state.user.userInfo
    },
    range(){
      return this.$store.state.user.userInfo.userType==1?this.rangeUser:this.rangeShop
      
      
    }
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
    change(e) {
      console.log('e:', e)
    },
    /**
     * 获取历史搜索
     */
    getRecentSearch: function () {
      this.recentSearch = uni.getStorageSync('recentSearch')
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
        uni.navigateTo({
              url: `/pages/mall/search-prod/search-prod?type=${this.value}&title=${this.title}`
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
      this.toSearchProdPage(e)
    },
  },
}
</script>
<style lang="scss" scoped>
@import './search-page.scss';
</style>
