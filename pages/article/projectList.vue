<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-07 11:07:33
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-11 11:19:44
 * @FilePath: \mall-applet\pages\article\projectList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <defNav title="项目列表"></defNav>
    <view class="content">
      <view class="search">
        <!-- <u-search
        placeholder="请输入"
        v-model="keyword"
        @search="searchList"
      ></u-search> -->
        <search @confirm="searchList"></search>
      </view>
      <view class="tab-subsection">
        <u-tabs
          lineColor="none"
          :activeStyle="{
            color: '#3B6DBB',
          }"
          lineHeight="5"
          lineWidth="45"
          :scrollable="true"
          :current="activeCurrent"
          :list="typeList"
          itemStyle="color:#888888; padding-left: 24rpx; padding-right: height: 42rpx; "
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
        <nodata
          v-if="noProjectList"
          :config="{
            height: '900rpx',
            content: '暂无数据',
            imgUrl: defImg,
          }"
        ></nodata>
        <template v-else>
          <projectList :list="list"></projectList>
          <noMore v-if="more == 'noMore' && current > 1"></noMore>
        </template>
      </u-skeleton> </view
  ></view>
</template>

<script>
import search from '@/components/search.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import projectList from '@/components/projectList'
import { projectPage } from '@/api/index'
import { getTotalPage } from '@/util/util'
import { systemDictList } from '@/api/index'
export default {
  //import引入组件才能使用
  components: { projectList, search },
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
      typeList: [
        {
          name: '全部',
          id: null,
        },
      ],
      noProjectList: false,
    }
  },
  // 计算属性
  computed: {
    defImg() {
      return this.$fileUrl + '/sysFile/img_zanwuxiangmu.png'
    },
  },
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
    searchList(e) {
      this.keyword = e
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
          this.noProjectList = this.total == 0
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
  margin-bottom: 12rpx;
}
.search {
  background: #fff;
  padding: 20rpx;
}
/deep/ .u-tabs__wrapper__nav__line {
  left: 24rpx;
}
/deep/ .u-tabs__wrapper__nav__item {
  position: relative;
}

/deep/ .u-tabs__wrapper__nav__item:nth-child(n + 2) :after {
  content: '';
  width: 1px;
  height: 32rpx;
  position: absolute;
  right: 20rpx;
  top: 11rpx;
  left: -2rpx;
  background: #888888;
}
</style>
