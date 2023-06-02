<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-30 09:27:05
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-02 15:32:16
 * @FilePath: \mall-applet\pages\index\collection\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="content">
    <shopRow :list="shopList" :isShowPid="true"> </shopRow>
  </view>
</template>

<script>
import { mallShopCollectList } from '@/api/shop.js'
import shopRow from '@/components/shopRow.vue'
import { getTotalPage } from '@/util/util'
export default {
  components: { shopRow },
  data() {
    return {
      indexList: [],
      size: 10,
      current: 1,
      total: 0,
      shopList: [],
      more: 'noMore',
      mockJson: [],
      shopList: [],
    }
  },
  onLoad() {},
  onShow() {
    this.getPageList()
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
    this.current++
    this.getPageList()
  },
  methods: {
    async getPageList() {
      try {
        this.more = 'loading'
        let res = await mallShopCollectList({
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
<style scoped lang="scss">
.content {
  margin-top: 20rpx;
  padding-bottom: 30rpx;
}
</style>
