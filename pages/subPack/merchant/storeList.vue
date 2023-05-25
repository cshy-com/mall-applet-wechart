<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-16 09:31:56
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-05-25 16:47:25
 * @FilePath: \mall-applet\pages\subPack\merchant\storeList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <commNav :title="title" ref="navs"></commNav>
    <commSearch :placeholder="placeholder"></commSearch>
    <view class="shop-list-box">
      <shopRow @eventParent="goShopDetail()" :list="shopList"> </shopRow>
    </view>
  </view>
</template>

<script>
import dataArr from './index.js'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import shopRow from '@/pages/subPack/components/shopRow.vue'
import commSearch from '@/components/commSearch'
import commNav from './../components/commNav.vue'
export default {
  components: {
    shopRow,
    commSearch,
    commNav,
  },
  data() {
    return {
      cateList: dataArr.cateList,
      cateIndex: 0,
      pid: 0,
      placeholder: '',
      shopList: [],

      title: '',
      // 小程序 胶囊宽度
      jnWidth: 0,
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
  onLoad(option) {
    this.cateIndex = option.cateId
    this.pid = option.pid

    this.title = option.title

    this.placeholder = `在${this.title}频道内搜索`
    this.shopList = dataArr.mockJson.filter((val) => val.cateId == option.pid)
  },

  computed: {},
  methods: {
    ...mapMutations(['setShopInfo']),
    goShopDetail(item) {
      this.setShopInfo(item)
      uni.navigateTo({
        url: '/pages/subPack/merchant/storeDetails',
      })
    },
  },
}
</script>
<style>
page {
  background: #3a6cba;
}
</style>
<style lang="scss" scoped>
@import './index.scss';
.shop-list-box {
  margin-top: 42rpx;
}
</style>
