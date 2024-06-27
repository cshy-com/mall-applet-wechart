<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-08-29 11:41:12
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-29 13:53:07
 * @FilePath: \mall-admind:\work\mall-applet\pages\article\forumCommentsPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="page">
    <defNav title="论坛评论"></defNav>
    <view class="empty" v-if="!list || list.length == 0">
      <nodata
        v-if="noDate"
        :config="{
          content: '暂无数据',
          imgUrl: defaultImg,
        }"
      ></nodata>
    </view>
    <template v-else>
      <comments :list="list"></comments>
      <noMore v-if="more == 'noMore' && current > 1"></noMore>
    </template>
  </view>
</template>

<script>
import comments from './components/comments'
import { getTotalPage } from '@/util/util'
import { mallForumCommentsPage } from '@/api/index'

export default {
  //import引入组件才能使用
  components: { comments },
  props: {},
  data() {
    return {
      id: null,
      current: 1,
      size: 10,
      more: 'more',
      noDate: false,
      list: [],
    }
  },
  // 计算属性
  computed: {
    defaultImg() {
      return this.$fileUrl + '/sysFile/img_zanwu_tuijian.png'
    },
  },
  // 监听data中的数据变化
  watch: {},
  onPullDownRefresh() {
    this.current = 1
    this.getCommentsPage()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  // 上拉触底事件
  onReachBottom: function () {
    if (this.more == 'more') {
      this.current++
      this.getCommentsPage()
    }
  },
  // 方法集合
  methods: {
    async getCommentsPage() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let { code, data, total } = await mallForumCommentsPage({
          current: this.current,
          size: this.size,
          forumId: this.id,
        })
        if (code == 0) {
          this.total = total
          let totalPage = getTotalPage(this.total, this.size)
          if (this.current == 1) {
            this.list = data
            this.noDate = total == 0
          } else {
            this.list = [...this.list, ...data]
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
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  onLoad(options) {
    if (options.id) {
      this.id=options.id
      this.getCommentsPage()
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
<style>
page {
  background: #fff;
}
</style>
<style scoped>
.page{
  margin-top: 30rpx;
}
</style>
