import { createNamespacedHelpers } from 'vuex';
<template>
  <view>
    <view
      class="content-box"
      v-for="item in list"
      :key="item.id"
      @tap="($event) => goDetail(item)"
    >
      <view class="content-item">
        <view class="content-item-left">
          <view class="sub-title over-ellipsis"
            ><text>{{ item.title }}</text></view
          >
          <view class="createTime">
            <text> {{ item.createTime }} </text>
          </view>
        </view>
      </view>
    </view></view
  >
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
export default {
  //import引入组件才能使用
  components: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['seTenderDetails']),
    goDetail(item) {
      this.seTenderDetails(item)

      uni.navigateTo({
        url: '/pages/article/projectDetail?id='+item.id,
      })
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
    background: #fff;
    border-radius: 20rpx;
    .content-item-left {
      .sub-title {
        font-size: 26rpx;
        color: #151515;
        line-height: 36rpx;
        margin-bottom: 20rpx;
        max-height: 72rpx;
      }
      .over-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .content-img {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        image {
          width: 200rpx;
          height: 200rpx;
          border-radius: 30rpx;
          margin-right: 20rpx;
        }
      }
      .createTime {
        color: #999;
        font-size: 22rpx;
      }
    }
    .reply {
    }
  }
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
