<template>
  <view class="content">  <defNav title="项目详情" ></defNav>
    <view class="content-box">
      <view class="content-item">
        <view class="sub-title"
          ><text>{{ dataInfo.title }}</text></view
        >
        <view class="createTime">
          {{ dataInfo.createTime }}
        </view>
        <view class="content">
          <rich-text :nodes="dataInfo.content"></rich-text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import { projectObj } from '@/api/index'
import {formatRichText } from '@/util/util'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      projectId: null,
      dataInfo: {},
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['tenderDetails']),
  },
  // 监听data中的数据变化
  watch: {},
  onLoad(option) {
    this.projectId = option.id
    this.getDetail()
  },

  // 方法集合
  methods: {
    async getDetail() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let {data} = await projectObj(this.projectId)
        this.dataInfo=data
        this.dataInfo.content = formatRichText(data.content)

     
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
<style>
page {
  background: #fff;
}
</style>
<style scoped lang="scss">
.content-box {
  position: relative;
  .content-item {
    padding: 20rpx;
    margin: 20rpx 20rpx 0 20rpx;

    display: flex;

    justify-content: space-between;
    position: relative;
    flex-direction: column;

    border-radius: 20rpx;

    .sub-title {
      font-size: 26rpx;
      color: #151515;
      line-height: 36rpx;
      margin-bottom: 20rpx;
    }

    .createTime {
      color: #999;
      font-size: 22rpx;
    }
    .content {
      color: #151515;
      text-indent: 50rpx;
      font-size: 24rpx;
      color: #666;
    }
  }
}
</style>
