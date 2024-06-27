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
          <view class="sub-title  font-30  over-ellipsis-2"
            ><text>{{ item.title }}</text></view
          >
          <view class="content-item-footer flex-center">
            <image
              :src="defTime"
              :lazy-load="true"
              :lazy-load-margin="0"
              :mode="'aspectFill'"
            />
            <text class="createTime font-26"> {{ item.createTime }} </text>
          </view>
        </view>
        <view class="content-item-right bachground-def-img">
          <image v-if="item.mainUrl&&item.mainUrl.length>0"
            class=""
            :src="item.mainUrl[0]||defImg"
            :lazy-load="true"
            :lazy-load-margin="0"
            :mode="'aspectFill'"
          >
          </image>
          <image v-else class=""
            :src="defImg"
            :lazy-load="true"
            :lazy-load-margin="0"
            :mode="'aspectFill'"></image>
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
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['seTenderDetails']),
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
  .content-item {
    margin-bottom: 12rpx;

    display: flex;

    justify-content: space-between;
    position: relative;
    padding: 30rpx;

    background: #fff;
    margin: 0 12rpx 12rpx 12rpx;
    border-radius: 14rpx;
    .content-item-left {
      width: 496rpx;
      margin-right: 30rpx;
      .sub-title {
       
        color: #333333;
        line-height: 42rpx;
        margin-bottom: 20rpx;
        height: 84rpx;
        margin-bottom: 19rpx;
      }
   
     
      .content-item-footer {
        
        .createTime {
         
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
      // background: rgba(237, 237, 237, 0.6);
      border-radius: 14rpx;
      position: relative;
    
      background-color: #f5f5f5;
      position: relative;
      z-index: 99;
      image {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 999;
        will-change: transform;
        background-color: #f5f5f5;
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
