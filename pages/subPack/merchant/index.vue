<template>
  <view>
    <view class="contant-top">
      <commNav :title="title" ref="navs"></commNav>

      <cateGroup :cateList="cateList" @CateEvent="toCouponCenter"></cateGroup>
    </view>
    <view class="contant-center">
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

      <shopRow :list="mockJson" @eventParent="goShopDetail"> </shopRow>
      <photoWall v-if="cateIndex == -1"></photoWall>
      <commNav v-if="cateIndex == -2"></commNav>
    </view>
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
import commNav from './../components/commNav.vue'
import { mallShopTypeListByParentId } from '@/api/shop.js'
import cateGroup from '@/components/cateGroup.vue'
export default {
  components: {
    tabs,
    shopRow,
    articleGrid,

    photoWall,
    commNav,
    cateGroup,
  },
  data() {
    return {
      cateList: [],
      cateIndex: 0,
      parentCate: dataArr.parentCate,
      selectClassIndex: 0,

      statusList: dataArr.statusList[0],
      tagList: dataArr.tagList[0],
      list: dataArr.selectData[0],
      prods: dataArr.prods,
      mockJson: dataArr.mockJson[0],
      title: '',
    }
  },
  computed: {},
  created() {},
  onLoad(option) {
    this.cateIndex = option.cateId
    this.getCateList(option.cateId)
    ;(this.statusList = dataArr.statusList[this.cateIndex]),
      (this.tagList = dataArr.tagList[this.cateIndex]),
      (this.list = dataArr.selectData[this.cateIndex])
    this.mockJson = dataArr.mockJson[this.cateIndex]
    console.log(this.mockJson)
    console.log(this.list)

    this.title = this.parentCate[this.cateIndex]
  },

  computed: { ...mapGetters(['shopInfo', 'cateAll']) },
  options: {
    styleIsolation: 'shared',
  },
  onPageScroll(e) {
    this.$refs.navs.scroll(e)
  },
  onPullDownRefresh() {
    this.getCateList(this.cateIndex)
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  methods: {
    ...mapMutations(['setShopInfo']),
    //获取上方分类
    async getCateList(cateId) {
      try {
        let res = await mallShopTypeListByParentId(cateId)
        this.cateList = res.data
      } catch (e) {
        console.log('异常：', e)
      }
    },
    navBack() {
      uni.navigateBack()
    },
    show(e) {
      console.log(e)
    },
    confirm(e) {
      // 返回值为一个数组
      console.log('eeee', e)
    },
    toCouponCenter(item, index = 0) {
      uni.navigateTo({
        url: `/pages/subPack/merchant/storeList?pid=${item.id}&cateId=${index}`,
      })
    },
    goShopDetail(item) {
      this.setShopInfo(item)
      console.log('shopInfo' + JSON.stringify(item))
      console.log('this.shopInfo' + JSON.stringify(this.shopInfo))
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
