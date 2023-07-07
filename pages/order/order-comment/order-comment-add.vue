<template>
  <view>
    <view>
      <orderItem :orderInfo="orderItemDtos"></orderItem>
    </view>
    <view class="container">
      <view class="rating">
        <text>口味：</text>
        <u-rate
          activeColor="#FFC64F"
          count="5"
          :value="form.satisfaction1"
          size="32"
        ></u-rate>
        <text>环境：</text>
        <u-rate
          activeColor="#FFC64F"
          count="5"
          :value="form.satisfaction1"
          size="32"
        ></u-rate>
        <text>服务：</text>
        <u-rate
          activeColor="#FFC64F"
          count="5"
          :value="form.satisfaction2"
          size="32"
        ></u-rate>
      </view>
      <view class="lable">
        <text>评价图片</text>
      </view>
      <view>
        <upload v-model="form.fileList" width="200" height="200"></upload>
      </view>
      <view class="lable">
        <text>评价内容</text>
      </view>
      <view class="comment">
        <view>
          <u-textarea
            v-model="form.comment"
            placeholder-class="placeholder_class"
            placeholder="请输入评价内容"
            count
            maxlength="200"
          ></u-textarea>
        </view>
        <button @click="submit">提交评价</button>
      </view>
    </view>
  </view>
</template>

<script>
import upload from '@/components/upload'
import orderItem from './../components/order-item'
import { orderDatail } from '@/api/order'
export default {
  //import引入组件才能使用
  components: { upload, orderItem },
  props: {},
  data() {
    return {
      form: {
        satisfaction1: 0,  
        satisfaction2: 0,
        satisfaction3: 0,
        comment: '', // 评价内容
        fileList: [],
      },
      orderNo: '', // 订单号
      orderImg: '', // 订单图片地址
      orderId: '',
      orderItemDtos: {},
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    submit() {
      // 提交评价逻辑
      // 可以在这里将评价内容、满意度等信息发送给后端进行保存或处理
      // 示例代码中只做了简单的打印输出
      console.log('提交评价:')
      console.log('订单号：', this.orderNo)
      console.log('满意度：', this.satisfaction)
      console.log('评价内容：', this.comment)
    },
    async loadOrderDetail() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await orderDatail(this.orderId)
        this.orderItemDtos = res.data
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
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
      width: 100%;
      height: 40px;
      background-color: #007aff;
      color: #fff;
      border: none;
      border-radius: 4px;
    }
  }
}
</style>
