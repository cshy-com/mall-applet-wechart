<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-07 11:07:33
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-20 14:18:39
 * @FilePath: \mall-applet\pages\article\projectList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="content">
    <view class="search">
      <u-search
        placeholder="请输入"
        v-model="keyword"
        @search="searchList"
      ></u-search>
    </view>
    <view class="tab-subsection">
      <!-- <u-subsection
        :list="list"
        :current="current"
        :activeColor="'#3b6dbb'"
        mode="subsection"
        fontSize="28"
        @change="sectionChange"
      ></u-subsection> -->
      <u-tabs
        lineColor="#3b6dbb"
        :activeStyle="{
          color: '#3b6dbb',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
        }"
        lineHeight="5"
        lineWidth="45"
        :scrollable="true"
        :current="activeCurrent"
        :list="typeList"
        
        @click="sectionChange"
      ></u-tabs>
    </view>
    <u-skeleton
      rows="2"
      :loading="loading"
      :title="false"
      :rows="10"
      :rowsWidth="[
        '200%',
        '200%',
        '200%',
        '200%',
        '200%',
        '200%',
        '200%',
        '200%',
      ]"
      :rowsHeight="[
        '80px',
        '80px',
        '80px',
        '80px',
        '80px',
        '80px',
        '80px',
        '80px',
        '80px',
        '80px',
      ]"
      :animate="true"
    >
      <projectList :list="list"></projectList>
    </u-skeleton>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import projectList from '@/components/projectList'
import { projectPage } from '@/api/index'
import { getTotalPage } from '@/util/util'
import { systemDictList } from '@/api/index'
export default {
  //import引入组件才能使用
  components: { projectList },
  props: {},
  data() {
    return {
      list: [
        {
          name: '资审公告',
          id: null,
        },
        {
          name: '招标公告',
          id: null,
        },
        {
          name: '候选人公示',
          id: null,
        },
        {
          name: '结果公示',
          id: null,
        },
        {
          name: '更正公示',
          id: null,
        },
      ],
      activeCurrent: 0,
      keyword: '',
      loading: true,
      more: 'noMore',
      size: 10,
      current: 1,
      total: 0,
      list: [],
      typeList: [{
        name:'全部',
        id:null
      }],
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  onLoad: function () {
    this.getTypeList()
    this.getPageList()
  },

  // 方法集合
  methods: {
    async getTypeList() {
      let res = await systemDictList({
        dictType: 'project_categories',
      })
      res.rows.forEach((val) => {
        this.typeList.push({
          name: val.dictLabel,
          id: val.dictValue,
        })
      })
      
    },
    searchList() {
      this.current = 1
      this.list = []
      this.getPageList()
    },
    sectionChange(e) {
      this.activeCurrent = e.index
      this.current = 1
      this.list = []
      this.getPageList()
    },
    async getPageList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await projectPage({
          current: this.current,
          size: this.size,
          categoryKey: this.typeList[this.activeCurrent].id,
          condition: this.keyword,
        })
        this.total = res.total
        let totalPage = getTotalPage(this.total, this.size)
        if (this.current == 1) {
          this.list = res.data
        } else {
          this.list = [...this.list, ...res.data]
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
  created() {
    uni.$u.sleep(2000).then(() => {
      this.loading = false
    })
  },
  onPageScroll(e) {
    this.$refs.navs.scroll(e)
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
  width: 96%;
  margin: 0 auto;
}
.search {
  background: #fff;
  padding: 20rpx;
}
/deep/ .u-tabs__wrapper__nav__line {
  left: 24rpx;
}
</style>
