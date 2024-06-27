<template>
  <view class="comment-box">
    <view class="empty" v-if="!commentData || commentData.length == 0">
      <nodata
      :config="{
                  content: '暂无评论',
                  height:'400rpx',
                  background:'#fff'
                }"
      >
      </nodata>
    </view>
    <view v-else>
      <view class="comment" v-for="(item, index) in commentData" :key="res.id">
        <view class="user-info">
          <view class="user-avatar"
            ><image
              :lazy-load="true"
              :lazy-load-margin="0"
              :src="item.baseSysUserVo.avatar || defaultAvatar"
              mode="aspectFill"
            ></image
          ></view>
          <view class="name">{{ item.baseSysUserVo.nickName }}</view>
          <view class="time"> 发布于 {{ item.createTime }} </view>
        </view>

        <view class="comment-content">
          <view class="score"
            ><text>打星</text>
            <u-rate
              activeColor="#EA531C"
              readonly
              :count="5"
              :value="item.serviceRating"
              size="32"
            ></u-rate
          ></view>
          <view class="content">{{ item.comment }}</view>
          <view class="comment-img-box" v-if="item.picturePathList">
            <view class="comment-img-item" v-for="img in item.picturePathList">
              <!-- http://39.104.53.172/file/upload/2023/08/04/微信图片_20230525152813_20230804162840A019.jpg -->
              <!-- :src="img || require('@/static/img/test5.png')" -->
              <image
                :lazy-load="true"
                :lazy-load-margin="0"
                :src="img || defComment"
                mode="aspectFill"
              ></image
            ></view>
          </view>

      
        </view>
      </view></view
    >
  </view>
</template>

<script>
export default {
  data() {
    return {
      commentList: [
        {
          id: 1,
          name: '叶轻眉',
          date: '12-25 18:58',
          contentText: '味道好，鱼香肉丝，鱼很好吃，光盘',
          url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
          allReply: 12,
          likeNum: 33,
          isLike: false,
          replyList: [
            {
              name: '哈哈',
              contentStr: 'good',
            },
            {
              name: '粘粘',
              contentStr: '环境好，味道好',
            },
          ],
        },
        {
          id: 2,
          name: '叶轻眉1',
          date: '01-25 13:58',
          contentText: '再次回购',
          allReply: 0,
          likeNum: 11,
          isLike: false,
          url: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
        },
        {
          id: 3,
          name: '叶轻眉2',
          date: '03-25 13:58',
          contentText: '很好吃，吃撑了打包带回家',
          allReply: 0,
          likeNum: 21,
          isLike: false,
          allReply: 2,
          url: './../../../static/img/test5.png',
          replyList: [
            {
              name: 'uview',
              contentStr: '赞赞赞',
            },
            {
              name: '豆包',
              contentStr: '还有免费的饮品冰淇淋太赞了',
            },
          ],
        },
        {
          id: 4,
          name: '叶轻眉3',
          date: '06-20 13:58',
          contentText: '真的太好吃了，不用等位',
          url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
          allReply: 0,
          likeNum: 150,
          isLike: false,
        },
      ],
    }
  },
  props: {
    commentData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    defaultAvatar() {
      return `${this.$fileUrl}/sysFile/avatar.png`
    },
    defComment(){
      return `${this.$fileUrl}/sysFile/img_default.png`
    }
  },
  onLoad() {
    this.getComment()
  },
  methods: {
    // 跳转到全部回复
    toAllReply() {
      uni.navigateTo({
        url: '/pages/subPack/components/reply',
      })
    },
    // 点赞
    getLike(index) {
      this.commentList[index].isLike = !this.commentList[index].isLike
      if (this.commentList[index].isLike == true) {
        this.commentList[index].likeNum++
      } else {
        this.commentList[index].likeNum--
      }
    },
    // 评论列表
    getComment() {},
  },
}
</script>

<style lang="scss" scoped>
.comment-box {
  margin: 0 30rpx;
}
.comment {    border-bottom: 1rpx solid #eeeeee;
  .user-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;margin-top: 30rpx;
    .user-avatar {
      margin-right: 20rpx;
      image {
        width: 58rpx;
        height: 58rpx;
        border-radius: 50%;
        background-color: #f2f2f2;
      }
    }
    .name {
      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 42rpx;
    }
    .time {
      margin-left: auto;
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #888888;
      line-height: 37rpx;
    }
  }

  .comment-content {
    margin-top: 23rpx;
    padding-bottom: 30rpx;
    .score {
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #888888;
      line-height: 37rpx;
      display: flex;
      justify-content: flex-start;
      text {
        margin-right: 10rpx;
      }
    }
    .content {
      width: 690rpx;

      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 40rpx;
      margin-top: 22rpx;
     
    }

    .comment-img-box {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin-top: 30rpx;
      .comment-img-item {
        width: 224rpx;
        height: 224rpx;
        margin-right: 8px;
        margin-bottom: 8rpx;

        image {
          width: 100%;
          height: 100%;
          border-radius: 14rpx;
        }
      }
    }
    .reply-box {
      background-color: rgb(242, 242, 242);
      border-radius: 12rpx;
      .item {
        padding: 20rpx;
        border-bottom: solid 2rpx $u-border-color;
        .username {
          font-size: 20rpx;
          color: #999999;
        }
      }
      .all-reply {
        padding: 20rpx;
        display: flex;
        color: #000;
        align-items: center;
        .more {
          margin-left: 6rpx;
        }
      }
    }
    .bottom {
      margin-top: 20rpx;
      display: flex;
      font-size: 20rpx;
      color: #9a9a9a;
      .reply {
        color: #000;
        margin-left: 10rpx;
      }
    }
  }
}
</style>
