<template>
  <view>
    <view  v-if="userInfo.userType == 1">
      <orderItem :orderInfo="orderItemDtos"></orderItem>
    
    </view>
    <view  v-if="userInfo.userType == 2">
      <businessOrderList :orderInfo="orderItemDtos"></businessOrderList>
      </view>
    <view class="container">
      <view class="rating">
        <text>口味：</text>
        <u-rate
          activeColor="#FFC64F"
          count="5"
          v-model="form.tasteRating"
          size="32"
          :disabled="orderItemDtos.status == 40"
        ></u-rate> </view
      ><view class="rating">
        <text>环境：</text>
        <u-rate
          activeColor="#FFC64F"
          count="5"
          v-model="form.environmentalRating"
          :disabled="orderItemDtos.status == 40"
          size="32"
        ></u-rate></view
      ><view class="rating">
        <text>服务：</text>
        <u-rate
          activeColor="#FFC64F"
          count="5"
          v-model="form.serviceRating"
          :disabled="orderItemDtos.status == 40"
          size="32"
        ></u-rate>
      </view>
      <view class="lable">
        <text>评价图片</text>
      </view>
      <view>
        <text v-if="orderItemDtos.status == 40&&fileList.length==0"></text>
        <template v-else>
        <upload
          v-model="fileList"
          width="200"
          height="200"
          :showTips="showTips"
          :maxCount="maxCount"
        ></upload></template>
      </view>
      <view class="lable">
        <text><text style="color: #ff0000;">*</text>评价内容</text>
      </view>
      <view class="comment">
        <view>
          <text v-if="orderItemDtos.status == 40">{{ form.comment }}</text>
          <u-textarea
            v-else
            v-model="form.comment"
            placeholder-class="placeholder_class"
            placeholder="请输入评价内容"
            count
            maxlength="200"
          ></u-textarea>
        </view>
        <button @click="submit" v-if="orderItemDtos.status == 0">
          提交评价
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import upload from '@/components/upload'
import orderItem from './../components/order-item'
import businessOrderList from "./../components/business-order-item"
import { orderDatail } from '@/api/order'
import { shopCommentsAdd, shopCommentsObj } from '@/api/shop'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('user')

export default {
  //import引入组件才能使用
  components: { upload, orderItem,businessOrderList },
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
      maxCount:5,
      showTips:true
    }
  },
  // 计算属性
  computed: {   ...mapGetters(['userInfo']),},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async submit() {
      if(!this.form.comment){
        this.$tip.toast('请输入评论内容')
        return
      }
      let params={
        orderId: this.orderItemDtos.id,
        shopId: this.orderItemDtos.shopId,
        ...this.form,
      }
      if( this.fileList.length>0){
        params.picturePathList=this.fileList.map((val) => val.url)
      }
      let { code } = await shopCommentsAdd({...params})
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
      this.showTips=false
      this.form = res.data
      if (res.data.picture) {
        res.data.picture.split(',').forEach((val) => {
          this.fileList.push({
            url: val,
          })
        })
        this.maxCount=this.fileList.length
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
  font-size: 20rpx;
}
</style>
<style scoped lang="scss">
.container {
  padding: 20px;
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
      background: $Gradual-color;
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
