<template>
  <view>
    <!-- 上方分类 -->
    <view class="cat-row">
      <view class="cat-item">
        <view
          class="item"
          v-for="(item, index) in cateList[cateIndex]"
          @tap="($event) => toCouponCenter(item, index)"
          data-sts="item.id"
          :key="item.id"
        >
          <image :src="item.icon"></image>
          <text>{{ item.title }}</text>
        </view>
      </view>
    </view>

    <!-- tab切换 -->
    <tabs :list="statusList" :selectIndex="selectClassIndex"></tabs>

    <!-- 下拉筛选 -->
    <view v-if="list">
      <smh-select :list="list" @change="show"></smh-select>
    </view>

    <!-- 标签筛选 -->
    <view class="tag-view">
      <text class="value" v-for="item in tagList" :key="item.id">{{
        item
      }}</text>
    </view>
    <!-- <photoWall v-if="cateIndex == 3"></photoWall>

    <articleGrid
      v-if="cateIndex == 2"
      @eventParent="goArticleDetail()"
      :prods="prods"
    ></articleGrid> -->
    <shopRow :list="mockJson" @eventParent="goShopDetail"> </shopRow>
  </view>
</template>

<script>
import dataArr from './index.js'
import tabs from '@/components/tabs.vue'
import shopRow from '@/pages/subPack/components/shopRow.vue'
import articleGrid from '@/pages/subPack/components/articleGrid.vue'

import photoWall from './../components/photoWall.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
export default {
  components: {
    tabs,
    shopRow,
    articleGrid,

    photoWall,
  },
  data() {
    return {
      cateList: dataArr.cateList,
      cateIndex: 0,
      parentCate: dataArr.parentCate,
      selectClassIndex: 0,

      statusList: dataArr.statusList[0],
      tagList: dataArr.tagList[0],
      list: dataArr.selectData[0],
      prods: dataArr.prods,
      mockJson: dataArr.mockJson[0],
    }
  },
  computed: {},
  onLoad(option) {
    this.cateIndex = option.cateId
    ;(this.statusList = dataArr.statusList[this.cateIndex]),
      (this.tagList = dataArr.tagList[this.cateIndex]),
      (this.list = dataArr.selectData[this.cateIndex])
    this.mockJson = dataArr.mockJson[this.cateIndex]
    console.log(this.mockJson)
    console.log(this.list)
    uni.setNavigationBarTitle({
      title: this.parentCate[this.cateIndex],
    })
  },

  computed: {},
  methods: {
    ...mapMutations(['setShopInfo']),
    show(e) {
      console.log(e)
    },
    confirm(e) {
      // 返回值为一个数组
      console.log('eeee', e)
    },
    toCouponCenter(item, index) {
      uni.navigateTo({
        url: `/pages/subPack/merchant/storeList?pid=${this.cateIndex}&cateId=${index}`,
      })
    },
    goShopDetail(item) {
      this.setShopInfo(item)
      uni.navigateTo({
        url: '/pages/subPack/merchant/storeDetails',
      })
    },
    goArticleDetail() {
      uni.navigateTo({
        url: '/pages/subPack/merchant/commodityDetail',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
