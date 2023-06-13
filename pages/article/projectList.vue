<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-07 11:07:33
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-08 17:28:50
 * @FilePath: \mall-applet\pages\article\projectList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="content">
    <view class="search">
      <u-search placeholder="请输入" v-model="keyword"></u-search>
    </view>
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

    <projectList :list="projectList"></projectList>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import projectList from '@/components/projectList'
export default {
  //import引入组件才能使用
  components: { projectList },
  props: {},
  data() {
    return {
      list: ['资审公告', '招标公告', '候选人公示', '结果公示', '更正公示'],
      current: 1,
      keyword: '',
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['projectList']),
  },
  // 监听data中的数据变化
  watch: {},
  onLoad: function () {},

  // 方法集合
  methods: {
    ...mapMutations(['setOpinionInfo']),
    sectionChange(index) {
      this.current = index
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  onShow() {},
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
<style scoped lang="scss">
.tab-subsection {
  background: #fff;
  padding: 20rpx;
}
.search {
  background: #fff;
  padding: 20rpx;
}
</style>
