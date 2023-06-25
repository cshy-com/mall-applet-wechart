<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-02 16:23:27
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-25 14:37:59
 * @FilePath: \mall-applet\pages\subPack\forum\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="tab-subsection">
      <u-subsection
        :list="list"
        :current="current"
        :activeColor="'#3b6dbb'"
        mode="subsection"
        fontSize="28"
        @change="sectionChange"
      ></u-subsection>
    </view>
    <forum :list="forumList" :current="current"></forum>
  </view>
</template>

<script>
import forum from '@/components/forum'
import forumData from '@/mock/index.js'
export default {
  //import引入组件才能使用
  components: { forum },
  props: {},
  data() {
    return {
      list: ['已审核', '待审核', '未通过','草稿'],

      current: 0,
      forumList: forumData.forumList,
      current:1,
      total:0,
      more:'noMore',
      size:10,
      
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    sectionChange(index) {
      this.current = index
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  onPullDownRefresh() {
 
    // this.current = 1
    // this.getPageList()
    // setTimeout(function () {
    //   uni.stopPullDownRefresh()
    // }, 1000)
  },
  // 上拉触底事件
  onReachBottom: function () {
    // if (this.more == 'more') {
    // this.current++
    // this.getPageList()
    // }
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
</style>
