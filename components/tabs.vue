<template>
  <view class="wrap">
    <view class="homeBox">
      <scroll-view
        :enable-flex="true"
        scroll-with-animation
        :throttle="false"
        :scroll-left="scrollLeft"
        scroll-x
      >
        <view class="tabBox">
          <view
            class="tab-item"
            :key="index"
            v-for="(item, index) in list"
            @click="changeIndex(index)"
          >
            <view :class="tabIndex == index ? 'tab-choice' : ''">{{
              item.title
            }}</view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'tabs',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    selectIndex: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    selectIndex(e) {
      this.tabIndex = e
    },
  },
  data() {
    return {
      tabIndex: 0,
      tabList: [], //tab dom节点集合
      scrollLeft: 0, //scrollview需要滚动的距离
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const query = uni.createSelectorQuery().in(this)
      query
        .selectAll('.tab-item')
        .fields({ rect: true, size: true }, (data) => {
          // TODO 第一步 获取当前所以子元素 并插入到 tabList 列表中
          data.forEach((item) => {
            this.tabList.push({ width: item.width, left: item.left })
          })
        })
      query.exec()
    },
    changeIndex(index) {
      //改变index 即手动点击切换 我在此时将当前元素赋值给左边距 实现自动滚动
      this.tabIndex = index
      //当前滚动的位置
      //this.tabList[index].left 会使当前选中的距离左边为0
      //然后 用屏幕宽度减去当前元素的宽度 / 2  则会让他处于中间位置

      this.scrollLeft =
        this.tabList[index].left - (345 - this.tabList[index].width) / 2
    },
  },
}
</script>

<style lang="scss" scoped>
$tabChoiceColor: #000000; //设置选中文字和底部下划线背景颜色
$max: 100%;
// 这是最外层盒子
.wrap {
  position: relative;
  background: #f7f7f7;
}
.homeBox {
  // 对此盒子进行 sticky 粘性定位
  position: sticky;
  top: 0;
  background: #fff; //设置背景 否则会透明
  /* #ifdef H5 */
  //粘性定位 在h5下 加 原生头部高度 44px
  top: 44px;
  /* #endif */
  .tabBox {
    position: relative;
    white-space: nowrap;
    display: inline-block;
    background: #fff;
    padding-top: 28rpx;
    padding-bottom: 42rpx;
    /* #ifdef MP-TOUTIAO */
    /* #endif */
    .tab-item {
      position: relative;
      display: inline-block;
      text-align: center;
      transition-property: background-color, width;

      display: inline-block;
      margin: 0 24rpx;
      flex-shrink: 0;
      font-size: 30rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #7a7a7a;
      line-height: 42rpx;
    }
    .tab-choice {
      //当前选中 基于此类名给与底部选中框
      position: relative;
      color: $tabChoiceColor;
      font-size: 34rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #000000;
      position: relative;
      line-height: 48rpx;
    }
    .tab-choice:before {
      content: '';
      position: absolute;
      left: 10rpx;

      background: $tabChoiceColor;

      width: 80%;
      height: 8rpx;

      border-radius: 200rpx;
      top: 52rpx;
    }
  }
}

// // 删除 底部滚动条
/* #ifndef APP-NVUE */
::-webkit-scrollbar,
::-webkit-scrollbar,
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
/* #endif */
/* #ifdef H5 */
// 通过样式穿透，隐藏H5下，scroll-view下的滚动条
scroll-view ::v-deep ::-webkit-scrollbar {
  display: none;
}
/* #endif */
</style>
