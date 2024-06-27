<template>
  <view>
    <view :class="isSwiper ? 'cat-row-1' : 'cat-row'">
 
        <view v-if="!isSwiper" class="cat-item">
          <view
            class="item"
            v-for="(item, index) in cateList"
            @tap="($event) => toDetail(item, index)"
            data-sts="item.id"
            :key="item.id"
          >
            <view class="icon-box">
              <image
                :lazy-load="true"
                :lazy-load-margin="0"
                :src="item.ico"
                class="icon-cover"
              ></image>
            </view>
            <text>{{ item.name }}</text>
          </view>
        </view>
        <view v-else>
          <swiper :indicator-dots="false" class="swiper"  :class="{'swiper-2':current==1}"  @change="changeIndicatorDots">
            <swiper-item>
              <view class="cat-item">
                <view
                  class="item"
                  v-for="(item, index) in cateList.slice(0, 10)"
                  @tap="($event) => toDetail(item, index)"
                  data-sts="item.id"
                  :index="index"
                  :key="index"
                >
                  <view class="icon-box">
                    <image
                      :lazy-load="true"
                      :lazy-load-margin="0"
                      :src="item.ico"
                      class="icon-cover"
                    ></image>
                  </view>
                  <text>{{ item.name }}</text>
                </view></view
              >
            </swiper-item>
            <swiper-item v-if="cateList.length > 10">
              <view class="cat-item">
                <view
               
                  class="item"
                  v-for="(item, index) in cateList.slice(10, cateList.length)"
                  @tap="($event) => toDetail(item, index+10)"
                  data-sts="item.id"
                  :index="index + 10"
                  :key="index"
                >
                  <view
                    class="icon-box"
                    :customStyle="{ paddingTop: 20 + 'rpx' }"
                  >
                    <image
                      :lazy-load="true"
                      :lazy-load-margin="0"
                      :src="item.ico"
                      class="icon-cover"
                    ></image>
                  </view>
                  <text>{{ item.name }}</text>
                </view>
              </view>
            </swiper-item>
          </swiper>
          <view class="swiper-dots-box">
      <view class="swiper-dots">
        <view
          v-for="(item, index) in Math.ceil(cateList.length/10)" 
          :key="item.id"
          class="swiper-dots-item"
          :class="{ active: current == index }"
        ></view>
      </view>
    </view>
        </view>
      </view>
 
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    cateList: {
      type: Array,
      defualt: () => [],
    },
    isSwiper: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      current:0
    }
  },
  computed: {},
  created() {},
  onLoad(option) {},

  options: {},

  methods: {
    changeIndicatorDots(e) {
      this.current = e.detail.current
      // this.indicatorDots = !this.indicatorDots
    },
    toDetail(item,index) {
      this.$emit('CateEvent', item,index)
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper {
  height: 270rpx;
  width: 100%;
}
.swiper-2{
  // height: 120rpx;
}
.cat-row {
  padding-top: 50rpx;
}
.cat-row-1 {
  padding-top: 7rpx;
}

.cat-item {
  margin: 0 30rpx;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.cat-item .item {
  text-align: center;
  width: 104rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 38rpx;
  margin-right: 42rpx;
}

.cat-item .item:nth-child(5n) {
  margin-right: 0;
}

.cat-item .item .icon-box {
  width: 52rpx;
  height: 52rpx;

  .iconfont {
    font-size: 88rpx;
    line-height: 100rpx;
  }
  .icon-cover {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  image {
    will-change: transform;
  }
}

.cat-item .item text {
  margin-top: 13rpx;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  width: 104rpx;
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 37rpx;
}
.empty {
  margin-top: 120rpx;
  padding-bottom: 120rpx;
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
      background: #E1E4E9;
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
