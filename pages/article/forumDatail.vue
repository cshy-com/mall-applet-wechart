<template>
  <view>
    <view>
      <view class="content-title">
        <text class="title">{{ forumInfo.title }}</text>
        <view class="title-info">
          <text class="browse appmore">阅读&nbsp;{{ forumInfo.visits }}</text>
        </view>
        <view class="user-info">
          <view class="user-info-left user">
            <view class="avater">
              <image :src="forumInfo.avatar||defaultAvatar" />
            </view>
            <view>
              <text class="name">{{ forumInfo.nickName }}</text>
              <text class="time">{{ forumInfo.createTime }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="content-main">
      <view><u-parse :content="forumInfo.content"></u-parse> </view>
    </view>
    <view>
      <view class="content-activity bottom">
        <view class="tip">值得推荐</view>
        <view>
          <view
            class="content-activity-item"
            @tap="($event) => goDetail(item)"
            v-for="item in list"
            :key="item.id"
          >
            <view class="thumbnail">
              <image
                :src="item.mainUrl || defaultImg"
                :lazy-load="true"
                :lazy-load-margin="0"
                :mode="'aspectFill'"
              />
            </view>
            <text class="thumbnail-title">{{ item.title }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import forumData from '@/mock/index.js'
import { forumDetail, ForumPage,forumView } from '@/api/index'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      list: [],
      defaultImg: require('@/static/img/default.png'),
      viewNum:0,
      defaultAvatar:require('@/static/img/icon/head04.png')
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
    goDetail(item) {
      this.setForumInfo(item)

      uni.redirectTo({
        url: '/pages/subPack/forum/forumDatail',
      })
    },
    async getPageList() {
      let res = await ForumPage({
        type: 'comm',
        current: 1,
        size: 10,
        order: {
          field: 'visits',
          type: 'desc',
        },
      })
      this.list = res.data
    },
    async getDetail() {
      await forumView(this.id)
      let res = await forumDetail(this.id)
      this.setForumInfo(res.data)

      
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    console.log(this.forumInfo)
  },
  onLoad(options) {
    if (options.id) {
      this.id = options.id
      this.getDetail()
    }
    this.getPageList()
  },
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
  background: #fff;
}
</style>
<style scoped lang="scss">
.content-title {
  padding: 0 32rpx !important;
  margin-bottom: 44rpx;
  .title {
    font-size: 50rpx;
    line-height: 68rpx;
    color: #1d1d1d;
    margin-bottom: 25rpx;
    margin-top: 20rpx;
    overflow: hidden;
  }
  .title-info {
    font-size: 20rpx;
    color: #999;
    margin-bottom: 24rpx;
  }
  .user-info {
    display: flex;

    justify-content: space-between;

    align-items: center;
    .user-info-left {
      display: flex;

      align-items: center;

      .avater {
        flex: 0 0 60rpx;
        width: 60rpx;
        height: 60rpx;
        border-radius: 60rpx;
        margin-right: 26rpx;
        display: inline-block;
        vertical-align: middle;
        image {
          width: 100%;
          height: 100%;
          border-radius: 60rpx;
        }
      }
      .name {
        font-size: 26rpx;
        color: #151515;
        font-weight: 400;
        line-height: 48rpx;
      }
      .time {
        font-size: 20rpx;
        color: #666;
        display: block;
      }
    }
  }
}

.content-main {
  clear: both;
  position: relative;
  font-size: 30rpx;
  background-color: #fff;
  vertical-align: bottom;
  word-break: break-all !important;
  white-space: normal !important;
  line-height: 58rpx;
  border-radius: 12rpx;
  font-weight: 400;
  font-family: PingFangSC-Regular !important;
  padding: 20rpx 32rpx;
  border-bottom: 20rpx solid #f6f7f8;
}
.content-activity {
  padding: 0 38rpx 30rpx !important;
  .tip {
    font-size: 20rpx;
    color: #fff;
    background: #fb654f;
    width: 114rpx;
    height: 36rpx;
    line-height: 36rpx;
    border-bottom-right-radius: 30rpx;
    margin-bottom: 42rpx;
    text-align: center;
  }
  .content-activity-item {
    position: relative;
    font-family: PingFangSC-Medium;
    color: #151515;
    margin-bottom: 30rpx;

    display: flex;

    align-items: center;
    .thumbnail {
      flex: 0 0 196rpx;
      width: 196rpx;
      height: 130rpx;
      margin-right: 20rpx;
      border-radius: 5rpx;
      image {
        width: 100%;
        height: 100%;
        border-radius: 5rpx;
        will-change: transform;
      }
    }
    .thumbnail-title {
      font-size: 28rpx;
      line-height: 50rpx;
      word-break: break-all;
    }
  }
}
</style>
