<template>
  <view>
    <defNav title="评价"></defNav>
    <!-- <view v-if="userInfo.userType == 1">
      <orderItem :orderInfo="orderItemDtos"></orderItem>
    </view>
    <view v-if="userInfo.userType == 2">
      <businessOrderList :orderInfo="orderItemDtos"></businessOrderList>
    </view> -->
    <view class="container">
      <view class="box-top">
        <view class="lable">
          <text v-if="orderItemDtos.status == 0">添加图片</text>
          <text v-if="orderItemDtos.status == 40">评价图片</text>
        </view>
        <view>
          <text
            v-if="orderItemDtos.status == 40 && fileList.length == 0"
          ></text>
          <view
            class="comment-img"
            v-if="orderItemDtos.status == 40 && fileList.length > 0"
          >
            <image
              class="comment-img-item"
              v-for="item in fileList"
              :src="item.url"
            ></image>
          </view>
          <template v-if="orderItemDtos.status == 0">
            <upload
              v-model="fileList"
              width="200"
              height="200"
              :showTips="showTips"
              :maxCount="maxCount"
            ></upload
          ></template>
        </view> </view
      ><u-gap height="12" bgColor="#F5F5F5"></u-gap>
      <view class="box-center">
        <view class="lable">
          <text>感受</text>
        </view>
        <view class="comment">
          <view>
            <text v-if="orderItemDtos.status == 40">{{ form.comment }}</text>
            <u-textarea
              height="400"
              v-else
              border="none"
              v-model="form.comment"
              placeholder-class="placeholder_class"
              placeholder="展开说说对商品的想法吧…"
              count
              maxlength="200"
            ></u-textarea>
          </view>
        </view>
      </view>
      <view class="box-footer">
        <view class="shop-info" v-if="userInfo.userType == 1">
          <image class="shop-img" :src="orderItemDtos.mainImage"></image>
          <view class="shop-right">
            <view class="shop-name"> {{ orderItemDtos.shopName }}</view>
            <view class="shop-people">
              到店人数：{{ orderItemDtos.numberOfPeople }}人
            </view>
          </view>
        </view>
        <view class="shop-info" v-if="userInfo.userType == 2">
          <image class="shop-img" :src="orderItemDtos.avatar||defaultAvatar"></image>
          <view class="shop-right">
            <view class="shop-name"> {{ orderItemDtos.nickName }}</view>
            <view class="shop-people">
              到店人数：{{ orderItemDtos.numberOfPeople }}人
            </view>
          </view>
   </view>
        <view class="shop-rating">
          <view class="rating">
            <text>体验感：</text>
            <u-rate
              activeColor="#EA531C"
              count="5"
              v-model="form.tasteRating"
              size="32"
              :readonly="orderItemDtos.status == 40"
            ></u-rate> </view
          ><view class="rating">
            <text>环境：</text>
            <u-rate
              activeColor="#EA531C"
              count="5"
              v-model="form.environmentalRating"
              :readonly="orderItemDtos.status == 40"
              size="32"
            ></u-rate></view
          ><view class="rating">
            <text>服务：</text>
            <u-rate
              activeColor="#EA531C"
              count="5"
              v-model="form.serviceRating"
              :readonly="orderItemDtos.status == 40"
              size="32"
            ></u-rate>
          </view>
        </view>
      </view>

      <button class="btn" @click="submit" v-if="orderItemDtos.status == 0">
        发布
      </button>
    </view>
  </view>
   
</template>

<script>
import upload from '@/components/upload'
 
import { orderDatail } from '@/api/order'
import { shopCommentsAdd, shopCommentsObj } from '@/api/shop'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('user')

export default {
  //import引入组件才能使用
  components: { upload,   },
  props: {},
  data() {
    return {
      form: {
        environmentalRating: 0,
        serviceRating: 0,
        tasteRating: 0,
        comment: '', // 评价内容
      },
      orderNo: '', // 订单号
      orderImg: '', // 订单图片地址
      orderId: '',
      orderItemDtos: {},
      fileList: [],
      maxCount: 4,
      showTips: true,
    }
  },
  // 计算属性
  computed: { ...mapGetters(['userInfo']),   defaultAvatar() {
      return `${this.$fileUrl}/sysFile/avatar.png`
    }, },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async submit() {
      if (!this.form.comment) {
        this.$tip.toast('请输入评论内容')
        return
      }
      let params = {
        orderId: this.orderItemDtos.id,
        shopId: this.orderItemDtos.shopId,
        ...this.form,
      }
      if (this.fileList.length > 0) {
        params.picturePathList = this.fileList.map((val) => val.url)
      }
      let { code } = await shopCommentsAdd({ ...params })
      if (code == 0) {
        this.$tip.successToast('评论成功')
        uni.$emit('refresh', { refresh: true })
        uni.navigateBack({ delta: 1 })
      }
    },
    async loadOrderDetail() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await orderDatail(this.orderId)
        this.orderItemDtos = res.data
        if (res.data.status == 40) {
          this.getCommentDetail()
        }
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },
    async getCommentDetail() {
      let res = await shopCommentsObj({
        orderId: this.orderId,
      })
      this.showTips = false
      this.form = res.data
      if (res.data.picture) {
        res.data.picture.split(',').forEach((val) => {
          this.fileList.push({
            url: val,
          })
        })
        this.maxCount = this.fileList.length
      }
    },
  },
  onLoad: function (options) {
    this.orderId = options.orderId
    this.loadOrderDetail()
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
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
<style>
page {
  background: #fff;
}
.placeholder_class {
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 42rpx;
}
</style>
<style scoped lang="scss">
.container {
  padding-bottom: 60rpx;
  // padding: 30rpx;
  .lable {
    font-size: 30rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 42rpx;
    margin-bottom: 20rpx;
  }
  .box-top {
    padding: 30rpx;
  }
  .comment-img {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .comment-img-item {
      width: 163rpx;
      height: 163rpx;
      border-radius: 14rpx;
      margin-right: 10rpx;
    }
    .comment-img-item:nth-last-child(1) {
      margin-right: 0;
    }
  }
  .box-center {
    padding: 30rpx;
  }
  .box-footer {
    border-top: 1rpx solid #eeeeee;
    padding: 30rpx;
    display: flex;

    flex-direction: column;
    align-items: flex-start;
    .shop-info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 30rpx;
      .shop-img {
        width: 93rpx;
        height: 93rpx;
        border-radius: 14rpx;
        margin-right: 20rpx;
      }
      .shop-right {
        .shop-name {
          font-size: 30rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 42rpx;
        }
        .shop-people {
          font-size: 26rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #888888;
          line-height: 37rpx;
          margin-top: 14rpx;
        }
      }
    }
  }
  .btn {
    width: 690rpx;
    height: 88rpx;
    background: #3b6dbb;
    border-radius: 14rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
  .order-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .rating {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .comment {
    textarea {
      width: 100%;
      height: 120px;
      border: 1px solid #ddd;
      padding: 10px;
    }
    button {
      height: 85rpx;
      background: #3b6dbb;
      border-radius: 10rpx;
      font-size: 30rpx;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      line-height: 85rpx;
      margin-top: 60rpx;
    }
  }
}
</style>
