<template>
  <view style="padding: 0 10rpx">
    <custom-waterfalls-flow
      ref="waterfallsFlowRef"
      :value="data.list"
      :column="column"
      :columnSpace="1.5"
      :seat="2"
      @wapperClick="wapperClick"
      @imageClick="imageClick"
      @loaded="loaded"
      ><view
        class="item"
        v-for="(item, index) in data.list"
        :key="index"
        slot="slot{{index}}"
      >
        <view class="title">{{ item.title }}</view>
        <view class="desc">{{ item.desc }}</view>
      </view>
    </custom-waterfalls-flow>
  </view>
</template>

<script>
// #ifdef VUE2
export default {
  data() {
    return {
      data: {
        list: [
          {
            image: 'https://via.placeholder.com/200x500.png/ff0000',
            title: '我是标题1',
            desc: '描述描述描述描述描述描述描述描述1',
          },
          {
            image: 'https://via.placeholder.com/200x200.png/2878ff',
            title: '我是标题2',
            desc: '描述描述描述描述描述描述描述描述2',
          },
          {
            image: 'https://via.placeholder.com/200x100.png/FFB6C1',
            title: '我是标题3',
            desc: '描述描述描述描述描述描述描述描述3',
          },
          {
            image: 'https://via.placeholder.com/200x300.png/9400D3',
            title: '我是标题4',
            desc: '描述描述描述描述描述描述描述描述4',
          },
          {
            image: 'https://via.placeholder.com/100x240.png/B0E0E6',
            title: '我是标题5',
            desc: '描述描述描述描述描述描述描述描述5',
          },
          {
            image: 'https://via.placeholder.com/140x280.png/7FFFAA',
            title: '我是标题6',
            desc: '描述描述描述描述描述描述描述描述6',
          },
          {
            image: 'https://via.placeholder.com/40x60.png/EEE8AA',
            title: '我是标题7',
            desc: '描述描述描述描述描述描述描述描述7',
          },
        ],
      },
      column: 2,
    }
  },
  methods: {
    add() {
      const newArr = [
        {
          image: 'https://via.placeholder.com/58x100.png/FF7F50',
          title: '我是标题8',
          desc: '描述描述描述描述描述描述描述描述8',
        },
        {
          image: 'https://via.placeholder.com/59x100.png/C0C0C0',
          title: '我是标题9',
          desc: '描述描述描述描述描述描述描述描述9',
        },
        {
          image: 'https://via.placeholder.com/60x100.png/FAEBD7',
          title: '我是标题10',
          desc: '描述描述描述描述描述描述描述描述10',
        },
      ]
      this.data.list = this.data.list.concat(newArr)
    },
    changeColumn(h) {
      this.column = !h ? this.column - 1 : this.column + 1
    },
    loaded() {
      console.log('加载完成')
    },
    wapperClick(item) {
      console.log('单项点击事件', item)
    },
    imageClick(item) {
      console.log('图片点击事件', item)
    },
    reset() {
      this.data.list = [
        {
          image: 'https://via.placeholder.com/200x500.png/ff0000',
          title: '我是标题1',
          desc: '描述描述描述描述描述描述描述描述1',
        },
      ]
      this.$refs.waterfallsFlowRef.refresh()
    },
  },
}
// #endif
</script>

<style lang="scss" scoped>
page {
  background-color: #f2f5f9;
  position: relative;
  z-index: 99999;
}
.handle {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20rpx;
  padding: 10rpx;

  .btn {
    margin: 20rpx 10rpx;
    padding: 0 20rpx;
    background: #2878ff;
    font-size: 28rpx;
    color: #fff;

    &::after {
      border: 0;
    }
  }
}

.item {
  padding: 10rpx 10rpx 20rpx;

  .title {
    line-height: 48rpx;
    font-size: 28rpx;
    color: #222;
  }

  .desc {
    font-size: 24rpx;
    color: #666;
  }
}
</style>
