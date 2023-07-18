<template>
  <view>
    <view class="tab-subsection" @click="goDetail">
      <text>积分消费明细</text>
    </view>

    <view
      class="content-box"
      v-for="item in dataList"
      :key="item.id"
     
    >
      <view class="content-item">
        <view class="content-item-left">
          <view class="sub-title over-ellipsis"
            >
            <text v-if="item.creditsState==0">从{{item.mallShopVo.name}}领取</text>
          
            </view
          >
          <view class="createTime">
            <text> {{ item.createTime }} </text>
          </view>
        </view>
        <view>
          <!-- :class="{ active: item.creditsState == '-' }" -->
          <view>
            
          <text  v-if="item.creditsState==0">+</text>
          <text>{{ item.creditsValue }}</text>
        </view>
        </view>
      </view>
    </view></view
  >
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import { getTotalPage } from '@/util/util'
import {creditsDetailsPage} from "@/api/integral"
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      list: ['全部', '已使用', '已失效'],
      size: 10,
      current: 1,
      total: 0,
      dataList: [],
      more: 'more',
    }
  },
  // 计算属性
  computed: { ...mapGetters(['integralList']) },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['seTenderDetails']),
    async getPageList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let { code,data ,total} = await creditsDetailsPage({ current: 1, size: 10 })
        if (code == 0) {
          this.total = total
          let totalPage = getTotalPage(this.total, this.size)
          if (this.current == 1) {
            this.dataList = data
          } else {
            this.dataList = [...this.dataList, ...data]
          }

          if (totalPage > this.current) {
            this.more = 'more'
          } else {
            this.more = 'noMore'
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },
    sectionChange(index) {
      this.current = index
    },
    goDetail() {
      uni.navigateTo({
        url: '/pages/coupon/integralList',
      })
    },
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
    if (this.more == 'more') {
      this.current++
      this.getPageList()
    }
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  onLoad(option) {
    // this.getPageList()
  },
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期：创建之前
  beforeMount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>
<style>
page {
  background: #fff;
}
</style>
<style scoped lang="scss">
.tab-subsection {
  background: #fff;
  padding: 20rpx;
}
.content-box {
  position: relative;
  .content-item {
    padding: 20rpx;
    margin: 0rpx 20rpx 0 20rpx;

    display: flex;

    justify-content: space-between;
    position: relative;
    border-bottom: 1px solid #f1f1f1;
    background: #fff;
    border-radius: 20rpx;
    .active {
      color: #fd0a0a;
    }
    .content-item-left {
      .sub-title {
        font-size: 26rpx;
        color: #151515;
        line-height: 36rpx;

        max-height: 72rpx;
      }
      .over-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .content-img {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        image {
          width: 200rpx;
          height: 200rpx;
          border-radius: 30rpx;
          margin-right: 20rpx;
        }
      }
      .createTime {
        color: #999;
        font-size: 22rpx;
      }
    }
    .reply {
    }
  }
}
.content-box::before {
  display: block;
  position: absolute;
  border-top: 1px solid #eee;
  width: 100%;
  bottom: 0;
  left: 0;
}
.content {
  padding-bottom: 20rpx;
}
</style>
