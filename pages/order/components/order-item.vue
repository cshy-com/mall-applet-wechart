<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-07-07 09:46:51
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-20 15:59:27
 * @FilePath: \mall-admind:\work\mall-applet\pages\order\components\order-item.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="prod-item">
      <view class="order-num">
        <text>订单编号：{{ orderInfo.id }}</text>
        <slot name="state"></slot>

       
      </view>
      <block>
        <view @click="$emit('toOrderDetailPage')">
          <view class="item-cont" :data-ordernum="orderInfo.id">
            <view class="prod-pic">
              <image :src="orderInfo.mainImage"></image>
            </view>
            <view class="prod-info">
              <view class="prodname">
                {{ orderInfo.shopName }}
              </view>
              <view class="prod-info-cont"
                >到店人数：{{ orderInfo.numberOfPeople }}</view
              >
              <view class="price-nums">
                <text class="prodcount"
                  >到店时间：{{ orderInfo.estimatedTime }}</text
                >
              </view>
              <view class="price-nums">
                <text class="prodcount"
                  >是否需要专人到场：{{ orderInfo.needCompanion==1?'是':'否' }}</text
                >
              </view>
            </view>
          </view>
        </view>
      </block>
      <slot name="footer"></slot>
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
      defualt: () => {},
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
    background-color: #fff;
    margin-top: 15rpx;
    font-size: 28rpx;
}

.prod-item .order-num {
    padding: 20rpx 30rpx;
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
}


.prod-item .item-cont {
    display: flex;
    padding: 0 30rpx;
    padding-bottom: 30rpx;
}

.prod-item .item-cont .prod-pic {
    font-size: 0;
    display: inline-block;
    width: 160rpx;
    height: 160rpx;
    overflow: hidden;
    background: #fff;
    margin-right: 16rpx;
}

.prod-item .item-cont .prod-pic image {
    width: 100%;
    height: 100%;
}

.prod-item .item-cont .prod-info {
    margin-left: 10rpx;
    font-size: 28rpx;
    width: 100%;
    position: relative;
    height: auto;
    -webkit-flex: 1;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    flex: 1;
}

.prod-item .item-cont .prod-info .prodname {
    font-size: 28rpx;
    line-height: 36rpx;
    max-height: 86rpx;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    word-break: break-all;
}

.prod-item .item-cont .prod-info .prod-info-cont {
    color: #999;
    line-height: 40rpx;
    margin-top: 10rpx;
    font-size: 22rpx;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    word-break: break-all;
}
</style>
