<template>
  <view>
    <view
      class="cat-row"
      :class="{ 
        'cat-row-2': cateList.length == 2 || cateList.length == 3,
        'cat-row-1': cateList.length == 1 || shopListLength >0 
        
        }"
    >
      <view v-if="!cateList || cateList.length == 0" class="empty"> </view>
      <view
        v-else-if="cateList.length == 1"
        class="flex-between-center cate-more"
      >
        <view class="flex-start-center cate-left">
          <image
            :lazy-load="true"
            :lazy-load-margin="0"
            :src="cateList[0].ico"
          ></image>
          <text>
            {{ cateList[0].name }}
          </text>
        </view>
        <view
          class="flex-start-center more"
          @tap="($event) => toDetail(cateList[0])"
        >
          <text> 查看更多 </text>
          <image
            :lazy-load="true"
            :lazy-load-margin="0"
            :src="defaultRight"
            class="right-icon"
          ></image>
        </view>
      </view>
      <view v-else>
        <view
          class="cat-item"
          :class="{
            'cat-item-2': cateList.length == 2,
            'cat-item-3': cateList.length == 3,
          }"
        >
          <view
            class="item"
            v-for="(item, index) in cateList"
            @tap="($event) => toDetail(item, index)"
            data-sts="item.id"
            :key="item.id"
            :class="{
              'item-2': cateList.length == 2,
              'item-3': cateList.length == 3,
            }"
          >
            <view class="icon-box">
              <image
                :lazy-load="true"
                :lazy-load-margin="0"
                :src="item.ico"
              ></image>
            </view>
            <text>{{ item.name }}</text>
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
    shopListLength:{
      type:Number,
      default:0
    }
  },
  data() {
    return {}
  },
  computed: {
    defaultRight() {
      return `${this.$fileUrl}/sysFile/ic_bian_arrow.png`
    },
  },
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
  margin: 12rpx;
    padding: 0 30rpx 0 30rpx;
    background: #fff;
    border-radius: 24rpx;
    padding-top: 30rpx;
    margin-top: 0;
    margin-bottom: 0;
}
.cat-row-1{
  border-radius: 14rpx 14rpx 0 0;
  .cate-more{
    border-bottom: 1rpx solid #EEEEEE;
    padding-bottom: 20rpx;
  }
}
.cat-row-2 {
  background: none;
  margin: 0;
  padding: 0;
  border-radius: 0;
}
.flex-between-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-start-center {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.cate-more {
  font-size: 30rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 42rpx;
  
  .cate-left {
    image {
      width: 42rpx;
      height: 42rpx;
      margin-right: 10rpx;
    }
  }
  .more {
    font-size: 26rpx;

    font-weight: 400;
    color: #cccccc;
    line-height: 37px;
  }
}
.right-icon {
  width: 16rpx;
  height: 24rpx;
  margin-left: 10rpx;
}
.cat-item {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .item {
    text-align: center;
    width: 101rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30rpx;
    margin-right: 40rpx;
    .icon-box {
      width: 70rpx;
      height: 70rpx;
      image {
        width: 100%;
        height: 100%;
        will-change: transform;
      }
    }
    text {
      margin-top: 10rpx;

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
  }
  .item:nth-child(5n) {
    margin-right: 0;
  }
  .item-2 {
    width: 351rpx;
    height: 116rpx;
    margin-right: 10rpx;
    position: relative;
    margin-bottom: 0;
    .icon-box {
      width: 100%;
      height: 100%;
    }
    text {
      position: absolute;
      top: 37rpx;
      left: 21rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 42rpx;
      width: 80%;
      text-align: left;
      margin-top: 0;
    }
  }
  .item-2:last-child {
    margin-right: 0;
  }
  .item-3 {
    width: 231rpx;
    height: 116rpx;
    position: relative;
    margin-bottom: 0;
    margin-bottom: 0;
    margin-right: 10rpx;
    .icon-box {
      width: 100%;
      height: 100%;
    }
    text {
      position: absolute;
      top: 37rpx;
      left: 21rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 42rpx;
      width: 80%;
      text-align: left;
      margin-top: 0;
    }
  }
  .item-3:last-child {
    margin-right: 0;
    margin-bottom: 0;
  }
}
.cat-item-2 {
  margin: 0 20rpx;
  margin-bottom: 30rpx;
}
.cat-item-3 {
  margin: 0 20rpx;
  margin-bottom: 30rpx;
}
.empty {
  margin-top: 120rpx;
  padding-bottom: 120rpx;
}
</style>
