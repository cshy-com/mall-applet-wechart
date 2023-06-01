<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-16 09:31:56
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-01 09:18:59
 * @FilePath: \mall-applet\pages\subPack\merchant\storeList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <commNav :title="title" ref="navs"></commNav>
    <commSearch :placeholder="placeholder"></commSearch>
    <view class="shop-list-box">
      <shopRow :list="shopList"> </shopRow>
    </view>
  </view>
</template>

<script>
import dataArr from './index.js'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import shopRow from '@/components/shopRow.vue'
import commSearch from '@/components/commSearch'
import commNav from './../components/commNav.vue'
import { mallShopPage } from '@/api/shop.js'
import { getTotalPage } from '@/util/util'
export default {
  components: {
    shopRow,
    commSearch,
    commNav,
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
    this.shopList = []
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

  computed: {},
  methods: {
    ...mapMutations(['setShopInfo']),
    async getPageList() {
      try {
        let res = await mallShopPage({
          current: this.current,
          size: this.size,
          secondType: this.cateId,
        })
        this.total = res.total
        let totalPage = getTotalPage(this.total, this.size)
        this.shopList = [...this.shopList, ...res.data]
        if (totalPage > this.current) {
          this.more = 'more'
        } else {
          this.more = 'noMore'
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
<style lang="scss">
page {
  background: $base-bg-blue;
}
</style>
<style lang="scss" scoped>
@import './index.scss';
.shop-list-box {
  margin-top: 42rpx;
  padding-bottom: 30rpx;
}
</style>
