<template>
  <view>
    <view class="store-block">
      <!-- #ifndef APP-NVUE || MP-TOUTIAO -->
      <u-swiper
        :list="list4"
        @change="(e) => (currentNum = e.current)"
        :autoplay="false"
        indicatorStyle="right: 20px"
        height="1000"
      >
        <view slot="indicator" class="indicator-num">
          <text class="indicator-num__text"
            >{{ currentNum + 1 }}/{{ list4.length }}</text
          >
        </view>
      </u-swiper>
      <!-- #endif -->
      <!-- 店铺文字信息部分 -->
      <view class="store-content-box">
        <!-- 第一行 -->
        <view class="title">
          <text class="name">寻味巴蜀2-3人餐</text>
        </view>
      </view>
    </view>
    <!-- 购买须知 -->
    <view class="notes-block">
      <view class="notes-content">
        <view class="notes-row">
          <text class="value"
            >种草很久了，来打个卡。由于来得早，店里还没客人，服务的大妈非常热心，各种帮忙，周到而不尴尬。店里推荐的鲍鱼超赞，非常新鲜，椰奶汤底也很香很好喝，食材都还不错。总体而言，除了价格略贵，算是一次不错的体验这家店的环境很干净整洁，也不吵闹，很适合文艺的年轻人，椰子鸡的很好吃，那个汤简直绝绝子了！！！晚上回去了之后躺在床上面还在那回味，那个鲍鱼不要太嫩哦！！！服务也特别到位，老板也很热情和蔼可亲，下次还去他们家！！！</text
          >

          <text class="value"
            >来吃过四次了！这次带朋友来五刷！椰子鸡真的很鲜美，鸡肉很嫩，吃到最后那个鸡的油都煮出来了，涮娃娃菜超级香。鲍鱼和牛肉粒也是我们的必点，菜品都很新鲜，品质很好，物有所值，以后还会来吃来吃来吃我npy都成喜乐野生代言人了！老跟别人夸好吃哈哈！老板代言费考虑结一下嘛</text
          >

          <text class="value"
            >朋友来苏实在想不到吃什么小姐妹推荐的这家味道不错食材也很新鲜尤其是鲍鱼个头超大煮过超嫩老板服务态度也超好周六去竟然没有要等位超幸运的四个人才五百多老板还给抹了0分量点的刚刚好小姐妹说如果我们点多了老板都会劝我们少点哈哈最后一点都没剩下次还会去的</text
          >
        </view>
      </view>
    </view>
    <u-gap height="40" bgColor="#f1f1f1"></u-gap>
    <!-- tab切换 -->

    <view class="wrap">
      <!--评价  -->
      <view class="comment-box">
        <view class="tab-header">
          <text> 评价(10)</text>
        </view>
        <comment></comment
      ></view>
      <!-- 推荐 -->
    </view>
    <!-- 底部操作按钮 -->
    <view class="footer-btn">
      <view class="footer-input">
        <u-input
          placeholder="说点什么吧"
          border="surround"
          v-model="value"
          @change="change"
        ></u-input>
      </view>
      <view class="foot-btn-def">
        <text class="iconfont icon-dianzan"></text>
        <text class="iconfont icon-dianzan"></text>
        <text class="iconfont icon-dianzan"></text>
      </view>
    </view>
  </view>
</template>

<script>
import comment from './../components/comment.vue'
import articleGrid from './../components/articleGrid.vue'
import commodity from './../components/commodity.vue'
import dataArr from './index.js'

export default {
  components: {
    articleGrid,
    comment,
    commodity,
  },
  data() {
    return {
      prods: dataArr.shopProds,
      prods2: dataArr.prods,
      currentNum: 0,
      list4: [
        {
          url: 'https://cdn.uviewui.com/uview/resources/video.mp4',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东',
          poster: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
          type: 'video',
        },
        {
          url: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          title: '身无彩凤双飞翼，心有灵犀一点通',
          type: 'image',
        },
        {
          url: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
        },
        {
          url: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          title: '身无彩凤双飞翼，心有灵犀一点通',
          type: 'image',
        },
        {
          url: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
        },
      ],
      tags: [
        '有包厢',
        '有空调',
        '免费茶水',
        '个性化服务',
        '有包厢',
        '有包厢',
        '有包厢',
        '有包厢',
        '有包厢',
      ],
      count: 5,
      value: 4.6,
      value: '',
    }
  },
  methods: {
    change(e) {
      console.log('change', e)
    },
    tab(index) {
      switch (index) {
        case 0:
          this.goto('.commodity-box')
          break
        case 1:
          this.goto('.comment-box')
          break
        case 2:
          this.goto('.article-grid-box')
          break
      }
    },
    // 跳转锚点
    goto(name) {
      uni
        .createSelectorQuery()
        .select(name)
        .boundingClientRect((data) => {
          //目标位置的节点：类class或者id
          uni
            .createSelectorQuery()
            .select('.wrap')
            .boundingClientRect((res) => {
              //最外层盒子的节点：类class或者id
              uni.pageScrollTo({
                duration: 100, //过渡时间
                scrollTop: data.top + 460 - res.top - 200, //到达距离顶部的top值
                // scrollTop:data.top - res.top,//如果置顶
              })
            })
            .exec()
        })
        .exec()
    },
  },
}
</script>
<style lang="scss" scoped>
.store-block {
  padding: 20rpx;
}
.indicator-num {
  padding: 2px 0;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 100px;
  width: 35px;
  @include flex;
  justify-content: center;

  &__text {
    color: #ffffff;
    font-size: 12px;
  }
}
.store-content-box {
  padding-bottom: 10rpx;
  line-height: 34rpx;

  .title {
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 20rpx 0 0 0;
    .name {
      width: 356rpx;
      font-size: 36rpx;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #000;
      margin-right: 20rpx;
    }
  }
}

.tab-header {
  font-size: 30rpx;
  border-left: 6rpx solid #ff6a13;
  padding-left: 14rpx;
  margin: 20rpx 20rpx 20rpx 20rpx;
  line-height: 30rpx;
  font-weight: 600;
}
.notes-block {
  .notes-content {
    margin: 20rpx;
    background: #fff;
    border-radius: 15rpx;
    padding: 20rpx;
    margin-top: 0;
    margin-bottom: 0;
    .notes-row {
      display: flex;
      flex-direction: column;

      .value {
        font-size: 24rpx;
        color: #333;
        margin-bottom: 10rpx;
      }
    }
  }
}
.footer-btn {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: space-around;
  background: #fff;
  padding: 15rpx;
  .footer-input {
    /deep/ input {
      width: 500rpx;
      height: 20rpx !important;
    }
    /deep/ .input-placeholder {
      font-size: 22rpx;
    }
    /deep/ .u-input {
      padding: 10rpx !important;
    }
  }
  .foot-btn-def {
    .iconfont {
      color: #000;
      font-size: 44rpx;
    }
  }
}
.wrap {
  padding-bottom: 100rpx;
}
</style>
