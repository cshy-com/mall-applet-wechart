<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-16 09:31:56
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-05-16 13:38:30
 * @FilePath: \mall-applet\pages\subPack\merchant\storeList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <commSearch :placeholder="placeholder"></commSearch>
    <shopRow @eventParent="goShopDetail()" :list="shopList"> </shopRow>
  </view>
</template>

<script>
import dataArr from './index.js'

import shopRow from '@/pages/subPack/components/shopRow.vue'
import commSearch from './../components/commSearch'
export default {
  components: {
    shopRow,
    commSearch,
  },
  data() {
    return {
      cateList: dataArr.cateList,
      cateIndex: 0,
      pid: 0,
      placeholder: '',
      shopList: [],
    }
  },

  onLoad(option) {
    console.log(option)
    this.cateIndex = option.cateId
    this.pid = option.pid
    let title = this.cateList[this.pid][this.cateIndex].title
    uni.setNavigationBarTitle({
      title: title,
    })
    this.placeholder = `在${title}频道内搜索`
    this.shopList = dataArr.mockJson[this.pid].filter(
      (val) => val.type == this.cateIndex
    )
  },

  computed: {},
  methods: {
    goShopDetail() {
      uni.navigateTo({
        url: '/pages/subPack/merchant/storeDetails',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
