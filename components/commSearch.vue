<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-16 10:04:54
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-19 13:56:49
 * @FilePath: \mall-admind:\work\mall-applet\components\commSearch.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="search-and-address">
      <view class="bg-sear">
        <view class="scrolltop" @tap="toSearchPage">
          <view class="section">
            <text class="iconfont icon-sousuo"></text>
            <text class="placeholder">{{ placeholder }}</text>
          </view>
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
      default: '输入关键字搜索',
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
        url: '/pages/mall/search-page/search-page',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.search-and-address {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 36rpx;
  .bg-sear {
    width: 698rpx;
    height: 66rpx;
    background: #ffffff;
    box-shadow: inset 0px 0px 8rpx 0px #a67139;
    border-radius: 200rpx;
    border: 3rpx solid #a67139;
  }

  .bg-sear .scrolltop {
    display: flex;
    justify-content: flex-start;
  }

  .bg-sear .section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 66rpx;
    z-index: 1;
    border-radius: 8rpx 0 0 8rpx;
    width: 100%;
    margin: auto;
    margin-right: 0;
  }

  .bg-sear .section .placeholder {
    display: block;
    color: #888;
    font-size: 28rpx;
    font-family: SourceHanSerifCN-Medium, SourceHanSerifCN;
    font-weight: 600;
    color: #a67139;
    line-height: 40rpx;
  }

  .bg-sear .section .iconfont {
    margin-left: 20rpx;
    margin-right: 8px;
    font-size: 44rpx;
    font-weight: 600;
    color: #a67139;
  }
}
</style>
