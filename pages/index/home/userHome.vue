<template>
  <!--index.wxml-->
  <view class="container">
    <view class="container-top">
      <view class="header-top"><text>高端定制</text></view>
      <commSearch :placeholder="'输入关键字搜索'"></commSearch>
      <view class="content">
        <cateGroup :cateList="cateAll" @CateEvent="toCouponCenter"></cateGroup>
      </view>
    </view>
    <view class="container-center">
      <tabs
        :list="statusList"
        :selectIndex="selectClassIndex"
        @changeIndex="changeIndex"
      ></tabs>
      <view class="home-content">
        <!-- 推荐 -->
        <view class="updata" v-if="selectClassIndex == 1">
          <block v-for="(item, index) in taglist" :key="index">
            <!-- 商城热卖 -->
            <view v-if="item.style == 1">
              <list :prods="item.prods" @eventParent="toProdPage"></list>
            </view>
          </block>
        </view>
        <view v-if="selectClassIndex == 2">
          <forum :list="list"></forum>
        </view>
        <view v-if="selectClassIndex == 3">
          <recommendation ></recommendation>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import tabs from '@/components/tabs.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import commSearch from '@/components/commSearch.vue'
import list from './../components/list.vue'
import { mallShopTypeListByParentId } from '@/api/shop.js'
import cateGroup from '@/components/cateGroup'
import forum from '@/components/forum'
import recommendation from './../components/recommendation'
import forumData from '@/mock/index.js'

export default {
  data() {
    return {
      indicatorDots: true,
      indicatorColor: '#d1e5fb',
      indicatorActiveColor: '#1b7dec',
      autoplay: true,
      interval: 2000,
      duration: 1000,
      indexImgs: [
        {
          imgUrl: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
        },
        {
          imgUrl: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
        },
      ],
      seq: 0,
      news: [],
      statusList: [
        {
          title: '关注',
        },
        {
          title: '推荐',
        },
        {
          title: '论坛',
        },
        {
          title: '客户建议',
        },
        {
          title: '项目发布',
        },
      ],
      selectClassIndex: 1,
      taglist: [
        {
          style: 1,
          id: 1,
          title: '上新',
          prods: [
            {
              pic: 'http://39.104.53.172:8888/upload/2023/05/111.png',
              prodName: '番茄脆菇沙拉',
              price: 98,
              prodid: 33,
            },
            {
              pic: 'http://39.104.53.172:8888/upload/2023/05/222.png',
              prodName: '海鲜',
              price: 198,
              prodid: 33,
            },
            {
              pic: 'http://39.104.53.172:8888/upload/2023/05/333.png',
              prodName: '古都',
              price: 899,
              prodid: 33,
            },
            {
              pic: 'http://39.104.53.172:8888/upload/2023/05/444.png',
              prodName: '水产采摘',
              price: 368,
              prodid: 33,
            },
            {
              pic: 'http://39.104.53.172:8888/upload/2023/05/555.png',
              prodName: '高级美甲',
              price: 88,
              prodid: 33,
            },
            {
              pic: 'http://39.104.53.172:8888/upload/2023/05/666.png',
              prodName: '美甲DIY',
              price: 128,
              prodid: 33,
            },
            {
              pic: 'http://39.104.53.172:8888/upload/2023/05/777.png',
              prodName: '户外运动',
              price: 299,
              prodid: 33,
            },
            {
              pic: 'http://39.104.53.172:8888/upload/2023/05/888.png',
              prodName: '艺术品鉴',
              price: 1099,
              prodid: 33,
            },
          ],
        },
      ],
      sts: 0,
      scrollTop: '',
      current: 0,
      updata: true,
      list: forumData.forumList,
    }
  },

  components: { tabs, commSearch, list, cateGroup, forum, recommendation },
  props: {},
  computed: {
    ...mapGetters(['cateAll']),
    fileUrl() {
      return this.$fileUrl
    },
  },
  created() {
    this.getAllCate()
  },
  onLoad() {},
  onReady() {},
  onShow() {},

  options: {
    styleIsolation: 'shared',
  },
  methods: {
    ...mapMutations(['setCateAll', 'setCommodityInfo']),
    changeIndex(e) {
      this.selectClassIndex = e
    },
    //获取所有一级分类
    async getAllCate() {
      try {
        let res = await mallShopTypeListByParentId(0)
        this.setCateAll(res.data)
      } catch (err) {
        console.log('异常：', err)
      }
    },
    changeStu(index) {
      this.selectClassIndex = index
    },

    // 页面滚动到指定位置指定元素固定在顶部
    onPageScroll: function (e) {
      //监听页面滚动
      // this.setData({
      //   scrollTop: e.scrollTop
      // });
    },
    toProdPage(item) {
      this.setCommodityInfo(item)

      uni.navigateTo({
        url: '/pages/subPack/merchant/commodityDetail',
      })
    },

    toCouponCenter(item) {
      uni.navigateTo({
        url: `/pages/subPack/merchant/index?cateId=${item.id}&title=${item.name}`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
