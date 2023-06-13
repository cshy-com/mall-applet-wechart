<script>
import routingIntercept from '@/util/permission.js'
import { getAuthorization } from '@/util/auth'
export default {
  created() {
    let token = getAuthorization()
    if (!token) {
      uni.redirectTo({
        url: '/pages/public/login',
      })
    }
  },
  onLaunch: function () {
    //   uni.loadFontFace({
    //   global: true, // 是否全局生效
    //   family: 'font-name', // 定义的字体名称
    //   source: 'url("https://xxx.com/font/font-name.ttf")', // 字体资源的地址。建议格式为 TTF 和 WOFF，WOFF2 在低版本的iOS上会不兼容。
    //   success() {
    //     console.log('成功的回调函数')
    //   },
    //   fail(){
    //     console.log('失败的回调函数')
    //   },
    //   complete(){
    //     console.log('接口调用结束的回调函数（调用成功、失败都会执行）')
    //   }
    // })

    console.log('App Launch')
    // 对路由进行统一拦截，实现路由导航守卫 router.beforeEach 功能
    routingIntercept()
  },
  onReady() {},
  onShow: function () {  uni.hideTabBar({
        animation: false
      })
      },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>
<style lang="scss">
@import 'uview-ui/index.scss';
@import 'theme.scss';
@import 'uni.scss';
</style>
<style>
@import './common/uni.css';
@import './static/iconfont/iconfont.css';
@import url('./static/babes.css');
/*每个页面公共css */
page {
  background-color: #f5f5f5;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}

/* 列表样式 */
.projectList {
  width: 100%;
  background: #f5f5f5;
  border-top: 1px solid #ededed;
  padding-bottom: 28rpx;
}

.projectWicket {
  position: relative;
  margin: 0 28rpx;
  margin-top: 26rpx;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.2);
}

.recommended {
  position: absolute;
  top: 0;
  right: 28rpx;
  width: 74rpx;
  height: 44rpx;
  line-height: 44rpx;
  text-align: center;
  color: #ffffff;
  border-radius: 0 0 8rpx 8rpx;
  background: #d92c00;
}

.projectStore {
  position: relative;
  display: flex;
  width: calc(100% - 56rpx);
  padding: 28rpx;
  height: 110rpx;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #ededed;
  background: url(https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/store_bg.png)
    no-repeat;
  background-size: 70%;
  overflow: hidden;
  align-items: center;
}

.applyAllowed {
  display: flex;
  width: calc(100% - 56rpx);
  padding: 28rpx;
  height: 110rpx;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #ededed;
  background: url(https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/jiesbj.png)
    no-repeat;
  background-size: 100%;
}

/* .applyFinish{
		display: flex;
		width: calc(100% - 56rpx);
		padding: 28rpx;
		height: 110rpx;
		border-radius: 10px 10px 0 0;
		border-bottom: 1px solid #EDEDED;
		background: url(https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/jiesbj.png) no-repeat;
		background-size: 100%;
	} */

.watermark {
  position: absolute;
  top: -30rpx;
  right: -30rpx;
  width: 168rpx;
  z-index: 9;
}

.projectStore .logoImgs {
  display: block;
  width: 110rpx;
  height: 110rpx;
}

.taskStore {
  background: #ffffff;
}

.storeName {
  width: calc(100% - 134rpx);
  margin-left: 24rpx;
}

.storeNameText {
  line-height: 44rpx;
  color: #c9944b;
  font-size: 30rpx;
  font-weight: bold;
  margin-top: 10rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.taskNameText {
  color: #666666;
}

.storeAddress {
  align-items: center;
  line-height: 44rpx;
  color: #666666;
  font-size: 26rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.storeAddress image {
  display: inline-table;
  width: 32rpx !important;
  height: 32rpx !important;
  vertical-align: middle;
  margin-right: 10rpx;
  margin-top: -6rpx;
}

.projectTask {
  display: flex;
  align-items: center;
  width: calc(100% -56rpx);
  padding: 40rpx 28rpx;
}

.projectInformation {
  width: calc(100% - 218rpx);
}

.projectTaskName {
  line-height: 48rpx;
  color: #333333;
  font-size: 32rpx;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.projectTaskPrice {
  color: #b1876f;
  font-size: 36rpx;
  font-weight: bold;
}

.projectTaskPrice text {
  font-size: 23rpx;
}

.projectTaskPrice image {
  width: 38rpx;
  height: 38rpx;
  vertical-align: middle;
  margin-top: -6rpx;
  margin-left: 10rpx;
}
.projectBtns {
  flex: 1;
  padding-left: 28rpx;
}
.abandonTask {
  width: 190rpx;
  height: 76rpx;
  line-height: 76rpx;
  margin-top: 10rpx;
  background-color: #ff5722 !important;
  border-radius: 50rpx;
  font-size: 30rpx;
  letter-spacing: 2rpx;
}
.applyTask {
  width: 190rpx;
  height: 76rpx;
  line-height: 76rpx;
  background-color: #cca773 !important;
  border-radius: 50rpx;
  font-size: 30rpx;
  letter-spacing: 2rpx;
}

.applyTask:active {
  background: #e8d3ab !important;
}

.projectBase {
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 28rpx;
  color: #666666;
  font-size: 24rpx;
  border-radius: 0 0 10px 10px;
  background: #fafafa;
}

.remainingPlaces {
  float: left;
}

.remainingPlaces text {
  color: #333333;
  font-weight: bold;
}

.randomDraw {
  font-size: 26rpx;
}

.randomDraw .stateAngle {
  width: 10rpx;
  height: 10rpx;
  margin-top: 25rpx;
  margin-right: 16rpx;
  border-radius: 50%;
  background: #fdb53d;
  float: left;
}

.randomDraw .promptState {
  color: #333333;
  float: left;
}

.randomDraw .promptMessage {
  margin-left: 26rpx;
  font-size: 24rpx;
  color: #666666;
  float: left;
}

.randomDraw .promptMessage text {
  color: #cca773;
  padding: 0 10rpx;
}

.randomDraw .noCodes {
  background: #cca773;
}

.randomDraw .successful {
  background: #57d144;
}

.randomDraw .timeout {
  color: #d92c00;
}

.deadline {
  float: right;
}

.uni-data-checklist .checklist-group .checklist-box.is--tag {
  width: 30%;
  height: 74rpx;
  padding: 0 !important;
  margin: 10rpx 1.65% !important;
  border: none !important;
}

.uni-data-checklist .checklist-group .checklist-box .checklist-content {
  justify-content: center !important;
}

.uni-data-checklist .checklist-group .checklist-box.is--tag .checklist-text {
  color: #666666 !important;
}

.uni-data-checklist .checklist-group .checklist-box.is--tag.is-checked {
  background-color: rgba(204, 167, 115, 0.3) !important;
  background: url(https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/icon_selected.png)
    no-repeat;
  background-position: right bottom;
  background-size: 30rpx 30rpx;
}

.uni-data-checklist
  .checklist-group
  .checklist-box.is--tag.is-checked
  .checklist-text {
  color: #c9944b !important;
}

uni-button:after {
  border: none;
}

/* 我的任务 */
.tabStore .uni-badge {
  min-width: 12px !important;
  max-width: 26px !important;
  height: 16px !important;
  line-height: 12px !important;
}

.uni-steps__column-title {
  color: #666666 !important;
  font-size: 22rpx !important;
}

.uni-steps__column-desc span {
  color: #333333 !important;
  font-size: 26rpx !important;
  font-weight: bold !important;
}

.uni-steps__column-circle {
  background-color: #b1876f !important;
}

.uni-steps__column-text {
  border: none !important;
}

uni-radio .uni-radio-input,
uni-checkbox .uni-checkbox-input {
  width: 38rpx;
  height: 38rpx;
  margin-right: 0;
  margin-top: -2rpx;
}

.uni-radio-input-checked {
  background-color: #b1876f !important;
  border: 1px solid #b1876f !important;
}

.uni-checkbox-input-checked {
  color: #b1876f !important;
}

uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
  border-color: #b1876f !important;
}

.myService .uni-list-item__container {
  padding: 11.5px 19px !important;
}

.myService .uni-list-item__content-title {
  color: #333333 !important;
  font-weight: bold;
}

.myService .uni-list--border {
  width: calc(100% - 15px);
  margin-left: 15px;
}

.folding .uni-collapse-item__title {
  width: calc(100% - 15px) !important;
  margin-left: 15px !important;
}

.folding .uni-collapse-item__title-box {
  padding-left: 0 !important;
  color: #333333 !important;
  font-size: 28rpx !important;
  font-weight: bold !important;
}

.agreement uni-checkbox .uni-checkbox-input {
  margin-top: -6rpx !important;
}

.agreement uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
  font-size: 30rpx !important;
}

.bindingForm .uni-forms-item__label {
  width: 136rpx !important;
  height: 78rpx !important;
  padding: 0 !important;
  font-weight: bold !important;
}

.uni-forms-item__label .label-text {
  font-size: 30rpx !important;
}

.bindingForm .uni-forms-item__inner {
  padding: 14rpx 0 !important;
  border-bottom: 1px solid #ededed;
}

.bindingForm .uni-forms-item__content {
  display: flex;
  align-items: center;
}

.uni-countdown__number {
  width: auto !important;
  background-color: rgba(0, 0, 0, 0) !important;
  color: #666666 !important;
  margin: 2px 0 !important;
}

.surplusTime .uni-countdown__number,
.surplusTime .uni-countdown__splitor {
  height: 66rpx !important;
  line-height: 66rpx !important;
  margin: 0 !important;
  color: #b1876f !important;
  font-size: 24rpx !important;
  font-weight: bold !important;
}

.surplusTime .uni-countdown {
  padding: 0 !important;
}

.surplusTime .uni-countdown__splitor {
  line-height: 56rpx !important;
}

.examinationText .files-button {
  width: 200rpx;
  margin: 0 auto;
}

.file-picker__progress {
  display: none !important;
}

.uni-file-picker__lists-box,
.uni-file-picker__lists {
  border: none !important;
}
</style>

<style lang="scss">
.explainCont {
  background: #ffffff;
  overflow: hidden;
  height: 88vh;
  width: 88vw;
  border-radius: 10rpx;
  position: relative;
  .title {
    font-size: 16px;
    text-align: center;
    padding: 10px 0;
  }
  .content {
    padding: 0 10px 52px;
    .txt {
      font-size: 13px;
      text-indent: 13px;
      padding: 4px 0;
    }
  }
}
.explainBot {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: #ffffff;
  text-align: center;
  height: 52px;
  border-radius: 0 0 10rpx 10rpx;
  .timer {
    font-size: 14px;
    line-height: 52px;
  }
  .botBtn {
    height: 42px;
    margin: 0 20px;
    background: #c9944b;
    border-radius: 21px;
    color: #ffffff;
    font-size: 16px;
    line-height: 42px;
  }
}
</style>
