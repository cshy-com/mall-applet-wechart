<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-02 16:23:27
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-21 10:40:02
 * @FilePath: \mall-applet\pages\subPack\forum\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="btn">
    <button @click="goForumAdd">发布论坛</button>
  </view>
    <forum
      :list="forumList"
      :current="currentIndex"
      @getPage="getPageList"
    ></forum>
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
      currentIndex: 0,
      forumList: [],
      current: 1,
      total: 0,
      more: 'noMore',
      size: 10,
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    goForumAdd() {
      uni.navigateTo({
        url: '/pages/article/forumAdd',
      })
    },
    async getPageList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await ForumPage({
          current: this.current,
          size: this.size,

          type: 'comm',
        })
        uni.hideLoading()

        this.total = res.total
        let totalPage = getTotalPage(this.total, this.size)
        if (this.current == 1) {
          this.forumList = res.data
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
  padding: 20rpx;
}
.btn{
  width: 90%;
  margin: auto;
  margin-top: 40rpx;
  
  button {
    height: 85rpx;
    background: $Gradual-color;
    border-radius: 10rpx;
    font-size: 30rpx;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    line-height: 85rpx;
  }
}
</style>
