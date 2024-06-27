<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-02 16:23:27
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-31 10:33:23
 * @FilePath: \mall-applet\pages\subPack\forum\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <defNav title="我的论坛"></defNav>
    <view class="tab-subsection">
      <view
        class="tab-subsection-item"
        v-for="(item, index) in list"
        :key="item.id"
        :class="{ active: index == currentIndex }"
        @click="sectionChange(index)"
      >
        {{ item.name }}
      </view>

     
    </view>
    <nodata
      v-if="noDate"
      :config="{
        content: '暂无论坛数据',
        imgUrl: defaultImg,
      }"
    ></nodata>
    <template v-else>
      <forum
        :list="forumList"
        :current="currentIndex"
        @getPage="getPageList"
      ></forum>
      <noMore v-if="more == 'noMore' && current > 1"></noMore
    ></template>
  </view>
</template>

<script>
import forum from '@/components/forum'
import { ForumPage } from '@/api/index'
import { getTotalPage } from '@/util/util'
export default {
  //import引入组件才能使用
  components: { forum },
  props: {},
  data() {
    return {
      // 0是草稿，10是待审核，20审核不通过，30审核通过
      list: [
        {
          name: '已审核',
          id: 30,
        },
        {
          name: '待审核',
          id: 10,
        },
        // {
        //   name: '未通过',
        //   id: 20,
        // },
        // {
        //   name: '草稿',
        //   id: 0,
        // },
      ],

      currentIndex: 0,
      forumList: [],
      current: 1,
      total: 0,
      more: 'noMore',
      size: 10, noDate: false,
    }
  },
  // 计算属性
  computed: { defaultImg() {
      return this.$fileUrl + '/sysFile/img_zanwu_tuijian.png'
    },},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    sectionChange(index) {
      this.currentIndex = index
      this.current = 1
      this.more = 'more'
      this.forumList = []
      this.getPageList()
    },
    async getPageList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await ForumPage({
          current: this.current,
          size: this.size,
          status: this.list[this.currentIndex].id,
          type: 'user',
        })
        uni.hideLoading()

        this.total = res.total
        let totalPage = getTotalPage(this.total, this.size)
        if (this.current == 1) {
          this.forumList = res.data
          this.noDate = res.total == 0
        } else {
          this.forumList = [...this.forumList, ...res.data]
        }

        if (totalPage > this.current) {
          this.more = 'more'
        } else {
          this.more = 'noMore'
        }
      } catch (e) {
      } finally {
        uni.hideLoading()
      }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  onShow() {
    this.getPageList()
  },
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
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
  beforeCreate() {}, //生命周期：创建之前
  beforeMount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>
<style scoped lang="scss">
.tab-subsection {
  background: #fff;
  padding: 30rpx;
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #888888;
  line-height: 42rpx;
  display: flex;
  align-items: center;
  .tab-subsection-item {
    margin-right: 70rpx;
    position: relative;
  }
  .active {
    color: #3b6dbb;
  }
  .tab-subsection-item:nth-child(n + 2)::after {
    position: absolute;
    content: '';
    width: 1px;
    height: 28rpx;
    background: #888888;
    left: -36rpx;
    top: 10rpx;
  }
}
</style>
