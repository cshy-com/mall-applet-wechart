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
      <tabs :list="statusList" :selectIndex="selectClassIndex"></tabs>
      <view class="home-content">
        <view class="updata" v-if="updata">
          <block v-for="(item, index) in taglist" :key="index">
            <!-- 商城热卖 -->
            <view v-if="item.style == 1">
              <list :prods="item.prods"></list>
            </view>
          </block>
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
import cateGroup from "@/components/cateGroup"
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
      selectClassIndex: 0,
      taglist: [
        {
          style: 1,
          id: 1,
          title: '上新',
          prods: [
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [102],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [102],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [102],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [102],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [102],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [102],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
          ],
        },
      ],
      sts: 0,
      scrollTop: '',
      current: 0,
      updata: true,
    }
  },

  components: { tabs, commSearch, list,cateGroup },
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
    ...mapMutations(['setCateAll']),
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
    toProdPage(id) {
      var prodid = id
      if (prodid) {
        uni.navigateTo({
          url: '/pages/subPack/merchant/commodityDetail?prodid=' + prodid,
        })
      }
    },

    toCouponCenter(item) {
      uni.navigateTo({
        url: '/pages/subPack/merchant/index?cateId=' + item.id,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
