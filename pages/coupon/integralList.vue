<template>
  <view>
    <view class="tab-subsection">
      <!-- <u-subsection
        :list="list"
        :current="current"
        :activeColor="'#3b6dbb'"
        mode="subsection"
        fontSize="28"
        @change="sectionChange"
      ></u-subsection> -->
      <view @click="dataPickerShow(0)" class="data-picker">
        <text v-if="st">{{ $u.timeFormat(st, 'yyyy-mm-dd')}} </text>
        <text v-else>开始时间</text>
        <u-icon name="arrow-down"></u-icon>
      </view>
      <view @click="dataPickerShow(1)" class="data-picker">
        <text v-if="et">{{ $u.timeFormat(et, 'yyyy-mm-dd')}} </text>
        <text v-else>结束时间</text>
        <u-icon name="arrow-down"></u-icon>
      </view>
    </view>
    <view class="empty" v-if="!dataList || dataList.length == 0">
      <u-empty
        mode="data"
        marginTop="120"
        iconSize="140"
        textSize="32"
        :text="'暂无数据'"
      >
      </u-empty>
    </view>
    <view v-else> 
      
    <view class="content-box" v-for="item in dataList" :key="item.id">
      <view class="content-item" v-if="userInfo.userType==1">
        <view class="content-item-left">
          <view class="sub-title over-ellipsis">
            <text v-if="item.creditsState == 0"
              >从{{ item.mallFirstPartyVo.name }}领取</text
            >
            <text v-if="item.creditsState == 2"
              >支付给{{ item.mallShopVo.name }}商家</text
            >
            <text v-if="item.creditsState == 3"
              >转赠给{{ item.toBaseSysUserVo.phoneNumber }}用户</text
            >
            <text v-if="item.creditsState == 4"
              >收到{{ item.sourceBaseSysUserVo.phoneNumber }}转赠</text
            >
            <text 
              >来源：{{ item.mallFirstPartyVo.name }}</text
            >
          </view>
          <view class="createTime">
            <text> {{ item.createTime }} </text>
          </view>
        </view>
        <view>
          <!-- :class="{ active: item.creditsState == '-' }" -->
          <view>
            <text v-if="[0, 4].includes(item.creditsState)">+</text>
            <text v-if="[2, 3].includes(item.creditsState)">-</text>
            <text>{{ item.creditsValue }}</text>
          </view>
        </view>
      </view>
      <view class="content-item" v-else>
        <view class="content-item-left">
          <view class="sub-title over-ellipsis">
            <text 
              >收到{{ item.baseSysUserVo.nickName }}支付</text
            >
            <text 
              >来源：{{ item.mallFirstPartyVo.name }}</text
            >
          </view>
          <view class="createTime">
            <text> {{ item.createTime }} </text>
          </view>
        </view>
        <view>
          <!-- :class="{ active: item.creditsState == '-' }" -->
          <view>
            <text>+</text>
            <text>{{ item.credits }}</text>
          </view>
        </view>
      </view>
    </view>
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

const { mapGetters, mapMutations ,mapActions} = createNamespacedHelpers('user')
import { getTotalPage } from '@/util/util'
import { creditsDetailsPage ,shopCreditsTotalPage} from '@/api/integral'
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
    }
  },
  // 计算属性
  computed: { ...mapGetters(['userInfo']) },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['seTenderDetails']),
    confirmDataValue(e) {
      if (this.pickerIndex == 0) {
        if(!["",null,undefined].includes(this.et)&&(e.value>=this.et)){
          this.$tip.toast('开始时间必须小于结束时间')
          return
        }
        this.st = e.value
      } else {
        if(!["",null,undefined].includes(this.st)&&(e.value<=this.st)){
          this.$tip.toast('开始时间必须小于结束时间')
          return
        }
        this.et =e.value
      }
      this.current=1
      this.getPageList()
      this.show=false
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
      let http=this.userInfo.userType==1?creditsDetailsPage:shopCreditsTotalPage
      try {
        let { code, data, total } = await http({
          current: this.current,
          size:this.size,
          startDate:this.st?uni.$u.date(this.st, 'yyyy-mm-dd')+' 00:00:00':null,
          endDate:this.et?uni.$u.date(this.et, 'yyyy-mm-dd')+' 23:59:59':null
        })
        if (code == 0) {
          this.total = total
          let totalPage = getTotalPage(this.total, this.size)
          if (this.current == 1) {
            this.dataList = data
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
<style>
page {
  background: #fff;
}
</style>
<style scoped lang="scss">
.tab-subsection {
  background: #fff;
  padding: 10rpx;
  display: flex;
  border-radius: 30rpx;
  border: 1px solid #dcd5d5;
  margin: 10rpx 20rpx;
  justify-content: space-around;
  .data-picker {
    display: flex;
    align-items: center;
  }
}
.content-box {
  position: relative;
  .content-item {
    padding: 20rpx;
    margin: 0rpx 20rpx 0 20rpx;

    display: flex;

    justify-content: space-between;
    position: relative;
    border-bottom: 1px solid #f1f1f1;
    background: #fff;
    border-radius: 20rpx;
    .active {
      color: #fd0a0a;
    }
    .content-item-left {
      .sub-title {
        font-size: 26rpx;
        color: #151515;
        line-height: 36rpx;
        display: flex;
    flex-direction: column;
        max-height: 72rpx;
      }
      .over-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .content-img {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        image {
          width: 200rpx;
          height: 200rpx;
          border-radius: 30rpx;
          margin-right: 20rpx;
        }
      }
      .createTime {
        color: #999;
        font-size: 22rpx;
      }
    }
    .reply {
    }
  }
}
.content-box::before {
  display: block;
  position: absolute;
  border-top: 1px solid #eee;
  width: 100%;
  bottom: 0;
  left: 0;
}
.content {
  padding-bottom: 20rpx;
}
</style>
