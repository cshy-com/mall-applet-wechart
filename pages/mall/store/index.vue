<template>
  <view>
    <view class="contant-top">
      <commNav :title="title" ref="navs"></commNav>
      <view class="cover-banner">
        <image class="bachground-def-img"
          :lazy-load="true"
          :lazy-load-margin="0"
          :src="defBannerImg"
        ></image>
      </view>
      <!-- <view class="cover-img">
        <image
          :lazy-load="true"
          :lazy-load-margin="0"
          :src="defBannerCover"
        ></image>
      </view> -->
      <view class="contant-center">
      <cateGroup
        :isSwiper="false"
        :cateList="cateList"
        @CateEvent="toCateCenter"
        shopListLength="shopList.length"
      ></cateGroup>
      <!-- tab切换 -->
      <!-- <tabs :list="statusList" :selectIndex="selectClassIndex"></tabs> -->

      <!-- 下拉筛选 -->
      <!-- <view v-if="list">
        <smh-select :list="list" @change="show"></smh-select>
      </view> -->

      <!-- 标签筛选 -->
      <!-- <view class="tag-view">
        <text class="value" v-for="item in tagList" :key="item.id">{{
          item
        }}</text>
      </view> -->

      <nodata
        v-if="noDate"
        :config="{
          content: '暂无店铺数据',
          imgUrl: defaultImg,
          background: '#fff',
        }"
      ></nodata>
      <view v-else>
        
        <shopTopItem   :list="shopList" v-if="cateList.length == 1"></shopTopItem>
        <template v-else>
          <view class="title-tip">
            <image
              :lazy-load="true"
              :lazy-load-margin="0"
              :src="defTipCover"
            ></image>
            <text> 精选推荐 </text>
          </view>
          <shopRow :list="shopList"> </shopRow>
        </template>

        <noMore v-if="more == 'noMore' && current > 1"></noMore
      ></view>
    </view>
    </view>
   
  </view>
</template>

<script>
import dataArr from './index.js'

import shopRow from '@/components/shopRow.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import commNav from './../components/commNav'
import { mallShopTypeListByParentId, mallShopPage } from '@/api/shop.js'
import cateGroup from './../components/cateGroup.vue'
import shopTopItem from './../components/shopTopItem.vue'
import { getTotalPage } from '@/util/util'
export default {
  components: {
    shopRow,
    shopTopItem,
    cateGroup,
    commNav,
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
      noDate: false,
      cateBannerIndex: 0,
    }
  },
  computed: {},
  created() {},
  onLoad(option) {
    // console.log('option.cateId' + option.cateId)
    this.cateId = option.cateId
    this.cateBannerIndex = Number(option.index) + 1
    this.getCateList(option.cateId)
    this.getPageList(option.cateId)
    ;(this.statusList = dataArr.statusList[this.cateId]),
      (this.tagList = dataArr.tagList[this.cateId]),
      (this.list = dataArr.selectData[this.cateId])
    this.mockJson = dataArr.mockJson.filter((val) => val.pid == option.cateId)

    this.title = option.title
  },

  computed: {
    ...mapGetters(['shopInfo', 'cateAll']),

    defBannerImg() {
      return `${this.$fileUrl}/sysFile/img_nav_bg_${this.cateBannerIndex}.jpg`
    },
    defBannerCover() {
      return this.$fileUrl + '/sysFile/img_canying_zhuangshi1.png'
    },
    defaultImg() {
      return this.$fileUrl + '/sysFile/img_zanwu_tuijian.png'
    },
    defTipCover() {
      let fileName = null
      switch (this.cateBannerIndex) {
        case 4:
          fileName = '/sysFile/ic_jiankang_jingxuan.png'
          break
        case 8:
          fileName = '/sysFile/ic_yisu_jingxuan.png'
          break
        case 9:
          fileName = '/sysFile/ic_huwai_jingxuan.png'
          break
        case 12:
          fileName = '/sysFile/ic_liyi_jingxuan.png'
          break

        default:
          fileName = '/sysFile/ic_gongy_jingxuan.png'
      }
      return this.$fileUrl + fileName
    },
  },
  options: {
    styleIsolation: 'shared',
  },
  onPageScroll(e) {
    this.$refs.navs.scroll(e)
  },
  onPullDownRefresh() {
    this.getCateList(this.cateId)
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
      uni.showLoading({
        title: '加载中',
      })
      try {
        this.more = 'loading'
        let res = await mallShopPage({
          current: this.current,
          size: this.size,
          firstType: this.cateId,
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
        url: `/pages/mall/store/storeList?pid=${item.id}&title=${item.name}`,
      })
    },
    scrolltolower(item) {
      this.current++
      this.getPageList()
    },
  },
}
</script>
<style>
page {
  background:  #F5F5F5;
}
</style>

<style lang="scss" scoped>
@import './index.scss';
</style>
