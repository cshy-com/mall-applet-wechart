<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-12 14:21:33
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-13 16:43:25
 * @FilePath: \mall-admind:\work\mall-applet\pages\index\home\businessHome.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="home-box">
    <!-- <commNav :title="title" ref="navs"></commNav> -->
    <commSearch :placeholder="placeholder"></commSearch>
    <view class="shop-list-box">
      <shopRow :list="shopList"> </shopRow>
    </view>

    <tab-bar :userIdentity="1"></tab-bar>
  </view>
</template>

<script>
import tabBar from '@/components/tab-bar.vue'
import shopRow from '@/components/shopRow.vue'
import commSearch from '@/components/commSearch'
import commNav from '@/components/commNav.vue'
import { getTotalPage } from '@/util/util'
import { mallShopPage } from '@/api/shop'
export default {
  components: { tabBar, shopRow, commSearch, commNav },
  data() {
    return {
      shopList: [],
      more: 'noMore',
      size: 10,
      current: 1,
      total: 0,
      placeholder: '',
    }
  },
  onPageScroll(e) {
 
  },
  options: {
    styleIsolation: 'shared',
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
    this.getPageList()
    this.placeholder = `请输入关键字搜索`
    // this.shopList = dataArr.mockJson.filter((val) => val.cateId == option.pid)
  },

  methods: {
    async getPageList() {
      try {
        let res = await mallShopPage({
          current: this.current,
          size: this.size,
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
.home-box{
  padding-top: 120rpx;
}
.shop-list-box {
  margin-top: 42rpx;
  padding-bottom: 120rpx;
}
</style>
