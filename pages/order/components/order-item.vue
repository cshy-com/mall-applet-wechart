<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-07-07 09:46:51
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-11 15:10:55
 * @FilePath: \mall-admind:\work\mall-applet\pages\order\components\order-item.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="prod-item">
      <slot name="state"></slot>
      <slot name="decoration"></slot>
     
      <block>
        <view @click="$emit('toOrderDetailPage')">
          <view class="item-cont" :data-ordernum="orderInfo.id">
            
            <view class="prod-info">
              <view class="prodname" @click.stop="goShop()">
                <text>
                {{ orderInfo.shopName }}</text>
                <image
                  :lazy-load="true"
                  :lazy-load-margin="0"
                  :src="defaultRight"
                  class="right-icon"
                ></image>
              </view>
              <view class="prod-info-cont"
                >到店人数：{{ orderInfo.numberOfPeople }}人</view
              >
              <view class="prod-info-cont">
                到店时间：{{$u.timeFormat(orderInfo.estimatedTime, 'yyyy-mm-dd hh:MM')   }} 
                
              </view>
              <view class="prod-info-cont">
              专人陪同：{{
                    orderInfo.needCompanion == 1 ? '需要' : '不需要'
                  }} 
              </view>
            </view>
            <view class="prod-pic">
              <image :src="orderInfo.mainImage"></image>
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
  computed: {
   
    defaultRight() {
      return `${this.$fileUrl}/sysFile/ic_bian_arrow.png`
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    goShop(){
      uni.navigateTo({
        url:'/pages/mall/store/storeDetails?id='+this.orderInfo.shopId,
      })
    }

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
.prod-item {
  margin-top: 15rpx;
  margin: 25rpx 30rpx 0 30rpx;
  font-size: 26rpx;
  border-radius: 14rpx;
}
.right-icon {
     width: 16rpx;
     height: 24rpx;
     margin-left: 10rpx;
 }
.prod-item .order-num {
  background-color: #fff;
  padding: 26rpx 30rpx 10rpx 30rpx;
  display: flex;
  justify-content: space-between;
  font-size: 30rpx;
  color: #888888;
  line-height: 42rpx;    border-radius: 14rpx 14rpx 0 0;
}
 

.prod-item .item-cont {
  display: flex;
padding:  15rpx 30rpx 0 30rpx;
  padding-bottom: 30rpx;   background-color: #fff;
}

.prod-item .item-cont .prod-pic {
  font-size: 0;
  display: inline-block;
  width: 180rpx;
height: 180rpx;
  overflow: hidden;
  border-radius: 14rpx;
  image{
    width: 100%;
    height: 100%;
  }
  
}

 

.prod-item .item-cont .prod-info {
 
   
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
}

.prod-item .item-cont .prod-info .prodname {
 
 
  max-height: 42rpx;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-all;

  font-size: 30rpx;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #333333;
line-height: 42rpx;
margin-bottom: 14rpx;
}

.prod-item .item-cont .prod-info .prod-info-cont {
 
  
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-all;
  margin-bottom: 6rpx;
}
</style>
