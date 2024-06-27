<template>
  <view>
    <defNav title="积分明细" ></defNav>
    <view class="tab-subsection">
      <view class="flex-between-center tab-subsection-box">
        <view
          @click="dataPickerShow(0)"
          class="flex-between-center data-picker"
        >
          <text v-if="st">{{ $u.timeFormat(st, 'yyyy-mm-dd') }} </text>
          <text class="placeholder" v-else>开始时间</text>
          <image :src="defDown" mode="aspectFill"> </image>
        </view>
        <view class="line"> </view>
        <view
          @click="dataPickerShow(1)"
          class="flex-between-center data-picker"
        >
          <text v-if="et">{{ $u.timeFormat(et, 'yyyy-mm-dd') }} </text>
          <text class="placeholder" v-else>结束时间</text>
          <image :src="defDown" mode="aspectFill"> </image>
        </view>
        <view class="reset" @click="resetDate"> 重置 </view></view
      >
    </view>
    <view class="empty" v-if="!dataList || dataList.length == 0">
      <nodata
        v-if="noDate"
        :config="{
          content: '暂无数据',
          imgUrl: defaultImg,
        }"
      ></nodata>
    </view>
    <view v-else>
      <view class="content-box" v-for="item in dataList" :key="item.id">
        <view
          class="content-item"
          :class="{ 'content-item-freeze': item.creditsState == 5 }"
        >
          <view class="content-item-freeze-box" v-if="item.creditsState == 5">
            <view class="content-item-freeze-box-row" @click="goPage(item)">
              <text>当前状态</text>
              <text class="status">积分未被领取|去查看 > </text>
            </view>
          </view>
          <view class="content-item-row">
            <view class="flex-between-center row" v-if="userInfo.userType == 1">
              <view class="row-type">
                <text v-if="item.creditsState == 0"
                  >领取 从{{ item.mallFirstPartyVo.name }}领取</text
                >
                <text v-if="item.creditsState == 2"
                  >支付 给{{ item.mallShopVo.name }}商家</text
                >
                <text v-if="item.creditsState == 3"
                  >转赠 给{{ item.toBaseSysUserVo.phoneNumber }}用户</text
                >
                <text v-if="item.creditsState == 4"
                  >收到 {{ item.sourceBaseSysUserVo.phoneNumber }}转赠</text
                >
                <text v-if="item.creditsState == 5">转赠积分</text>
              </view>
              <view class="number">
                <text v-if="[0, 4].includes(item.creditsState)">+</text>
                <text v-if="[2, 3, 5].includes(item.creditsState)">-</text>
                <text>{{ item.creditsValue }}</text></view
              >
            </view>
            <view class="flex-between-center row" v-else>
              <view class="row-type">
                <text>收到{{ item.baseSysUserVo.nickName }}支付</text>
              </view>
              <view class="number">
                <text>+</text>
                <text>{{ item.credits }}</text>
              </view>
            </view>
            <view class="row">
              <view class="row-source" v-if="item.creditsState == 5">
                来源：我的积分</view
              >
              <view class="row-source" v-else>
                来源：{{ item.mallFirstPartyVo.name }}</view
              >
            </view>
            <view class="line"> </view>
            <view class="flex-between-center time">
              <image
                :src="defTime"
                :lazy-load="true"
                :lazy-load-margin="0"
                :mode="'aspectFill'"
              />
              <text>
                {{ item.createTime }}
              </text>
            </view>
          </view>
        </view>
      </view>
      <noMore v-if="more == 'noMore' && current > 1"></noMore>
    </view>
    <u-datetime-picker
      :show="show"
      v-model="dataValue"
      mode="date"
      @cancel="show = false"
      @confirm="confirmDataValue"
    ></u-datetime-picker>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('user')
import { getTotalPage } from '@/util/util'
import { creditsDetailsPage, shopCreditsTotalPage } from '@/api/integral'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      list: ['全部', '已使用', '已失效'],
      size: 10,
      current: 1,
      total: 0,
      dataList: [],
      more: 'more',
      show: false,
      dataValue: Number(new Date()),
      pickerIndex: 0,
      st: null,
      et: null,
      noDate: false,
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['userInfo']),
    defTime() {
      return this.$fileUrl + '/sysFile/ic_shijian.png'
    },
    defDown() {
      return this.$fileUrl + '/sysFile/ic_mx_arrow.png'
    },
    defaultImg() {
      return this.$fileUrl + '/sysFile/img_zanwu_tuijian.png'
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['seTenderDetails']),
    goPage(item) {
      uni.navigateTo({
        url: `/pages/coupon/transferQrcode?id=${item.remarks}&userId=${item.userId}&source=list`,
      })
    },
    resetDate() {
      this.st = null
      this.et = null
      this.current = 1
      this.getPageList()
    },
    confirmDataValue(e) {
      if (this.pickerIndex == 0) {
        if (!['', null, undefined].includes(this.et) && e.value >= this.et) {
          this.$tip.toast('开始时间必须小于结束时间')
          return
        }
        this.st = e.value
      } else {
        if (!['', null, undefined].includes(this.st) && e.value <= this.st) {
          this.$tip.toast('开始时间必须小于结束时间')
          return
        }
        this.et = e.value
      }
      this.current = 1
      this.getPageList()
      this.show = false
    },
    dataPickerShow(index) {
      this.show = true
      this.dataValue = Number(new Date())
      this.pickerIndex = index
    },
    open() {
      // console.log('open');
    },
    close() {
      this.show = false
      // console.log('close');
    },
    async getPageList() {
      uni.showLoading({
        title: '加载中',
      })
      let http =
        this.userInfo.userType == 1 ? creditsDetailsPage : shopCreditsTotalPage
      try {
        let { code, data, total } = await http({
          current: this.current,
          size: this.size,
          startDate: this.st
            ? uni.$u.date(this.st, 'yyyy-mm-dd') + ' 00:00:00'
            : null,
          endDate: this.et
            ? uni.$u.date(this.et, 'yyyy-mm-dd') + ' 23:59:59'
            : null,
        })
        if (code == 0) {
          this.total = total
          let totalPage = getTotalPage(this.total, this.size)
          if (this.current == 1) {
            this.dataList = data
            this.noDate = total == 0
          } else {
            this.dataList = [...this.dataList, ...data]
          }

          if (totalPage > this.current) {
            this.more = 'more'
          } else {
            this.more = 'noMore'
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },
    sectionChange(index) {
      this.current = index
    },
  },
  onPullDownRefresh() {
    this.current = 1
    this.getPageList()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  // 上拉触底事件
  onReachBottom: function () {
    if (this.more == 'more') {
      this.current++
      this.getPageList()
    }
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  onLoad(option) {
    this.getPageList()
  },
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
.tab-subsection {
  background: #fff;

  height: 98rpx;
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;

  line-height: 42rpx;
  color: #333333;

  .tab-subsection-box {
    padding: 17rpx 30rpx;
  }

  .data-picker {
    width: 208rpx;

    background: #f5f5f5;
    padding: 13rpx 32rpx;
    border-radius: 32rpx;
    .placeholder {
      color: #c7c7cc;
      font-size: 28rpx;
      line-height: 40rpx;
    }
    image {
      width: 24rpx;
      height: 16rpx;
    }
  }
  .line {
    width: 28rpx;
    height: 1px;
    margin: 0 10rpx 0 10rpx;
    border-bottom: 1rpx solid #ceced2;
  }
  .reset {
    color: #3b6dbb;
    margin-left: 36rpx;
  }
}
.over-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.flex-between-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-box {
  position: relative;
  .content-item {
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 40rpx;
    margin: 12rpx 12rpx 0 12rpx;
    background: #fff;
    border-radius: 14rpx;
    .content-item-row {
      background: #fff;
      border-radius: 14rpx;
      padding: 0 30rpx;
      padding-top: 30rpx;
      padding-bottom: 25rpx;
    }

    .row {
      .row-type,
      .number {
        font-size: 30rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .row-source {
        margin: 10rpx 0 20rpx 0;
      }
      .row-type {
        width: 500rpx;
      }
    }
    .line {
      width: 666rpx;
      height: 1rpx;
      border-bottom: 2rpx solid #eeeeee;
      margin-bottom: 20rpx;
    }
    .time {
      font-size: 26rpx;

      color: #c0c0c0;
      justify-content: flex-start;
      image {
        width: 26rpx;
        height: 26rpx;
        margin-right: 6rpx;
      }
    }
  }
  .content-item-freeze {
    background: #e2e7ef;
    .content-item-freeze-box {
      margin: 0 30rpx;
      .content-item-freeze-box-row {
        padding-top: 17rpx;
        padding-bottom: 17rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 37rpx;
        .status {
          color: #3b6dbb;
        }
      }
    }
  }
}
</style>
