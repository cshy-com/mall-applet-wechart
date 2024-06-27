<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-07-27 10:20:46
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-30 11:04:25
 * @FilePath: \mall-admind:\work\mall-applet\pages\article\recommendationList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="content">
    <defNav title="我的建议"></defNav>
    <nodata
      v-if="noDate"
      :config="{
        content: '暂无建议数据',
        imgUrl: defaultImg,
      }"
    ></nodata>
    <template v-else>
      <recommenList :opinionList="opinionList"></recommenList>
      <noMore v-if="more == 'noMore' && current > 1"></noMore>
    </template>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import recommenList from '@/components/recommenList'
import { advicesList } from '@/api/index'
import { getTotalPage } from '@/util/util'
export default {
  //import引入组件才能使用
  components: { recommenList },
  props: {},
  data() {
    return {
      opinionList: [],
      more: 'noMore',
      size: 10,
      current: 1,
      total: 0,
      noDate: false,
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
  onLoad: function () {
    this.getPageList()
  },

  // 方法集合
  methods: {
    ...mapMutations(['setOpinionInfo']),
    async getPageList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await advicesList({
          current: this.current,
          size: this.size,
        })
        this.total = res.total
        let totalPage = getTotalPage(this.total, this.size)
        if (this.current == 1) {
          this.opinionList = res.data
          this.noDate = res.data.total == 0
        } else {
          this.opinionList = [...this.opinionList, ...res.data]
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
.content-box {
  position: relative;
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
