<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-16 09:31:56
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-16 11:41:19
 * @FilePath: \mall-applet\pages\subPack\merchant\storeList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <defNav :title="title" ref="navs"></defNav>

    <view class="search">
      <search @confirm="search"></search>
    </view>

    <view class="shop-list-box">
      <nodata
        v-if="noDate"
        :config="{
          content: '暂无店铺数据',
          imgUrl: defaultImg,
        }"
      ></nodata>
      <view v-else>
        <shopRow :list="shopList"> </shopRow>
        <noMore v-if="more == 'noMore' && current > 1"></noMore>
      </view>
    </view>
  </view>
</template>

<script>
import search from '@/components/search.vue'
import dataArr from './index.js'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import shopRow from '@/components/shopRow.vue'


import { mallShopPage } from '@/api/shop.js'
import { getTotalPage } from '@/util/util'
export default {
  components: {
    shopRow,
    search,
  
  },
  data() {
    return {
      cateList: dataArr.cateList,
      cateId: 0,
      pid: 0,
      placeholder: '',
      shopList: [],

      title: '',
      // 小程序 胶囊宽度
      jnWidth: 0,
      more: 'noMore',
      size: 10,
      current: 1,
      total: 0,
      keyword: '',
      noDate: false,
    }
  },
  options: {
    styleIsolation: 'shared',
  },
  created() {
    var that = this
    // 小程序胶囊按钮长度
    // #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU || MP-TOUTIAO
    let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    that.jnWidth = menuButtonInfo.width
    // #endif
    // #ifdef MP-ALIPAY
    that.jnWidth = 87
    // #endif
  },
  onPageScroll(e) {
    this.$refs.navs.scroll(e)
  },
  onPullDownRefresh() {
    this.current = 1
    this.getPageList()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  // 上拉触底事件
  onReachBottom: function () {
    if (this.more == 'more') {
      this.current++
      this.getPageList()
    }
  },
  onLoad(option) {
    this.cateId = option.pid

    this.title = option.title
    this.getPageList()
    this.placeholder = `在${this.title}频道内搜索`
    // this.shopList = dataArr.mockJson.filter((val) => val.cateId == option.pid)
  },

  computed: {
    defaultImg() {
      return this.$fileUrl + '/sysFile/img_zanwu_tuijian.png'
    },
  },
  methods: {
    ...mapMutations(['setShopInfo']),
    cancel() {
      this.keyword = ''
      this.search()
    },
    search(e) {
      this.keyword = e
      this.current = 1
      this.shopList = []
      this.more = 'more'
      this.getPageList()
    },
    async getPageList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await mallShopPage({
          current: this.current,
          size: this.size,
          secondType: this.cateId,
          condition: this.keyword,
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
        uni.hideLoading()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.shop-list-box {
  margin-top: 12rpx;
  padding-bottom: 30rpx;
}
.search {
  padding: 15rpx 0;
  background: #ffffff;
}
</style>
