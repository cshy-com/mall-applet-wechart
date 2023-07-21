<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-07-20 16:37:34
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-20 16:41:26
 * @FilePath: \mall-admind:\work\mall-applet\pages\mall\comment\comment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <comment :commentData="commentData"></comment>
  </view>
</template>

<script>
import comment from './../components/comment.vue'
import { shopCommentsPage } from '@/api/shop.js'
import { getTotalPage } from '@/util/util'
export default {
  //import引入组件才能使用
  components: { comment },
  props: {},
  data() {
    return {
      commentData: [],
      shopId: '',
      more: 'noMore',
      size: 10,
      current: 1,
      total: 0,
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  onPullDownRefresh() {
    this.current = 1
    this.getPageList()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  }, // 上拉触底事件
  onReachBottom: function () {
    if (this.more == 'more') {
      this.current++
      this.getPageList()
    }
  },
  onLoad(option) {
    this.shopId = option.shopId

    this.getPageList()
  },

  // 方法集合
  methods: {
    async getPageList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await shopCommentsPage({
          current: this.current,
          size: this.size,
          shopId: this.shopId,
        })
        this.total = res.total
        let totalPage = getTotalPage(this.total, this.size)
        if (this.current == 1) {
          this.commentData = res.data
        } else {
          this.commentData = [...this.commentData, ...res.data]
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
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
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
<style scoped></style>
