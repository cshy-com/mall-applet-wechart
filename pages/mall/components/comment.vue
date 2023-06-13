<template>
  <view class="comment-box">
    <view class="comment" v-for="(res, index) in commentList" :key="res.id">
      <view class="left"
        ><image
          :lazy-load="true"
          :lazy-load-margin="0"
          :src="res.url"
          mode="aspectFill"
        ></image
      ></view>
      <view class="right">
        <view class="top">
          <view class="name">{{ res.name }}</view>
          <view class="like" :class="{ highlight: res.isLike }">
            <view class="num">{{ res.likeNum }}</view>
            <u-icon
              v-if="!res.isLike"
              name="thumb-up"
              :size="30"
              color="#9a9a9a"
              @click="getLike(index)"
            ></u-icon>
            <u-icon
              v-if="res.isLike"
              name="thumb-up-fill"
              :size="30"
              @click="getLike(index)"
            ></u-icon>
          </view>
        </view>
        <view class="content">{{ res.contentText }}</view>
        <view class="reply-box">
          <view class="item" v-for="item in res.replyList" :key="item.index">
            <view class="username">{{ item.name }}</view>
            <view class="text">{{ item.contentStr }}</view>
          </view>
          <view
            class="all-reply"
            @tap="toAllReply"
            v-if="res.replyList != undefined"
          >
            共{{ res.allReply }}条回复
            <u-icon class="more" name="arrow-right" :size="26"></u-icon>
          </view>
        </view>
        <view class="bottom">
          {{ res.date }}
          <view class="reply">回复</view>
        </view>
      </view>
    </view>
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
  background: #fff;
  margin: 20rpx;
  padding: 20rpx;
  border-radius: 15rpx;
}
.comment {
  display: flex;
  padding: 10rpx;
  .left {
    image {
      width: 64rpx;
      height: 64rpx;
      border-radius: 50%;
      background-color: #f2f2f2;
    }
  }
  .right {
    flex: 1;
    padding-left: 20rpx;
    font-size: 24rpx;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name {
        color: #000;
      }
      .like {
        display: flex;
        align-items: center;
        color: #9a9a9a;
        font-size: 20rpx;
        .num {
          margin-right: 4rpx;
          color: #9a9a9a;
        }
      }
      .highlight {
        color: #000;
        .num {
          color: #000;
        }
      }
    }
    .content {
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
