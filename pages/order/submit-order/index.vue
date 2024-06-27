<template>
  <view class="order-box">
    <defNav title="平台预定"></defNav>
    <u-form :model="orderInfo" :rules="rules" ref="uForm">
      <view class="caption"> 时间人数设置 </view>
      <u-form-item
        label="到店日期"
        prop="time"
        borderBottom
        ref="item1"
        labelWidth="200"
        :leftIcon="defIconDate"
      >
        <template slot="right">
          <view class="form-right" @click="dateShow">
            <text v-if="orderInfo.date">{{
              $u.timeFormat(orderInfo.date, 'yyyy-mm-dd')
            }}</text>
            <text v-else style="color: #c0c0c0" class="tip">请选择日期</text>
            <image
              :lazy-load="true"
              :lazy-load-margin="0"
              :src="defaultRight"
              class="right-icon"
            ></image
          ></view>
        </template>

        <u-calendar
          @close="isDateShow = false"
          :show="isDateShow"
          :mode="'single'"
          :color="'#3B6DBB'"
          :showMark="false"
          :rowHeight="130"
          startText="今天"
          ref="calendar"
          title="选择日期"
					:monthNum="12"
          @confirm="dateConfirm"
        ></u-calendar>
      </u-form-item>
      <u-form-item
        label="到店时间"
        prop="time"
        borderBottom
        ref="item1"
        labelWidth="200"
        :leftIcon="defIconTime"
      >
        <template slot="right">
          <view class="form-right" @click="pickerShow">
            <text v-if="orderInfo.time">{{ orderInfo.time }}</text>
            <text v-else style="color: #c0c0c0" class="tip"
              >请选择到店时间</text
            >
            <image
              :lazy-load="true"
              :lazy-load-margin="0"
              :src="defaultRight"
              class="right-icon"
            ></image
          ></view>
        </template>
        <!-- <u-popup :show="show" @close="close" round="15rpx">
          <view class="picker-box">
            <view class="picker-header">
              <view>选择时间</view>

              <image
                @click="show = false"
                :lazy-load="true"
                :lazy-load-margin="0"
                :src="defaultDel"
              ></image>
            </view>
            <view class="time-piker">
              <u-number-box
                v-model="hour"
                @change="hourChange"
                :step="1"
                :min="0"
              >
                <view slot="minus" class="minus">
                  <image
                    style="width: 68rpx; height: 68rpx"
                    class=""
                    :src="defIconReduce"
                    mode="aspectFill"
                    lazy-load="false"
                    binderror=""
                    bindload=""
                  >
                  </image>
                </view>
                <text slot="input" class="time-input">{{ hour.az() }}点</text>
                <view slot="plus" class="plus">
                  <image
                    style="width: 68rpx; height: 68rpx"
                    class=""
                    :src="defIconAdd"
                    mode="aspectFill"
                    lazy-load="false"
                    binderror=""
                    bindload=""
                  >
                  </image>
                </view>
              </u-number-box>

            
            </view>
            <view class="s-piker">
              <view
                class="s-picker-item"
                @click="changeMinute(item, index)"
                v-for="(item, index) in minutePicker"
                :key="item.id"
                :class="{ active: selectIndex == index }"
              >
                {{ item }}
              </view>
            </view>
            <view class="picker-value">
              {{ hour.az() }}:{{ minute.az() }}
            </view>
            <view class="picker-btn" @click="saveTime">
              <button>确定</button>
            </view>
          </view>
        </u-popup> -->
        <u-datetime-picker
          @close="show = false"
          @cancel="show = false"
          :show="show"
        
          ref="datetimePicker"
          v-model="time"
          mode="time"
          @confirm="confirm"
        
        ></u-datetime-picker>
      </u-form-item>

      <u-form-item
        label="到店人数"
        prop="number"
        borderBottom
        ref="item1"
        labelWidth="200"
        :leftIcon="defIconProple"
      >
        <template slot="right">
          <view class="form-right">
            <u-number-box
              :step="1"
              v-model="orderInfo.number"
              @change="valChange"
            >
              <view slot="minus" class="minus">
                <image
                  style="width: 56rpx; height: 56rpx"
                  class=""
                  :src="defIconReduce"
                  mode="aspectFill"
                  lazy-load="false"
                  binderror=""
                  bindload=""
                >
                </image>
              </view>
              <text slot="input" class="input">{{ orderInfo.number }}</text>
              <view slot="plus" class="plus">
                <image
                  style="width: 56rpx; height: 56rpx"
                  class=""
                  :src="defIconAdd"
                  mode="aspectFill"
                  lazy-load="false"
                  binderror=""
                  bindload=""
                >
                </image>
              </view>
            </u-number-box>
          </view>
        </template>
      </u-form-item>
      <view class="caption"> 其他服务设置 </view>
      <u-form-item
        :leftIcon="defIconSp"
        label="是否需要专人到场"
        prop="remark"
        borderBottom
        ref="item1"
        labelWidth="340"
      >
        <template slot="right">
          <view class="form-right" @click="groupChange">
            <image
              style="width: 102rpx; height: 56rpx"
              class=""
              :src="orderInfo.needCompanion ? defaultOpen : defaultClose"
              mode="aspectFill"
              lazy-load="false"
              binderror=""
              bindload=""
            ></image>
          </view>
        </template>
      </u-form-item>
      <u-form-item
        :leftIcon="defIconText"
        label="专属服务"
        prop="remark"
        ref="item1"
        labelPosition="top"
        labelWidth="200"
        class="last-item"
        ><u-textarea
          v-model="orderInfo.remark"
          placeholder="请输入"
          class="textarea-class"
          placeholderClass="placeholder-class"
        ></u-textarea>
      </u-form-item>
    </u-form>

    <view class="form-btn" @click="submitOrder">
      <button :disabled="!orderInfo.time || !orderInfo.date">下单</button>
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
        time: null,
        number: 1,
        remark: null,
        needCompanion: true,
        date: null,
      },
      show: false,

      time: null,
      rules: {
        'orderInfo.date': {
          type: 'string',
          required: true,
          message: '请选择到店日期',
          trigger: ['blur', 'change'],
        },
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

      needCompanionOptions: [
        {
          name: '需要',
          id: 1,
          disabled: false,
        },
        {
          name: '不需要',
          id: 0,
          disabled: false,
        },
      ],
      shopId: '',
      isDateShow: false,
      isDisabled: true,
      minutePicker: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
      hour: 0,
      selectIndex: -1,
      minute: 0,
    }
  },
  // 计算属性
  computed: {
    defIconDate() {
      return `${this.$fileUrl}/sysFile/ic_yud_daodian.png`
    },
    defIconTime() {
      return `${this.$fileUrl}/sysFile/ic_yud_shijian.png`
    },
    defIconProple() {
      return `${this.$fileUrl}/sysFile/ic_yud_renshu.png`
    },
    defIconSp() {
      return `${this.$fileUrl}/sysFile/ic_yud_zhunren.png`
    },
    defIconText() {
      return `${this.$fileUrl}/sysFile/ic_yud_fuwu.png`
    },
    defIconAdd() {
      return `${this.$fileUrl}/sysFile/ic_yud_jia.png`
    },
    defIconReduce() {
      return `${this.$fileUrl}/sysFile/ic_yud_jian_no.png`
    },

    defaultRight() {
      return `${this.$fileUrl}/sysFile/ic_bian_arrow.png`
    },

    defaultOpen() {
      return `${this.$fileUrl}/sysFile/ic_yud_xuanze_shi.png`
    },
    defaultClose() {
      return `${this.$fileUrl}/sysFile/ic_yud_xuanze_no.png`
    },
    defaultDel() {
      return `${this.$fileUrl}/sysFile/ic_yud_sanchu.png`
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    formatter(day) {
      const d = new Date()
      let month = d.getMonth() + 1
      const date = d.getDate()
      if (day.month == month && day.day == date ) {
        day.bottomInfo = '今天'
      }
      if (day.month == month && day.day == date + 1) {
        day.bottomInfo = '明天'
      }
      return day
    },
    changeMinute(item, index) {
      this.selectIndex = index
      this.minute = this.minutePicker[index]
    },
    saveTime() {
      this.orderInfo.time = `${this.hour.az()}:${this.minute.az()}`
      this.show = false
    },
    dateShow() {
      this.isDateShow = true
    },
    dateConfirm(e) {
      this.orderInfo.date = e[0]
      this.isDateShow = false
    },
    groupChange(n) {
      this.orderInfo.needCompanion = !this.orderInfo.needCompanion
    },

    pickerShow() {
      this.show = true
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
        let date = uni.$u.timeFormat(this.orderInfo.date, 'yyyy-mm-dd')
        await orderAdd({
          estimatedTime: `${date} ${this.orderInfo.time}:00`,
          numberOfPeople: this.orderInfo.number,
          remarks: this.orderInfo.remark,
          shopId: this.shopId,
          needCompanion: this.orderInfo.needCompanion ? 1 : 0,
        })
        this.$tip.toast('已预约，待客服确认')
        setTimeout(() => {
        uni.navigateBack()
        }, 1500)
      } catch (e) {
        console.log(e)
      }
    },
    valChange(e) {
      console.log('当前值为: ' + e.value)
    },
    hourChange(e) {
      console.log('当前值为: ' + e.value)
    },
    // formatter(type, value) {
    //   if (type === 'year') {
    //     return `${value}年`
    //   }
    //   if (type === 'month') {
    //     return `${value}月`
    //   }
    //   if (type === 'day') {
    //     return `${value}日`
    //   }
    //   if (type === 'hour') {
    //     return `${value}时`
    //   }
    //   if (type === 'minute') {
    //     return `${value}分`
    //   }
    //   return value
    // },
  },
  onReady() {
    // this.$refs.datetimePicker.setFormatter(this.formatter)
    this.$refs.uForm.setRules(this.rules)
    this.$refs.calendar.setFormatter(this.formatter)
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
.placeholder-class {
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #c0c0c0;
  line-height: 42rpx;
}
</style>
<style scoped lang="scss">
.caption {
  margin: 30rpx 0 30rpx 42rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #888888;
  line-height: 40rpx;
}
.right-icon {
  width: 16rpx;
  height: 24rpx;
  margin-left: 10rpx;
}
.order-box {
  /deep/ .u-form-item {
    margin: 0 12rpx;
    background: #fff;
    border-radius: 14rpx;
    padding: 30rpx 30rpx 0rpx 30rpx;
  }
  /deep/ .u-form-item__body {
    padding: 0 0 27rpx 0 !important;
  }
  /deep/ .u-icon__img {
    width: 42rpx !important;
    height: 42rpx !important;
    margin-right: 10rpx !important;
  }
  /deep/ .u-calendar-header__title,
  /deep/ .u-calendar-month__title,
  /deep/ .u-calendar-header__subtitle {
    font-size: 32rpx !important;
    font-family: PingFangSC-Medium, PingFang SC !important;
    font-weight: 500 !important;
    color: #333333 !important;
    line-height: 45rpx !important;
    text-align: left !important;
    text-indent: 30rpx !important;
  }
  /deep/ .u-calendar-header__title {
    padding-top: 30rpx !important;
  }
  /deep/ .u-calendar-month__title,
  /deep/ .u-calendar-header__subtitle {
    color: #000000 !important;
  }
  /deep/ .u-popup__content__close {
    .u-icon {
      border-radius: 50%;
      width: 44rpx;
      height: 44rpx;
      background: #e9e9ea;

      text {
        left: 8rpx;
        font-size: 26rpx !important;
      }
    }
  }
  .form-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    height: 99rpx; padding-bottom: env(safe-area-inset-bottom); 
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    );
    button {
      width: 630rpx;
      height: 70rpx;
      background: #3b6dbb;
      border-radius: 40rpx;

      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 70rpx;
      margin: 14rpx auto;

      
    }
    button[disabled] {
      opacity: 0.3;
    }
  }
  .minus,
  .plus {
    height: 56rpx;
  }

  .input {
    padding: 0 10px;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 40rpx;
    width: 75rpx;
    text-align: center;
  }

  .textarea-class {
  }
  /deep/ .u-textarea {
    margin-top: 20rpx;
    background: #f5f5f5;
    border-radius: 14rpx;
    border: none;
    padding: 30rpx 24rpx;
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
}
.picker-box {
  .picker-header {
    margin: 38rpx 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 45rpx;
    image {
      width: 44rpx;
      height: 44rpx;
    }
  }
  .time-piker {
    font-size: 32rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 42rpx;
    margin: 62rpx 30rpx 52rpx 30rpx;
    /deep/ .u-number-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .s-piker {
    margin-left: 30rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 120rpx;
    .s-picker-item {
      width: 162rpx;
      height: 88rpx;
      background: #f5f5f5;
      border-radius: 14rpx;
      margin-right: 14rpx;
      line-height: 88rpx;
      text-align: center;
      margin-bottom: 15rpx;
    }
    .active {
      background: #3b6dbb;
      color: #ffffff;
    }
    .s-picker-item:nth-child(4n) {
      margin-right: 0;
    }
  }
  .picker-value {
    width: 750rpx;
    height: 80rpx;
    background: #e9e9ea;
    text-align: center;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 80rpx;
  }
  .picker-btn {
    width: 750rpx;
    height: 99rpx;
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    );
    button {
      margin: 15rpx auto;
      width: 630rpx;
      height: 70rpx;
      background: #3b6dbb;
      border-radius: 40rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 70rpx;
    }
  }
}
</style>
