<template>
  <view>
    <view
      class="content-box"
      v-for="item in list"
      :key="item.id"
      @tap="($event) => goDetail(item)"
    >
      <view class="content-item">
        <view class="flex-between">
          <view class="content-item-left">
            <view class="sub-title over-ellipsis"
              ><text>{{ item.title }}</text></view
            >
            <view class="content-item-footer">
              <image
                :src="defTime"
                :lazy-load="true"
                :lazy-load-margin="0"
                :mode="'aspectFill'"
              />
              <text class="createTime"> {{ item.createTime }} </text>
            </view>
          </view>
          <view class="content-item-right">
            <image
              v-if="item.mainUrl && item.mainUrl.length > 0"
              class=""
              :src="item.mainUrl[0] || defImg"
              :lazy-load="true"
              :lazy-load-margin="0"
              :mode="'aspectFill'"
            >
            </image>
            <image
              v-else
              class=""
              :src="defImg"
              :lazy-load="true"
              :lazy-load-margin="0"
              :mode="'aspectFill'"
            ></image>
          </view>
        </view>
        <view class="line"></view>
        <view class="more-btn" @tap="goProjectList">
          <view class="more-btn-item">
            <text>查看更多</text>
            <image
              :src="defRight"
              :lazy-load="true"
              :lazy-load-margin="0"
              :mode="'aspectFill'"
            ></image
          ></view>
        </view>
      </view> </view
  ></view>
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
  computed: {
    defTime() {
      return this.$fileUrl + '/sysFile/ic_shijian.png'
    },
    defImg() {
      return this.$fileUrl + '/sysFile/img_default.png'
    },
    defRight() {
      return this.$fileUrl + '/sysFile/ic_arrow_gengduo.png'
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['seTenderDetails']),
    goProjectList() {
      uni.navigateTo({
        url: '/pages/article/projectList',
      })
    },
    goDetail(item) {
      this.seTenderDetails(item)

      uni.navigateTo({
        url: '/pages/article/projectDetail?id=' + item.id,
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
  margin-bottom: 60rpx;

  .content-item {
    .flex-between {
      display: flex;
      justify-content: space-between;
    }

    margin-bottom: 12rpx;

    position: relative;
    padding: 30rpx;

    background: #fff;
    margin: 0 12rpx 0rpx 12rpx;
    border-radius: 14rpx;
    padding-bottom: 0;
    .content-item-left {
      width: 496rpx;
      margin-right: 30rpx;
      .sub-title {
        font-size: 30rpx;
        color: #333333;
        line-height: 36rpx;
        margin-bottom: 20rpx;
        height: 84rpx;
        margin-bottom: 19rpx;
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
      .content-item-footer {
        display: flex;
        align-items: center;
        .createTime {
          font-size: 26rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #c0c0c0;
          line-height: 37rpx;
          margin-left: 13rpx;
        }
        image {
          width: 33rpx;
          height: 33rpx;
        }
      }
    }
    .content-item-right {
      width: 140rpx;
      height: 140rpx;
      background: rgba(237, 237, 237, 0.6);
      border-radius: 14rpx;
      image {
        width: 100%;
        height: 100%;
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
.line {
  width: 662rpx;
  height: 1rpx;
  border-top: 2rpx solid #eeeeee;
  margin-top: 31rpx;
}
.more-btn {
  height: 87rpx;
  margin: 0 auto;
  margin-left: 12rpx;

  display: flex;
  align-items: center;
  justify-content: center;

  .more-btn-item {
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4575bf;
    line-height: 40rpx;
    image {
      width: 12rpx;
      height: 16rpx;
      margin-left: 12rpx;
    }
  }
}
</style>
