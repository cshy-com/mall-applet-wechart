<template>
  <view class="content">
    <defNav title="建议详情"></defNav>
    <recommenList
      :isGoDetails="false"
      :opinionList="opinionList"
    ></recommenList>

    <view class="reply-list-box">
      <view
        class="reply-list-item"
        v-for="rep in opinionInfo.replyList"
        :key="rep.id"
      >
        <view class="reply-list-box-top">
          <view class="reply-list-box-left">
            <image :lazy-load="true" :lazy-load-margin="0" :src="defLogo">
            </image>
            <text>清云私享客服</text>
          </view>
          <view class="reply-list-right">
            <image :lazy-load="true" :lazy-load-margin="0" :src="defTime">
            </image>
            <text>{{ rep.createTime }}</text>
          </view></view
        >

        <view class="reply-list-box-title"
          ><text>回复： {{ rep.content }}</text></view
        >
      </view>
    </view>
    <!-- <view class="content-box">
      <view class="content-item">
        <view class="content-item-left">
          <view class="sub-title"
            ><text>问题和建议：{{ opinionInfo.title }}</text></view
          >
          <view class=""
            ><text>建议内容：{{ opinionInfo.content }}</text></view
          >
          <view class=""
            ><text>联系方式：{{ opinionInfo.contactInfo||'' }}</text></view
          >
          <view class="content-img">
            <image
              v-for="img in opinionInfo.picturePathList"
              :key="img.id"
              :mode="'aspectFill'"
              :lazy-load="true"
              :lazy-load-margin="0"
              :src="img"
            ></image>
          </view>
          <view class="createTime">
            <text> 发布时间： {{ opinionInfo.createTime }} </text>
          </view>
       
        </view>
      </view>
    </view> -->
  </view>
</template>

<script>
import recommenList from '@/components/recommenList'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import { advicesInfo } from '@/api/index'
export default {
  //import引入组件才能使用
  components: { recommenList },
  props: {},
  data() {
    return { opinionId: null, opinionInfo: {}, opinionList: [] }
  },
  // 计算属性
  computed: {
    defLogo() {
      return this.$fileUrl + '/sysFile/img_logo.png'
    },
    defTime() {
      return this.$fileUrl + '/sysFile/ic_shijian.png'
    },
  },
  // 监听data中的数据变化
  watch: {},
  onLoad(option) {
    this.opinionId = option.id
    this.getDetail()
  },

  // 方法集合
  methods: {
    async getDetail() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await advicesInfo({ adviceId: this.opinionId })

        this.opinionInfo = res.data

        this.opinionList.push({
          replied: this.opinionInfo.replied,
          title: this.opinionInfo.title,
          content: this.opinionInfo.content,
          createTime: this.opinionInfo.createTime,
          contactInfo: this.opinionInfo.baseSysUserVo.phoneNumber,
          picture: this.opinionInfo.picture,
        })
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  onShow() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期：创建之前
  beforeMount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>
<style scoped lang="scss">
.reply-list-box {
  margin: 12rpx;
  .reply-list-item {
    background: #fff;
    border-radius: 14rpx;
    padding: 25rpx 30rpx 30rpx 30rpx;

    .reply-list-box-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #888888;
      line-height: 37rpx;
      padding-bottom: 25rpx;
      .reply-list-box-left {
        display: flex;
        align-items: center;
        image {
          width: 38rpx;
          height: 38rpx;

          border-radius: 50%;
          margin-right: 10rpx;
        }
      }
      .reply-list-right {
        display: flex;
        align-items: center;
        color: #c0c0c0;
        image {
          width: 33rpx;
          height: 33rpx;
          margin-right: 10rpx;
        }
      }
    }
    .reply-list-box-title {
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 40rpx;
      margin-top: 30rpx;
    }
  }
}
</style>
