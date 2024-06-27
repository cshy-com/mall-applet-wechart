<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-07-24 11:13:53
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-21 15:37:30
 * @FilePath: \mall-admind:\work\mall-applet\pages\index\components\app-swipper.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="">
    <swiper
      class="swiper-box"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      circular="true"
      previous-margin="50rpx"
      next-margin="50rpx"
      @change="changeIndicatorDots"
    >
      <swiper-item v-for="(item, index) in info" :key="index">
        <view :class="item.colorClass" class="swiper-item" >
          <image class="image" :src="item.url" mode="aspectFill" @click="previewImg(index)" />
        </view>
      </swiper-item>
    </swiper>
    <view class="swiper-dots-box">
      <view class="swiper-dots">
        <view
          v-for="(item, index) in info"
          :key="item.id"
          class="swiper-dots-item"
          :class="{ active: current == index }"
        ></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      indicatorDots: false, //是否显示面板指示点
      autoplay: false, //是否自动切换
      interval: 2000, //切换的间隔时间
      duration: 500, //滑动动画时长
      current: 0,
      info: [
        {
          colorClass: 'uni-bg-red',
          url: this.$fileUrl + '/upload/2023/08/02/banner1.jpg',
          content: '内容 A',
        },
        {
          colorClass: 'uni-bg-green',
          url: this.$fileUrl + '/upload/2023/08/02/banner2.jpg',
          content: '内容 B',
        },
        {
          colorClass: 'uni-bg-blue',
          url: this.$fileUrl + '/upload/2023/08/02/banner3.jpg',
          content: '内容 C',
        },
      ],
    }
  },
  methods: {
    changeIndicatorDots(e) {
      this.current = e.detail.current
      // this.indicatorDots = !this.indicatorDots
    },
    previewImg(index){

      uni.previewImage({
			urls: this.info.map(val=>val.url),
      current:index,loop:true,
		});
    },
  },
}
</script>

<style lang="scss">
.swiper-box {
  /* width: 95%; */
  height: 340rpx;
 
  margin-top: 30rpx;
  swiper-item{
    border-radius: 15rpx!important;
  }
  
}

.swiper-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #999;
  color: #fff;
  // margin: 10px;
  border-radius: 15upx;
  /* app上运行不显示图片，就需要加下面这行，设置高度 */
  height: 340upx;
  width: 650rpx;
  position: relative;
  left: 15rpx;

  background-size: 300rpx;
  background-position: center;
  background-repeat: no-repeat;
  background-image: $app-load-gif;
  background-color: #f5f5f5;
}
/deep/ .wx-swiper-dots {
  position: absolute;
  bottom: 10% !important;
  left: 10% !important;
}

/deep/ .wx-swiper-dots-horizontal {
  left: 10% !important;
}
.image {
  /* width: 750rpx; */
  width: 100%;
  height: 340rpx;
  border-radius: 15upx;
}

/* 默认指示点的样式 */
.swiper-box .wx-swiper-dot {
  width: 15rpx;
  height: 15rpx;
  background: indianred;
  border-radius: 15rpx;
}

/* 选中指示点的样式 */
.swiper-box .wx-swiper-dot.wx-swiper-dot-active {
  width: 30rpx;
  height: 15rpx;
  background: indianred;
  border-radius: 15rpx;
}
.swiper-dots-box {
  margin-top: 17rpx;
  margin-top: 17rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .swiper-dots {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .swiper-dots-item {
      width: 16rpx;
      height: 8rpx;
      background: #e1e4e9;
      border-radius: 5rpx;
      margin-left: 8rpx;
    }
    .active {
      width: 26rpx;
      height: 8rpx;
      background: #3b6dbb;
      border-radius: 5rpx;
    }
  }
}
</style>
