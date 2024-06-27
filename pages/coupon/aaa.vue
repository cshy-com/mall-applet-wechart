<template>
  <view class="">
    <view class="recommendTop">
      <image
        src="https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/bean/bg4.png"
        class="bg"
      >
      </image>
      <view class="tips">
        <view class="p">①推荐好友注册星探店并完成实名认证，即得</view>
        <view class="resNum">{{ allRule.realAuth.pointsNum }} 探豆</view>
      </view>
      <view class="tips">
        <view class="p">②好友首次提交报告并审核通过，再得</view>
        <view class="resNum"
          >{{ allRule.recommendedAuditPass.pointsNum }} 探豆</view
        >
      </view>
    </view>
    <view class="recommendBtns" @click="handelgoGenerate">立即邀请</view>
    <view class="recommendTotal" v-if="successRec">
      <view class="item">
        <view class="info">
          成功推荐
          <text class="num">{{ successRec.recommendNum }}</text>
          <text class="unit">人</text>
        </view>
      </view>
      <view class="line"></view>
      <view class="item">
        <view class="info">
          累计奖励
          <text class="num">{{ successRec.recommendPointsNum }}</text>
          <text class="unit">探豆</text>
        </view>
      </view>
    </view>
    <view class="details">
      <view class="title">奖励明细</view>
      <view class="list">
        <view class="item" v-for="(item, idx) in dataList" :key="idx">
          <view class="nameTel">
            <view class="name">{{ item.nickname }}</view>
            <view class="tel">{{ item.phone }}</view>
          </view>
          <view class="others">
            <view class="txt">类型：推荐好友</view>
            <view class="txt">时间：{{ item.createTime }}</view>
          </view>
        </view>
      </view>
    </view>
    <uni-popup style="z-index: 99999999" :mask-click="false" ref="myPoster">
      <view class="generate-pic-content">
        <image
          @click="handelCancelPoster"
          src="https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/bean/icon_close@2x.png"
          class="closeBtn"
        ></image>
        <view class="canvasBox">
          <view class="title">我的邀请码</view>
          <canvas
            class="canvas"
            :style="{ width: canvasW + 'px', height: canvasH + 'px' }"
            canvas-id="myCanvas"
            id="myCanvas"
            @longtap="save"
          ></canvas>
        </view>
        <view class="generate-pic-btm" v-if="!firstCreate">
          <view class="save-text">分享给好友</view>
          <view class="save-btn-box">
            <!-- <view class="save-btn">
							<image
								src="https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/bean/icon_moments@2x.png">
							</image>
							<view class="text">分享朋友圈</view>
						</view> -->
            <view class="save-btn">
              <button open-type="share">
                <image
                  src="https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/bean/icon_wechat@2x.png"
                >
                </image>
                <view class="text">分享好友</view>
              </button>
            </view>
            <view class="save-btn" @click="handelSavePic">
              <button>
                <image
                  src="https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/bean/icon_save@2x.png"
                >
                </image>
                <view class="text">保存图片</view>
              </button>
            </view>
          </view>
          <view class="cancelBtn" @click="handelCancelPoster">取消</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import * as tandouApi from '@/api/tandou.js'
import comUtils from '@/util/comUtils.js'
export default {
  name: 'recommend',
  components: {},
  data() {
    return {
      allRule: {},
      successRec: null,
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      totalCount: 1,
      totalPage: 1, // 一共有多少页
      dataList: [],
      loading: false,
      /**
       * 推荐码参数
       * */
      share: {
        path: '/pages/index/index',
        imageUrl: '/static/img/Banner_default.png',
      },
      firstCreate: true,
      bgImgPath: '/static/img/share-bg.png',
      pixelRatio: 2,
      programCode: '', // 小程序码
      userHeadUrl: '',
      count: 0,
      loadingFlag: false, // 是否重新加载图片
      codeUrl: '',
      canvasStyle: {},
      canvasW: 0,
      canvasH: 0,
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/GET_USERINFO',
    }),
  },
  created() {
    this.listValidRule()
    this.getRecommendStat()
    this.pagePointsRecommend()
    if (this.userInfo.selfRecommendCode) {
      this.share.path = `/pages/index/index?scene=${encodeURIComponent(
        this.userInfo.selfRecommendCode
      )}`
      this.share.imageUrl =
        'https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/share-1.png'
    }
  },
  /**
   * 生命周期
   * 页面滚动到底部的事件
   */
  onReachBottom() {
    if (!this.loading && this.query.pageNo < this.totalPage) {
      this.query.pageNo++
      this.pagePointsRecommend()
    }
  },
  methods: {
    listValidRule() {
      tandouApi.listValidRule().then((res) => {
        const resData = res.data
        let allRule = {}
        resData.filter((item) => {
          allRule[item.ruleCode] = item
        })
        this.allRule = allRule
      })
    },
    getRecommendStat() {
      tandouApi.getRecommendStat().then((res) => {
        const resData = res.data
        this.successRec = resData
      })
    },
    pagePointsRecommend() {
      if (this.loading) return
      this.loading = true
      tandouApi.pagePointsRecommend(this.query).then((res) => {
        const resData = res.data
        this.dataList = resData.data
        this.totalCount = resData.totalCount
        this.totalPage = resData.totalPage
        this.$nextTick(() => {
          this.loading = false
        })
      })
    },
    /**
     * 推荐码方法合集
     * */
    handelCancelPoster() {
      this.$refs.myPoster.close()
    },
    handelgoGenerate() {
      this.$refs.myPoster.open('center')
      if (this.firstCreate) {
        this.$nextTick(() => {
          uni.showLoading({
            mask: true,
            title: '加载中',
          })
          this.getFileInfo()
        })
      }
    },
    getFileInfo() {
      const that = this
      // 请求接口 获取头像和小程序码的临时文件
      if (this.userInfo.selfRecommendCode) {
        that.downloadFile(this.userInfo.selfRecommendCode)
      } else {
        tandouApi.getRecommendUrl().then((res) => {
          const recommendCode = res.data.recommendCode
          that.downloadFile(recommendCode)
        })
      }
    },
    downloadFile(recommendCode) {
      const that = this
      const token = uni.getStorageSync('token')
      that.share.path = `/pages/index/index?scene=${encodeURIComponent(
        recommendCode
      )}`
      that.share.imageUrl =
        'https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/share-1.png'
      uni.downloadFile({
        url: `${
          comUtils.baseUrl
        }/mystical/wechat/client/getWxAcode?scene=${encodeURIComponent(
          recommendCode
        )}&width=500`,
        header: {
          Cookie: `token=${token}`,
        },
        success(downRes) {
          const tempFilePath = downRes.tempFilePath
          that.programCode = tempFilePath
          if (!that.loadingFlag) {
            that.initData()
            that.loadingFlag = true
          }
        },
      })
    },
    initData() {
      let that = this
      uni.getSystemInfo({
        success: function (res) {
          let canvasW = Math.round(res.screenWidth * 0.693)
          let canvasH = Math.round(canvasW * 1.284)
          that.pixelRatio = res.pixelRatio // 图片像素比
          that.canvasW = canvasW
          that.canvasH = canvasH
          that.canvasStyle = {
            width: `${canvasW}px`,
            height: `${canvasH}px`,
          }

          that.writeCanvas() // 暂时在此执行
        },
      })
    },
    writeCanvas() {
      let that = this
      const ctx = uni.createCanvasContext('myCanvas')
      let canvasW = that.canvasW
      let canvasH = that.canvasH
      let bgImgPath = that.bgImgPath
      let programCode = that.programCode // 小程序码

      /**
       * 画大背景 单位是 px 不是 rpx
       */
      ctx.drawImage(bgImgPath, 0, 0, canvasW, canvasH)
      // 保存上下文
      ctx.save()
      // // 恢复画布
      ctx.restore()
      /*
       ** 画小程序码
       */
      ctx.drawImage(
        programCode,
        that.computedPercent(85),
        that.computedPercent(165),
        that.computedPercent(117),
        that.computedPercent(117)
      )

      ctx.draw(true, () => {
        uni.hideLoading()
        that.firstCreate = false
      })
    },
    point(x, y) {
      return {
        x,
        y,
      }
    },
    // 保存图片
    handelSavePic() {
      let that = this
      uni.canvasToTempFilePath(
        {
          x: 0, // 起点横坐标
          y: 0, // 起点纵坐标
          width: that.canvasW, // canvas 当前的宽
          height: that.canvasH, // canvas 当前的高
          destWidth: that.canvasW * that.pixelRatio, // canvas 当前的宽 * 设备像素比
          destHeight: that.canvasH * that.pixelRatio, // canvas 当前的高 * 设备像素比
          canvasId: 'myCanvas',
          success: function (res) {
            //调取小程序当中获取图片
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                uni.showToast({
                  title: '图片保存成功！',
                  icon: 'none',
                })
              },
              fail: function (res) {
                console.log(res)
                if (
                  res.errMsg === 'saveImageToPhotosAlbum:fail auth deny' ||
                  res.errMsg === 'saveImageToPhotosAlbum:fail:auth denied'
                ) {
                  console.log('打开设置窗口')
                  that.doAuth()
                }
              },
            })
          },
          fail: function (res) {
            console.log(res)
          },
        },
        this
      )
    },
    // 分享给朋友

    // 获取授权
    doAuth() {
      uni.showModal({
        title: '获取授权',
        content: '您是否同意重新授权保存图片',
        cancelText: '不同意',
        confirmText: '好',
        confirmColor: '#21c0ae',
        success: function (res) {
          if (res.confirm) {
            // 点击确认
            uni.openSetting({
              success(settingdata) {
                console.log(settingdata)
                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                  console.log('获取权限成功，再次点击图片保存到相册')
                } else {
                  console.log('获取权限失败')
                }
              },
              fail: function (res) {
                console.log(res)
              },
            })
          }
        },
      })
    },
    /**
     * 计算比例
     * @param {String} value 像素（二倍图量出来的要除2）
     */
    computedPercent(value) {
      let currentWidth = this.canvasW
      let oldWidth = 288
      return Math.floor((value * currentWidth) / oldWidth)
    },
  },
}
</script>

<style lang="less" scoped>
.recommendTop {
  background-color: #fff;
  margin-bottom: 20rpx;
  position: relative;
  height: 280rpx;
  padding-top: 400rpx;

  .bg {
    width: 100%;
    height: 680rpx;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1;
  }

  .tips {
    position: relative;
    z-index: 2;
    text-align: center;
    padding-bottom: 32rpx;

    .p {
      font-size: 24rpx;
      color: #666;
    }

    .resNum {
      font-size: 32rpx;
      font-weight: bold;
      color: #b1876f;
      height: 56rpx;
      padding: 0 38rpx;
      background-color: #ededed;
      border-radius: 28rpx;
      display: inline-block;
      margin-top: 10rpx;
    }
  }
}

.recommendBtns {
  margin: 20rpx 110rpx 60rpx;
  height: 88rpx;
  border-radius: 44rpx;
  text-align: center;
  line-height: 88rpx;
  font-size: 32rpx;
  color: #fff;
  background-image: linear-gradient(#fc9f1e, #ed5e0d);
}

.recommendTotal {
  background-color: #fff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin: 36rpx;
  height: 104rpx;
  display: flex;
  align-items: center;

  .line {
    height: 56rpx;
    border-left: 1px solid #ededed;
  }

  .item {
    align-items: center;
    width: 50%;

    .info {
      font-size: 32rpx;
      color: #333333;
      text-align: center;

      .num {
        color: #cca773;
        padding: 0 8rpx;
      }

      .unit {
        color: #cca773;
        font-size: 24rpx;
      }
    }
  }
}

.details {
  background-color: #fff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin: 36rpx;

  .title {
    font-size: 30rpx;
    color: #333333;
    font-weight: bold;
    line-height: 100rpx;
    line-height: 100rpx;
    padding: 0 30rpx;
    border-bottom: 1px solid #ededed;
  }

  .list {
    .item {
      padding: 40rpx 30rpx;
      border-bottom: 1px solid #ededed;

      .nameTel {
        display: flex;
        color: #333;
        font-size: 30rpx;
        font-weight: bold;
        line-height: 40rpx;

        .name {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tel {
          width: 200rpx;
        }
      }

      .others {
        display: flex;
        padding-top: 15rpx;

        .txt {
          color: #999999;
          font-size: 24rpx;
          line-height: 32rpx;

          &:first-child {
            margin-right: 30rpx;
          }
        }
      }
    }
  }
}

.generate-pic-content {
  width: 100vw;
  height: 100vh;
  position: relative;

  .title {
    text-align: center;
    font-size: 32rpx;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 40rpx;
  }

  .closeBtn {
    position: absolute;
    z-index: 3;
    top: 50rpx;
    right: 32rpx;
    width: 60rpx;
    height: 60rpx;
  }

  .canvasBox {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 460rpx;
  }

  .canvas {
    margin: 0 auto;
  }

  .generate-pic-btm {
    background-color: #fafafa;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999999;
  }

  .save-text {
    font-size: 30rpx;
    color: #999;
    text-align: center;
    padding: 30rpx 50rpx;
  }

  .cancelBtn {
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
    color: #cca773;
    font-size: 28rpx;
    background-color: #ffffff;
  }

  .save-btn-box {
    padding: 0 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .save-btn {
      margin: 0 40rpx;
      font-size: 28rpx;
      text-align: center;

      image {
        width: 104rpx;
        height: 104rpx;
        display: block;
      }

      .text {
        color: #333333;
        font-size: 24rpx;
        margin: 20rpx 0 30rpx;
      }
    }
  }
}

button {
  background: none;
  &::after {
    border: 0;
  }
}
</style>
