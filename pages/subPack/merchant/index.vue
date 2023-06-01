<template>
  <view>
    <view class="contant-top">
      <commNav :title="title" ref="navs"></commNav>

      <cateGroup :cateList="cateList" @CateEvent="toCateCenter"></cateGroup>
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

      <shopRow :list="shopList"> </shopRow>
      <!-- <uni-load-more :status="more"></uni-load-more> -->
      <photoWall v-if="cateId == -1"></photoWall>
      <commNav v-if="cateId == -2"></commNav>
    </view>
  </view>
</template>

<script>
import dataArr from './index.js'
import tabs from '@/components/tabs.vue'
import shopRow from '@/components/shopRow.vue'
import articleGrid from '@/pages/subPack/components/articleGrid.vue'

import photoWall from './../components/photoWall.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import commNav from './../components/commNav.vue'
import { mallShopTypeListByParentId, mallShopPage } from '@/api/shop.js'
import cateGroup from '@/components/cateGroup.vue'
import { getTotalPage } from '@/util/util'
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
      cateId: 0,
      parentCate: dataArr.parentCate,
      selectClassIndex: 0,

      statusList: dataArr.statusList[0],
      tagList: dataArr.tagList[0],
      list: dataArr.selectData[0],
      prods: dataArr.prods,
      mockJson: dataArr.mockJson,
      title: '',
      size: 10,
      current: 1,
      total: 0,
      shopList: [],
      more: 'noMore',
    }
  },
  computed: {},
  created() {},
  onLoad(option) {
    console.log('option.cateId' + option.cateId)
    this.cateId = option.cateId
    this.getCateList(option.cateId)
    this.getPageList(option.cateId)
    ;(this.statusList = dataArr.statusList[this.cateId]),
      (this.tagList = dataArr.tagList[this.cateId]),
      (this.list = dataArr.selectData[this.cateId])
    this.mockJson = dataArr.mockJson.filter((val) => val.pid == option.cateId)

    this.title = option.title
  },

  computed: { ...mapGetters(['shopInfo', 'cateAll']) },
  options: {
    styleIsolation: 'shared',
  },
  onPageScroll(e) {
    this.$refs.navs.scroll(e)
  },
  onPullDownRefresh() {
    this.getCateList(this.cateId)
    this.current = 1
    this.shopList = []
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
    async getPageList() {
      try {
        this.more = 'loading'
        let res = await mallShopPage({
          current: this.current,
          size: this.size,
          firstType: this.cateId,
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
    toCateCenter(item, index = 0) {
      uni.navigateTo({
        url: `/pages/subPack/merchant/storeList?pid=${item.id}&title=${item.name}`,
      })
    },
    scrolltolower(item) {
      this.current++
      this.getPageList()
    },
    goArticleDetail() {
      uni.navigateTo({
        url: '/pages/subPack/merchant/commodityDetail',
      })
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
/deep/ .center {
  color: #d28534 !important;
}
</style>
