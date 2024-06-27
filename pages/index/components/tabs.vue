<template>
  <view>
    <view class="wrap">
      <view class="homeBox">
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
      </view>
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
    // selectIndex(e) {
    //   debugger
    // ,  this.tabIndex = e
    // }
    selectIndex: {
      handler(n, o) {
        if (n) {
          this.tabIndex = n
        } else {
          this.tabIndex = 0
        }
      },
      deep: true,
      immediate: true,
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
  computed:{
 
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
     
      this.$emit('changeIndex', index)
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

.homeBox {
  .tabBox {
    white-space: nowrap;
    display: inline-block;

    padding-top: 28rpx;
    padding-bottom: 30rpx;
    display: flex;
    justify-content: flex-start;
    margin: 0 30rpx;
    align-items: center;
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
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #888888;
      line-height: 42rpx;
    }
    .tab-item:nth-child(n+2){
      margin-left: 90rpx;
      // margin-left: 120rpx;
    }
    .tab-choice {
      //当前选中 基于此类名给与底部选中框
      position: relative;
      color: $app-color;
      font-size: 30rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 500;

      line-height: 42rpx;
    }
    .tab-choice:before {
      content: '';
      position: absolute;
      left: 35%;

      background: $tabChoiceColor;

      width: 26rpx;
      height: 4px;
      background: $app-background-color;
      border-radius: 5rpx;

      top: 46rpx;
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
