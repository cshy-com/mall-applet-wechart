<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-30 09:27:05
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-31 09:06:43
 * @FilePath: \mall-applet\pages\index\collection\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view
      class="nav"
      :style="{
        height: navInfo.totalHeight + 'px',
        'line-height': navInfo.totalHeight + navInfo.navigatorHeight + 'px',
      }"
    >
      <text>我的收藏</text>
    </view>
    <view v-if="showS" style="position: relative; z-index: 99">
      <image
        style="width: 100vw; height: 1624rpx"
        class=""
        :src="require('@/static/img/skeleton-star.png')"
        mode="aspectFill"
        lazy-load="false"
        binderror=""
        bindload=""
      >
      </image>
    </view>
    <view class="content">
      <view class="pop-box" v-if="['', null, undefined].includes(this.userInfo)">
        <button @click="goLogin">去登录</button>
      </view>
      <template v-else>
      <nodata
        v-if="noDate"
        :config="{
          content: '暂无店铺数据',
          imgUrl: defaultImg,
        }"
      ></nodata>
      <view v-else>
        <shopRow :list="shopList" :isShowPid="true"> </shopRow>
        <noMore v-if="more == 'noMore' && current > 1"></noMore>
      </view>
    </template>
      <tab-bar   :selected="1"></tab-bar>
    </view>
  </view>
</template>

<script>
import { mallShopCollectList } from '@/api/shop.js'
import shopRow from '@/components/shopRow.vue'
import { getTotalPage } from '@/util/util'
import tabBar from './../components/tab-bar.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('comm')
export default {
  components: { shopRow, tabBar },
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
      noDate: false,
      config: {
        color: '#ffffff',

        back: false,
        centerSlot: true,
        backgroundColor: [1, '#3b6dbb'],
        statusBarFontColor: '#ffffff',
        statusBarBackground: '#3b6dbb',
      },
      showS: true,
    }
  },
  computed: {
    ...mapGetters(['navInfo']),
    defaultImg() {
      return this.$fileUrl + '/sysFile/img_zanwu_tuijian.png'
    },
    userInfo() {
      return this.$store.state.user.userInfo
    },
  },
  created() {},
  onLoad() {},
  onShow() {
    if (['', null, undefined].includes(this.userInfo)) {
      this.showS=false
      return
    }
    uni.showLoading({
      title: '加载中',
    })

    this.getPageList()
    uni.hideLoading()
  },
  onPullDownRefresh() {
    if (['', null, undefined].includes(this.userInfo)) {
      return
    }
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
    goLogin(){
uni.navigateTo({url:'/pages/public/login'})
    },
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
        this.showS = false
      }
    },
  },
}
</script>

<style scoped lang="scss">
.nav {
  height: 190rpx;
  background: #3b6dbb;
  text-align: center;

  font-size: 34rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 250rpx;
}
.content {
  margin-top: 20rpx;
  padding-bottom: 30rpx;
}

.pop-box {
  width: 100%;
  
  
    display: flex;
    justify-content: space-between;
    align-items: center;
   
    margin-top: 500rpx;
 
    button {
      width: 230rpx;
      height: 78rpx;
      background: #3b6dbb;
      border-radius: 14rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 78rpx;
    }
     
    button:after{
      border:none
    }
  }
 
</style>
