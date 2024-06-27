import { nextTick } from 'vue';
<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-08-25 16:09:33
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-09-06 15:44:36
 * @FilePath: \mall-admind:\work\mall-applet\pages\coupon\transferQrcode.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="container">
    <defNav :isTransparent="true"></defNav>
    <!-- <canvas
      id="canvas"
      ref="canvas" type="2d"
      canvas-id="canvas"
      :height="canvasHeight"
      :width="canvasWidth"
    ></canvas> -->
    <canvas
      :style="{ width: `${canvasWidth}px;`, height: `${canvasHeight}px;` }"
      canvas-id="firstCanvas"
      class="canvas-box"
    ></canvas>
    <image
      class="canvas-img"
      :src="canvasSrc"
      mode="aspectFit"
      lazy-load="false"
      binderror=""
      bindload=""
    >
    </image>

    <view class="footer-btn">
      <button open-type="share" class="btn left-btn">分享给好友</button>

      <view class="btn right-btn" @click="downLoad">保存图片</view>
    </view>
  </view>
</template>

<script>
import { transferQrCodeDetails, getTransferInfo } from '@/api/integral'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      canvasHeight: 0,
      canvasWidth: 0,
      scale: 0,
      defCode: require('@/static/img/qrcode.png'),
      text: '转赠 1,000',
      canvasSrc: '',
      canvasData: {
        image_Width: 0,
        image_Height: 0,
      },
      // defQrcodeBorder: require('@/static/img/img_biankaung.png'),
      pixelRatio: 0,
      giftScore: 0,
      tempFilePath: null,
      id: null,
      userId: null,
    }
  },
  // 计算属性
  computed: {
    defBg() {
      return `${this.$fileUrl}/sysFile/img_zhuanzerwem_bg2.png`
    },
    defQrcodeBorder() {
      return `${this.$fileUrl}/sysFile/img_biankaung.png`
    },
    // defCode() {
    //   return ''//`${this.$fileUrl}/sysFile/qrcode.png`
    // },
  },
  onShareAppMessage() {
    return {
      title: `赠送${this.giftScore}积分给你，快来领取吧~`,
      imageUrl: this.canvasSrc,
      path: `/pages/coupon/transferScanCode?id=${this.id}&userId=${this.userId}`, // 路径，传递参数到指定页面。
    }
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    downLoad() {
      // 2-保存图片至相册
      debugger
      uni.saveImageToPhotosAlbum({
        // 存成图片至手机
        filePath: this.canvasSrc,
        success(res2) {
          wx.hideLoading()
          uni.showToast({
            title: '图片保存成功，可以去分享啦~',
            duration: 2000,
          })
        },
        fail(res3) {
          if (res3.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
            uni.showToast({
              title: '保存失败，稍后再试',
              duration: 2000,
              icon: 'none',
            })
            wx.hideLoading()
          } else {
            uni.showToast({
              title: '保存失败，稍后再试',
              duration: 2000,
              icon: 'none',
            })
            wx.hideLoading()
          }
        },
      })
    },
    // 计算比例
    computedPercent(value) {
      return Math.floor(this.scale * value)
    },
    // base64转临时路径
    base64ToPath(base64) {
      console.log('base64转临时地址开始')
      const time = new Date().getTime()
      const imgPath =
        wx.env.USER_DATA_PATH + '/poster' + time + 'share' + '.png'
      //如果图片字符串不含要清空的前缀,可以不执行下行代码.
      base64=base64.toString()
      console.log(base64)
      const imageData = base64.replace(/^data:image\/\w+;base64,/, '')
      console.log('base64转临时地址开始111111')
      const fs = wx.getFileSystemManager()
      console.log('base64转临时地址开始2222222222')
      fs.writeFileSync(imgPath, imageData, 'base64')
      console.log('base64转临时地址开始333333333333333')
      fs.close()
      console.log('base64转临时地址开始4444444444')
      return imgPath
    },

    /* 生成图片 */
    drawCanvas() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let ctx = uni.createCanvasContext('firstCanvas', this)
        uni.getImageInfo({
          src: this.defBg,
          success: (res) => {
            console.log('获取背景图成功', res)
            ctx.save()
            ctx.drawImage(res.path, 0, 0, this.canvasWidth, this.canvasHeight)
            ctx.draw(true)
            ctx.save()
            console.log('画背景图成功')
            uni.getImageInfo({
              src: this.defQrcodeBorder,
              success: (res1) => {
                console.log('获取二维码边框成功', res1)
                ctx.drawImage(
                  res1.path,
                  this.computedPercent(78.5),
                  this.computedPercent(215.5),
                  this.computedPercent(218),
                  this.computedPercent(218)
                ) //二维码边框
                ctx.draw(true)
                ctx.save()
                console.log('画二维码边框成功')
              },
            })
            console.log('开始画二维码')
            console.log(this.tempFilePath+'tempFilePath')
            ctx.drawImage(
              this.tempFilePath,
              this.computedPercent(90),
              this.computedPercent(225),
              this.computedPercent(195),
              this.computedPercent(195)
            ) //二维码
            ctx.draw(true)
            ctx.save()
            console.log('画二维码成功')
            console.log('开始设置文字')
            ctx.setFontSize(28)
            ctx.setFillStyle('#F5F5F5')
            ctx.textAlign = 'center'
            ctx.fillText(
              '转赠 ' + this.giftScore,
              this.computedPercent(375 / 2), // this.computedPercent(110),
              this.computedPercent(457.5)
            )
            console.log('设置文字成功')
            ctx.draw(
              true,
              setTimeout(() => {
                console.log('canvas开始转图片')
                uni.canvasToTempFilePath({
                  //将canvas生成图片
                  x: 0,
                  y: 0,
                  width: this.computedPercent(375), // 截取的画布的宽
                  height: this.computedPercent(723.5 * 1), // 截取的画布的高
                  destWidth: this.computedPercent(375 * 2), // 保存成的画布宽度
                  destHeight: this.computedPercent(723.5 * 2), // 保存成的画布高度
                  fileType: 'jpg', // 保存成的文件类型
                  quality: 1, // 图片质量
                  canvasId: 'firstCanvas', // 画布ID
                  success: (res) => {
                    console.log('canvas转图片成功')
                    console.log('res.tempFilePath==========', res.tempFilePath)
                    this.canvasSrc = res.tempFilePath
                  },
                  fail: (err) => {
                    console.log(err)
                  },
                })
              }, 500)
            )
          },
        })
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },
    async getTransferQrcode() {
      let res1 = await getTransferInfo(this.id)
      if (res1.code == 0) {
        this.giftScore = res1.data.credits
      }
      let res = await transferQrCodeDetails({
        codeId: this.id,
      })
      this.userId = res.data.userId
      this.tempFilePath = this.base64ToPath(res.data.base64)
      this.$nextTick(() => {
      this.drawCanvas()
    })
    },
  },
  onLoad(option) {
    this.giftScore = option.giftScore
    this.id = option.id
    this.userId = option.userId
    this.getTransferQrcode()
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    // this.defCode = uni.getStorageSync('giftScoreImg')
    // console.log('获取缓存中的二维码成功----------')
    // this.tempFilePath = this.base64ToPath(this.defCode)
    // console.log('二维码转临时地址成功----------')
    let getWindowInfo = uni.getWindowInfo()
    this.scale = getWindowInfo.screenWidth / 375

    this.canvasWidth = 375 * this.scale
    this.canvasHeight = 723.5 * this.scale
  },
  // 生命周期：挂载完成时（可以访问DOM元素）
  async mounted() {
   
  },
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
.container {
  padding-bottom: 30rpx;
}
.canvas-box {
  position: fixed;
  left: -100000rpx;
}
.canvas-img {
  z-index: 9;
  width: 750rpx;
  height: 1447rpx;
}
.footer-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 30rpx;

  z-index: 99;
  margin-bottom: 30rpx;
  padding-bottom: env(safe-area-inset-bottom);
  .btn {
    width: 330rpx;
    height: 98rpx;
    background: #d9e4f6;
    border-radius: 14rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4079d2;
    display: inline-block;
    text-align: center;
    line-height: 98rpx;
  }
  .btn::after {
    border: none;
  }
  .right-btn {
    background: #4079d2;
    color: #fff;
    margin-left: 30rpx;
  }
}
</style>
