<template>
  <view class="order-box">
    <u-form labelPosition="left" :model="orderInfo" :rules="rules" ref="uForm">
      <u-form-item
        label="到店日期"
        prop="time"
        borderBottom
        ref="item1"
        labelWidth="130"
      >
        <text @click="pickerShow">{{
          $u.timeFormat(orderInfo.time, 'yyyy-mm-dd hh:MM')
        }}</text>
        <u-datetime-picker
          @close="show = false"
          @cancel="show = false"
          :show="show"
          :minDate="minDate"
          ref="datetimePicker"
          v-model="time"
          mode="datetime"
          @confirm="confirm"
          :formatter="formatter"
        ></u-datetime-picker>
      </u-form-item>

      <u-form-item
        label="到店人数"
        prop="number"
        borderBottom
        ref="item1"
        labelWidth="130"
      >
        <!-- button-size="36"
    color="#ffffff"
    bgColor="#2979ff"
    iconStyle="color: #fff"
    integer -->
        <u-number-box v-model="orderInfo.number" @change="valChange">
          <view slot="minus" class="minus">
            <u-icon name="minus" size="12"></u-icon>
          </view>
          <text
            slot="input"
            style="width: 50px; text-align: center"
            class="input"
            >{{ orderInfo.number }}</text
          >
          <view slot="plus" class="plus">
            <u-icon name="plus" color="#FFFFFF" size="12"></u-icon>
          </view>
        </u-number-box>
      </u-form-item>
      <u-form-item
        label="备注"
        prop="remark"
        borderBottom
        ref="item1"
        labelWidth="130"
        ><u-textarea
          v-model="orderInfo.remark"
          placeholder="请输入备注"
        ></u-textarea>
      </u-form-item>
    </u-form>

    <view class="form-btn" @click="submitOrder">
      <button>下单</button>
    </view>
  </view>
</template>

<script>
import { orderAdd } from '@/api/order'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      orderInfo: {
        time: Number(new Date()),
        number: 1,
        remark: null,
      },
      show: false,
      minDate: Number(new Date().getTime()),
      time: Number(new Date()),
      rules: {
        'orderInfo.time': {
          type: 'string',
          required: true,
          message: '请选择到店时间',
          trigger: ['blur', 'change'],
        },
        'orderInfo.number': {
          type: 'number',
          max: 100,
          min: 0,
          required: true,
          message: '请填写到店人数',
          trigger: ['blur', 'change'],
        },
      },
      shopId: '',
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    pickerShow() {
      this.show = true
      this.orderInfo.time = this.time
    },
    confirm(e) {
      this.show = false
      this.orderInfo.time = e.value
    },
    // 提交订单
    submitOrder() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          this.savaData()
        })
        .catch((errors) => {
          uni.$u.toast('校验失败')
        })
    },
    //发起订单请求
    async savaData() {
      try {
        await orderAdd({
          estimatedTime: uni.$u.timeFormat(
            this.orderInfo.time,
            'yyyy-mm-dd hh:MM:ss'
          ),
          numberOfPeople: this.orderInfo.number,
          remarks: this.orderInfo.remark,
          shopId: this.shopId,
        })
        uni.$u.toast('已预约，待客服确认')
        setTimeout(() => {
          uni.navigateBack()
        }, 3000)
      } catch (e) {
        console.log(e)
      }
    },
    valChange(e) {
      console.log('当前值为: ' + e.value)
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      }
      if (type === 'month') {
        return `${value}月`
      }
      if (type === 'day') {
        return `${value}日`
      }
      if (type === 'hour') {
        return `${value}时`
      }
      if (type === 'minute') {
        return `${value}分`
      }
      return value
    },
  },
  onReady() {
    this.$refs.datetimePicker.setFormatter(this.formatter)
    this.$refs.uForm.setRules(this.rules)
  },
  onLoad(option) {
    this.shopId = option.shopId
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
</style>
<style scoped lang="scss">
.order-box {
  padding: 30rpx;
  .form-btn {
    width: 200rpx;
    height: 85rpx;
    margin: 200rpx auto;
    button {
      height: 85rpx;
      background: $Gradual-color;
      border-radius: 10rpx;
      font-size: 30rpx;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      line-height: 85rpx;
    }
  }
  .minus {
    width: 22px;
    height: 22px;
    border-width: 1px;
    border-color: #e6e6e6;
    border-style: solid;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
    @include flex;
    justify-content: center;
    align-items: center;
  }

  .input {
    padding: 0 10px;
  }

  .plus {
    width: 22px;
    height: 22px;
    background-color: $Gradual-color;
    border-radius: 50%;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
    align-items: center;
  }
}
</style>
