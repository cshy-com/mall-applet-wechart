<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-03-01 14:00:50
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-07-16 16:53:34
 * @FilePath: \mall-applet\pages\coupon\planDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>

    <defNav title="客户营销活动详情"></defNav>

    <view>
      <view class="content-title font-26">
        <text class="title font-30-500">{{ optionDetail.title }}</text>
     
        <view class="user-info flex-between-center">
          

          <view class="time flex-center">
            <image
              :src="defTime"
              :lazy-load="true"
              :lazy-load-margin="0"
              :mode="'aspectFill'"
            />
            <text class="createTime">
              {{ optionDetail.createTime }}
            </text>
          </view>
        </view>
      </view>
    </view>
    <view class="content-main font-30-400">
      
      <view>
        <!-- <u-parse :content="optionDetail.content"></u-parse> -->
        <rich-text :nodes="optionDetail.contentDetail"></rich-text>
      </view>
    </view>
    <view
      class="fix-footer"
    
     
    >
      <view class="fix-content flex-start-center">
       
        <view class="send-text font-30-400" @click="sendComm">立即报名</view>
      </view>
    </view>

  </view>
</template>

<script>
import list from './paly.js'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      index: null,
      currentIndex: null,
      optionDetail: {},
    }
  },
  // 计算属性
  computed: { defTime() {
      return this.$fileUrl + '/sysFile/ic_shijian.png'
    },},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    sendComm(){
      uni.showToast({
          title: '报名成功',
          icon: 'none'
        })
    }

  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  onLoad(option) {
    this.index = option.index
    this.currentIndex = option.currentIndex
    let listArray = [list.list, list.list1, list.list2]
    
    this.optionDetail = list.list2[this.index]
    this.optionDetail.contentDetail= this.optionDetail.contentDetail.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
 
  },
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

.content-title {
  padding: 30rpx;

  background: #fff;

  color: #888888;
  line-height: 37rpx;
  .title {
    color: #333333;
    line-height: 42rpx;
    margin-bottom: 10rpx;    display: inline-block;
  }
  .title-info {
    padding-bottom: 29rpx;
    border-bottom: 2rpx solid #eeeeee;
    margin-bottom: 30rpx;
  }
  .user-info {
    padding-bottom: 29rpx;
    border-bottom: 2rpx solid #EEEEEE;
    
    .time {
      image {
        width: 33rpx;
        height: 33rpx;
        margin-right: 10rpx;
      }
      color: #c0c0c0;
    }
  }
}

.content-main {
  clear: both;
  position: relative;

  background-color: #fff;
  vertical-align: bottom;
  word-break: break-all !important;
  white-space: normal !important;
  line-height: 58rpx;
  border-radius: 12rpx;

  font-family: PingFangSC-Regular !important;
  padding: 20rpx 30rpx;
  padding-bottom: 90px;
  padding-top: 0;
  min-height: 400rpx;
}
 
 
.fix-footer {
  position: fixed;
  bottom: 0;
  height: 120rpx;
  width: 100%;
  // padding-bottom: env(safe-area-inset-bottom);

  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  .fix-content {
    margin: 20rpx 30rpx 30rpx 30rpx;
    justify-content: center;
    .send-text {
      width: 630rpx;
height: 70rpx;
background: #3B6DBB;
border-radius: 40px;
      color: #fff;
      line-height: 70rpx;
      text-shadow: 0px 0px 20rpx rgba(0, 0, 0, 0.1);
  font-size: 30rpx;
  text-align: center;
     
    }
  }
}
</style>
