<template>
  <view>
    <view class="searck-input">
      <view class="scrolltop" @tap="toSearchPage">
        <view class="section">
          <text class="iconfont icon-sousuo"></text>
          <text class="placeholder">{{ placeholder }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入关键字搜索',
    },
  },
  data() {
    return {
      keyword: '',
      inputStyle: {
        fontSize: '22rpx',
      },
    }
  },
  methods: {
    toSearchPage() {
      uni.navigateTo({
        url: '/pages/subPack/search-page/search-page',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.searck-input {
  width: 100%;
  background: #fff;
  padding: 20rpx;

  .scrolltop {
    display: flex;
    justify-content: flex-start;
  }

  .section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 66rpx;
    background: #fff;
    z-index: 1;

    width: 700rpx;
    margin: auto;

    background: #f7f7f7;
    margin-right: 0;
    margin-left: 0;
    border-radius: 30rpx;
  }

  .section .placeholder {
    display: block;
    font-size: 24rpx;
    color: #888;
  }

  .section .iconfont {
    margin-left: 20rpx;
    margin-right: 8px;
    font-size: 30rpx;
    color: #888;
  }
}
</style>
