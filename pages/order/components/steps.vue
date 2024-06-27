<template>
  <view class="step-info">
    <view class="step-number" :class="{'step-number-2':stepList.length==2}"> 
      <block v-for="(item, index) in stepList" :key="index">
        <view @click.stop="openItem(item)" class="item-state">
          <view class="step-name">
            <view
              class="name"
              :style="{
                color: getColor(index) || item.unCheckedColor || unCheckedColor,
              }"
            >
              {{ item.name }}
            </view>
          </view>
          <view class="state-img-box" :class="{'step':step<=index,'last':index==stepList.length-1}">
            <image
              class="state-img"
              :src="getImg(index) || item.unCheckedImg || unCheckedImg"
            ></image>
            <text class="state-img-text">{{ index + 1 }}</text>
          </view>
        </view>
        <!-- <view class="line" :style="{background:getLine(index) || (item.unCheckedLine || unCheckedLine)}"
					v-if="index < stepList.length-1"></view> -->
      </block>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    //当前步骤
    step: {
      type: Number,
      default: 1,
    },
    //步骤列表
    stepList: {
      type: Array,
      default: null,
    },
    //已完成的图片路径
    checkedImg: {
      type: String,
      default: ``,
    },
    //未完成的图片路径
    unCheckedImg: {
      type: String,
      default: ``,
    },
    activeCheckedImg: {
      type: String,
      default: ``,
    },
    //已完成的字体颜色
    checkedColor: {
      type: String,
      default: '#888888',
    },
    //未完成的字体颜色
    unCheckedColor: {
      type: String,
      default: '#C0C0C0',
    },

    //已完成的线条颜色
    checkedLine: {
      type: String,
      default: '#3B6DBB',
    },
    //未完成的线条颜色
    unCheckedLine: {
      type: String,
      default: '#C0C0C0',
    },
  },
  data() {
    return {}
  },
  methods: {
    //获取图片
    getImg(e) {
      let index = Number(e)
      if (this.step == index)
        return this?.stepList?.[index].activeCheckedImg || this.activeCheckedImg

      if (this.step > index)
        return this?.stepList?.[index].checkedImg || this.checkedImg
    },
    //获取线
    getLine(e) {
      let index = Number(e)
      if (this.step > index)
        return this?.stepList?.[index].checkedLine || this.checkedLine
    },
    //获取颜色
    getColor(e) {
      let index = Number(e)
      if (this.step > index)
        return this?.stepList?.[index].checkedColor || this.checkedColor
    },
    openItem(item) {
      this.$emit('clickStep', item)
    },
  },
}
</script>

<style lang="scss" scoped>
.step-info {
  height: auto;
  margin: 30rpx 30rpx 0 30rpx; margin-top: 19rpx;
}
.item-state {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.step-number {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.line {
  width: 100%;
  height: 1rpx;
}

.step-name {
  align-items: center;
  justify-content: space-between;

  text-align: center;
}
.state-img-box {
  align-items: center;
  justify-content: center;
  position: relative;

  height: 54rpx;
  display: flex;
  width: 100%;
 
  .state-img {
    width: 54rpx;
    height: 54rpx;
    display: flex;
    margin: auto;position: relative;
    z-index: 99;
  }
  .state-img-text {
    font-size: 20rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 28rpx;

    z-index: 99;
    position: absolute;
    width: 100%;
    text-align: center;
  }
}
.state-img-box::after{
  content: '';
    position: absolute;
    bottom: 27rpx;
    left: 54rpx;
    right: 0;
    height: 1rpx;
    width: 170rpx;
  
    border-top: 1px solid #3b6dbb;bottom: 27rpx;
    left: 54rpx;
}
.last::after{
  width: 0;
}
.step::after{
  border-top: 1px solid #C0C0C0;
}
.step-number-2{
  justify-content: space-around;
  .state-img-box::after{
    width: 40vw;
  }
  .last::after{
    width: 0;
  }
}
.name {
  font-size: 24rpx;

  color: #333333;
  margin-bottom: 6rpx;
}
</style>
