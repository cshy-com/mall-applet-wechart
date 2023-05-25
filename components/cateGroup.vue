<template>
  <view>
    <view class="cat-row">
      <u-empty
        v-if="!cateList || cateList.length == 0"
        mode="data"
        marginTop="120"
        iconSize="140"
        textSize="32"
      >
      </u-empty>
      <view class="cat-item" v-else>
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
.cat-row {
  padding-top: 50rpx;
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
</style>
