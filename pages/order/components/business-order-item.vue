<template>
  <view>
    <view class="prod-item">
      <slot name="state"></slot>
      <slot name="decoration"></slot>
     
      <!-- 商品列表 -->
      <!-- 一个订单单个商品的显示 -->
      <block>
        <view>
          <view
            class="item-cont"
            @tap="$emit('toOrderDetailPage')"
            :data-ordernum="orderInfo.id"
          >
            <view class="prod-info">
              <view class="prodname">
                <view class="prod-pic">
                  <image :src="orderInfo.avatar || defaultAvatar"></image>
                </view>
                <view class="name"> {{ orderInfo.nickName }}</view>
              </view>
              <view class="prod-info-cont"
                >到店人数：{{ orderInfo.numberOfPeople }}人</view
              >
              <view class="prod-info-cont">
                到店时间：{{
                  $u.timeFormat(orderInfo.estimatedTime, 'yyyy-mm-dd hh:MM')
                }}
              </view>
              <view class="prod-info-cont">
                专人陪同：{{ orderInfo.needCompanion == 1 ? '需要' : '不需要' }}
              </view>
            </view>
          </view>
        </view>
      </block>
      <slot name="footer"></slot>
      <!-- end 商品列表 -->
    </view>
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {
    orderInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  // 计算属性
  computed: {
    defaultAvatar() {
      return `${this.$fileUrl}/sysFile/avatar.png`
    },
    
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
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
.prod-item {
  margin-top: 15rpx;
  margin: 25rpx 30rpx 0 30rpx;
  font-size: 26rpx;
  border-radius: 14rpx;
  .order-num {
    background-color: #fff;
    padding: 26rpx 30rpx 10rpx 30rpx;
    display: flex;
    justify-content: space-between;
    font-size: 30rpx;
    color: #888888;
    line-height: 42rpx;
    border-radius: 14rpx 14rpx 0 0;
  }
  

  .item-cont {
    display: flex;
    padding: 15rpx 30rpx 0 30rpx;
    padding-bottom: 30rpx;
    background-color: #fff;
    .prod-pic {
      font-size: 0;
      display: inline-block;
      width: 58rpx;
      height: 58rpx;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 10rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .prod-info {
    width: 100%;
    position: relative;
    height: auto;
    -webkit-flex: 1;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    flex: 1;
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #888888;
    line-height: 37rpx;
    .prodname {
      display: flex;
      align-items: center;
      .name {
        font-size: 24rpx;
        line-height: 36rpx;
        max-height: 86rpx;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        word-break: break-all;
      }
    }
    .prod-info-cont {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      word-break: break-all;
      margin-bottom: 6rpx;
    }
  }
}
</style>
