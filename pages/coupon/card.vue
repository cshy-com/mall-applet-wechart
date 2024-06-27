<template>
  <view>
    <defNav title="卡券"></defNav>
    <view>
      <view class="list">
        <view class="list-item" v-for="item in dataList" :key="item.id">
          <image
            class="card-img"
            :src="item.img"
            :lazy-load="true"
            :lazy-load-margin="0"
            :mode="'aspectFill'"
          >
          </image>
          <view class="card-right">
            <view class="card-title">
              <text class="card-tag">券</text>
              <text class="card-title-text">{{ item.title }}</text>
            </view>
            <view class="card-bottom">
              <view class="card-bottom-left">免费领取</view>
              <view class="card-bottom-right" @click="goDetail()">
                立即领取
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')

export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      dataList: [
        {
          img: this.$fileUrl + '/sysFile/cardIncon1.png',
          title: '星巴克1000元优惠卡',
          id: 1,
        },
        {
          img: this.$fileUrl + '/sysFile/cardIncon2.png',
          title: '希尔顿酒店自助餐价值399元券',
          id: 2,
        },
        {
          img: this.$fileUrl + '/sysFile/cardIncon3.png',
          title: '盒马生鲜500元卡券',
          id: 3,
        },
        {
          img: this.$fileUrl + '/sysFile/cardIncon4.png',
          title: '沃尔玛500元卡券',
          id: 4,
        },
        {
          img: this.$fileUrl + '/sysFile/cardIncon5.png',
          title: '麦当劳1000元卡',
          id: 5,
        },

        {
          img: this.$fileUrl + '/sysFile/cardIncon6.png',
          title: '中国石油1000元卡',
          id: 6,
        },
      ],
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['forumInfo']),
  },

  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['setForumInfo']),
    goDetail() {
      uni.showToast({
        title: '领取成功',
        icon: 'none',
        duration: 2000,
      })
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  onLoad(options) {},
  onShow() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期：创建之前
  beforpxount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {}, //如果页面有keep-aviewve缓存功能，这个函数会触发执行
}
</script>
<style>
page {
  background: #f5f5f5;
}
</style>
<style scoped lang="scss">
.list {
  margin: 12rpx;
  .list-item {
    display: flex;
    justify-content: space-between;
    padding: 30rpx;
    background: #fff;
    border-radius: 14rpx;
    margin-bottom: 12rpx;
    .card-img {
      width: 180rpx;
      height: 132rpx;
    }
    .card-right {
      margin-left: 32rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 30rpx;
      color: #333333;
      line-height: 42rpx;
      text-align: left;
      font-style: normal;
      flex: 1;
      .card-title {
        display: flex;
        margin-bottom: 20rpx;
        .card-tag {
          color: #ffa000;

          display: inline-block;
          text-align: center;
          background: #fff7dc;
          border-radius: 8rpx;
          margin-right: 10rpx;

          width: 42rpx;
          height: 42rpx;

          border-radius: 8rpx;
        }
        .card-title-text {
          font-weight: 500;
        }
      }
      .card-bottom {
        display: flex;
        justify-content: space-between;
        .card-bottom-left {
          color: #31caa0;
font-size: 24rpx;
          border-radius: 8rpx;
          width: 132rpx;
          height: 42rpx;
          background: #d4f1f0;
          border-radius: 8rpx;
          display: inline-block;
          text-align: center;
        }
        .card-bottom-right {
          font-weight: 500;
          font-size: 26rpx;
          color: #3b6dbb;
          line-height: 47rpx;
          text-align: center;
          font-style: normal;
          width: 142rpx;
          height: 47rpx;
          border-radius: 24rpx;
          border: 2rpx solid #3b6dbb;
        }
      }
    }
  }
}
</style>
