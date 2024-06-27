<template>
  <view>
    <defNav title="论坛详情"></defNav>
    <view>
      <view class="content-title font-26">
        <text class="title font-30-500">{{ forumInfo.title }}</text>
        <view class="title-info">
          <text class="browse appmore">{{ forumInfo.visits }}人阅读</text>
        </view>
        <view class="user-info flex-between-center">
          <view class="avater flex-center">
            <image :src="forumInfo.avatar || defAvatar" />
            <text class="name font-28">{{ forumInfo.nickName }}</text>
          </view>

          <view class="time flex-center">
            <image
              :src="defTime"
              :lazy-load="true"
              :lazy-load-margin="0"
              :mode="'aspectFill'"
            />
            <text class="createTime">
              {{ forumInfo.createTime }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="content-main font-30-400">
      <view>
        <!-- <u-parse :content="forumInfo.content"></u-parse> -->
        <rich-text :nodes="forumInfo.content"></rich-text>
      </view>
    </view>

    <!-- 评论区域 -->

    <u-gap height="12" bgColor="#F5F5F5" v-if="forumInfo.status == 30"></u-gap>
    <view v-if="forumInfo.status == 30" class="recommend-box">
      <view class="content-activity bottom">
        <view class="tip font-30-500">
          <text>评论{{ total }}</text>
          <text class="more font-26" v-if="total > 0" @click="goMore"
            >查看更多>
          </text>
        </view>
        <view>
          <comments :list="list"></comments>
        </view>
      </view>
    </view>
    <view
      class="fix-footer"
      v-if="forumInfo.status == 30"
      :style="{
        bottom: keyboardHeight + 'px',
      }"
    >
      <view class="fix-content flex-start-center">
        <input
          class="send-input"
          placeholder="请输入内容"
          border="surround"
          clearable
          shape="circle"
          maxlength="200"
          v-model="content"
          confirmType="send"
          @focus="focusInput"
          @blur="blurInput"
          :adjust-position="false"
          @keyboardheightchange="keyboardHeightChange"
        />
        <view class="send-text font-30-400" @click="sendComm">发布</view>
      </view>
    </view>
  </view>
</template>

<script>
import comments from './components/comments.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import {
  forumDetail,
  ForumPage,
  forumView,
  mallForumCommentsAdd,
  mallForumCommentsPage,
} from '@/api/index'

export default {
  //import引入组件才能使用
  components: { comments },
  props: {},
  data() {
    return {
      list: [],

      viewNum: 0,
      status: null,
      content: null,
      current: 1,
      size: 10,
      total: 0,
      keyboardHeight: 0,
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['forumInfo']),
    defTime() {
      return this.$fileUrl + '/sysFile/ic_shijian.png'
    },
    defAvatar() {
      return this.$fileUrl + '/sysFile/avatar.png'
    },
  },

  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['setForumInfo']),
    focusInput(e) {},
    blurInput(e) {},
    keyboardHeightChange(e) {
      this.keyboardHeight = e.detail.height

      console.log(e.detail.height + 'e.detail.height')
    },
    goMore() {
      uni.navigateTo({
        url: '/pages/article/forumCommentsPage?id=' + this.forumInfo.id,
      })
    },
    async sendComm() {
      if (['', null, undefined].includes(this.content)) {
        return uni.showToast({
          title: '请输入内容',
          icon: 'none',
        })
      }
      let { code, data } = await mallForumCommentsAdd({
        forumId: this.forumInfo.id,
        content: this.content,
      })
      if (code == 0) {
        uni.showToast({
          title: '发布成功',
          icon: 'none',
        })
        this.content = null
        this.getCommentsPage()
      }
    },
    goDetail(item) {
      this.setForumInfo(item)

      uni.redirectTo({
        url: '/pages/subPack/forum/forumDatail',
      })
    },

    async getCommentsPage() {
      let res = await mallForumCommentsPage({
        current: this.current,
        size: this.size,
        forumId: this.forumInfo.id,
      })
      this.total = res.total
      this.list = res.data
    },
    async getDetail() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await forumDetail(this.id)
        this.setForumInfo(res.data)
        if (this.forumInfo.status == 30) {
          await forumView(this.id)
          this.getCommentsPage()
        }
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
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
    if (options.status) {
      this.status = options.status
    }
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
  padding: 30rpx;

  background: #fff;

  color: #888888;
  line-height: 37rpx;
  .title {
    color: #333333;
    line-height: 42rpx;
    margin-bottom: 10rpx;
  }
  .title-info {
    padding-bottom: 29rpx;
    border-bottom: 2rpx solid #eeeeee;
    margin-bottom: 30rpx;
  }
  .user-info {
    .avater {
      image {
        flex: 0 0 58rpx;
        width: 58rpx;
        height: 58rpx;
        margin-right: 10rpx;
        border-radius: 50%;

        vertical-align: middle;
      }
    }
    .name {
      color: #333333;
      line-height: 40rpx;
    }
    .time {
      image {
        width: 33rpx;
        height: 33rpx;
        margin-right: 10rpx;
      }
      color: #c0c0c0;
    }
  }
}

.content-main {
  clear: both;
  position: relative;

  background-color: #fff;
  vertical-align: bottom;
  word-break: break-all !important;
  white-space: normal !important;
  line-height: 58rpx;
  border-radius: 12rpx;

  font-family: PingFangSC-Regular !important;
  padding: 20rpx 30rpx;

  min-height: 400rpx;
}
.content-activity {
  background: #fff;
  .tip {
    margin: 0 30rpx;
    padding-top: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: #333333;
    line-height: 42rpx;
    margin-bottom: 30rpx;
    .more {
      color: #bcbcbc;
      line-height: 37rpx;
    }
  }
}
.recommend-box {
  padding-bottom: 140rpx;
}
.fix-footer {
  position: fixed;
  bottom: 0;
  height: 120rpx;
  width: 100%;
  // padding-bottom: env(safe-area-inset-bottom);

  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  .fix-content {
    margin: 20rpx 30rpx 30rpx 30rpx;
    .send-input {
      width: 537rpx;
      height: 64rpx;
      background: #f5f5f5;
      // box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
      border-radius: 32rpx;
      margin-right: 30rpx;
      padding: 0 32rpx;
    }
    .send-text {
      color: #3b6dbb;
      line-height: 42rpx;
      text-shadow: 0px 0px 20rpx rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
