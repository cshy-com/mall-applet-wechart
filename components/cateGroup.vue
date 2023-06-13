<template>
  <view>
    <view :class="isSwiper ? 'cat-row-1' : 'cat-row'">
      <view v-if="!cateList || cateList.length == 0" class="empty">
        <u-empty mode="data" iconSize="140" textSize="32" :text="'暂无数据'">
        </u-empty>
      </view>
      <view v-else>
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
          <swiper :indicator-dots="true" class="swiper">
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
                  :customStyle="{ width: 220 + 'rpx', height: 220 + 'rpx' }"
                  class="item"
                  v-for="(item, index) in cateList.slice(10, 15)"
                  @tap="($event) => toDetail(item, index)"
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
    return {}
  },
  computed: {},
  created() {},
  onLoad(option) {},

  options: {},

  methods: {
    toDetail(item) {
      this.$emit('CateEvent', item)
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper {
  height: 400rpx;
  width: 100%;
}
.cat-row {
  padding-top: 50rpx;
}
.cat-row-1 {
  padding-top: 7rpx;
}

.cat-item {
  margin: 0 24rpx;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.cat-item .item {
  text-align: center;
  width: 100rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
  margin-right: 49rpx;
}

.cat-item .item:nth-child(5n) {
  margin-right: 0;
}

.cat-item .item .icon-box {
  width: 100rpx;
  height: 100rpx;
  border: 2rpx solid #a67139;
  border-radius: 50%;
  .iconfont {
    font-size: 88rpx;
    line-height: 100rpx;
  }
  .icon-cover {
    width: 100rpx;
    height: 100rpx;
  }
  image {
    will-change: transform;
  }
}

.cat-item .item text {
  margin-top: 8rpx;
  font-size: 22rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #a67139;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 94rpx;
}
.empty {
  margin-top: 120rpx;
  padding-bottom: 120rpx;
}
</style>
