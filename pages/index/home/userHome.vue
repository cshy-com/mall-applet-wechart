<template>
  <!--index.wxml-->
  <view class="container">
    <view class="container-top">
      <view class="header-top"><text>私人银行服务平台</text></view>
      <commSearch :placeholder="'输入关键字搜索'"></commSearch>
      <view class="content">
        <view class="swiper">
          <u-swiper
            :list="list3"
            indicator
            indicatorMode="line"
            circular
            height="200"
          ></u-swiper>
        </view>
        <cateGroup
          :isSwiper="true"
          :cateList="cateAll"
          @CateEvent="toCouponCenter"
        ></cateGroup>
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
        <view class="updata" v-if="selectClassIndex == 0">
          <block>
            <!-- 商城热卖 -->
            <view>
              <list :prods="prods" @eventParent="toProdPage"></list>
            </view>
          </block>
        </view>
        <view v-if="selectClassIndex == 1">
          <forum :list="list"></forum>
        </view>
        <view v-if="selectClassIndex == 2">
          <recommendation></recommendation>
        </view>
        <view v-if="selectClassIndex == 3" class="project-box">
          <projectList :list="projectList"></projectList>
          <view class="btn">
            <button @tap="goProjectList">查看更多</button>
          </view>
        </view>
      </view>
    </view>
    <tab-bar :userIdentity="1" :selected="0" ></tab-bar>
  </view>
</template>

<script>
import tabs from '@/components/tabs.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import commSearch from '@/components/commSearch.vue'
import list from './../components/list.vue'
import { mallShopTypeListByParentId, getCommodityPage } from '@/api/shop.js'
import cateGroup from '@/components/cateGroup'
import forum from '@/components/forum'
import recommendation from './../components/recommendation'
import forumData from '@/mock/index.js'
import projectList from '@/components/projectList'
import tabBar from "@/components/tab-bar.vue"
export default {
  data() {
    return {
      indicatorDots: true,
      indicatorColor: '#d1e5fb',
      indicatorActiveColor: '#1b7dec',
      autoplay: true,
      interval: 2000,
      duration: 1000,
      list3: [
        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
      ],
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
          title: '关注/推荐',
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
      current: 1,
      size: 10,
      total: 0,
      updata: true,
      list: forumData.forumList,
      prods: [],
    }
  },

  components: {
    tabs,
    commSearch,
    list,
    cateGroup,
    forum,
    recommendation,
    projectList,tabBar
  },
  props: {},
  computed: {
    ...mapGetters(['cateAll', 'projectList']),
    fileUrl() {
      return this.$fileUrl
    },
  },
  created() {
    this.getAllCate()
    this.getCommodityRecommend()
  },
  onLoad() {},
  onReady() {},
  onShow() {},

  options: {
    styleIsolation: 'shared',
  },
  onPullDownRefresh(){
 this.current=0
    this.getAllCate()
    this.getCommodityRecommend()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  onReachBottom: function () {
    this.current++
    this.getCommodityRecommend()
  },
  methods: {
    ...mapMutations(['setCateAll', 'setCommodityInfo']),
    goProjectList() {
      uni.navigateTo({
        url: '/pages/article/projectList',
      })
    },
    changeIndex(e) {
      this.selectClassIndex = e
    },
    async getCommodityRecommend() {
      try {
        let res = await getCommodityPage({
          current: this.current,
          size: this.size,
        })
        this.total = res.total

        if (this.current == 1) {
          this.prods = res.data
        } else {
          this.prods = [...this.prods, ...res.data]
        }
      } catch (e) {
        console.log(e)
      }
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
        url: `/pages/mall/commodity/commodityDetail?Id=${item.id}&shopId=${item.shopId}`,
      })
    },

    toCouponCenter(item) {
      uni.navigateTo({
        url: `/pages/mall/store/index?cateId=${item.id}&title=${item.name}`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import './index.scss';
.swiper {
  height: 200rpx;
  margin: 20rpx;
}
.project-box {
  padding-bottom: 40rpx;
  .btn {
    width: 600rpx;
    margin: 0 auto;
    margin-top: 40rpx;
  }
}
</style>
