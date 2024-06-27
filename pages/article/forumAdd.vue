<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-20 15:04:02
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-01-16 15:42:12
 * @FilePath: \mall-admind:\work\mall-applet\pages\article\forumAdd.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="cci-end">
 
    <defNav title="发布论坛"></defNav>
    <template v-if="!isFocus">
    <view class="row">
      <view class="lable">
        <view>标题<text class="star">*</text></view>
      </view>
      <view class="title">
        <u-textarea
          v-model="title"
          :value="title"
          placeholder-class="placeholder_class"
          placeholder="请输入标题，有了标题会更受欢迎～"
          clearable
          count
          height="140rpx"
          border="none"
          maxlength="50"
        ></u-textarea>
      </view>
    </view>
  </template>
    <view class="row" :class="{'row-focus':!isFocus}">
      <view class="lable">
        <view>正文内容<text class="star">*</text></view>
      </view>

      <cu-editor
        ref="editor"
        :url="uploadUrl"
        :header="header"
        :formData="formData"
        :content="content"
        @onFocus="onFocus"
        @before="onUploadBefore"
        @update="onUpdate"
        @save="onSave"
        @onEditorBlur='onEditorBlur'
        @release="onRelease"
        placeholder="请输入你的想法，让更多人在主页看到你的优质想法～"
      ></cu-editor>
      <view class="btn-box">
        <button class="btn" @click.stop="goPage(0)">草稿箱</button>
        <button class="btn" @click.stop="goPage(20)">未通过</button>
      </view>
    </view>
  </view>
</template>

<script>
import cuEditor from './components/cu-editor/cu-editor.vue'
import { handleHtmlImage } from '@/util/util'
import { forumAdd, forumUpdate, forumDetail } from '@/api/index'
import comUtils from '@/util/comUtils.js'
import { getAuthorization } from '@/util/auth'
export default {
  components: {
    cuEditor,
  },
  data() {
    return {
      content: '',
      uploadUrl: comUtils.baseUrl + '/common/upload',
      header: {
        Authorization: 'Bearer ' + getAuthorization(),
        'Content-Type': 'multipart/form-data',
      },
      formData: {},
      id: '',
      title: '',
      isFocus:false
    }
  },
  onLoad(options) {
    if (options.id) {
      console.log('options.id' + options.id)
      this.id = options.id
      this.getDetail()
    }
    if (options.item) {
      const item = JSON.parse(decodeURIComponent(options.item))
      item.content ? (this.content = item.content) : ''
    }
    // wx.enableAlertBeforeUnload({
    //   message: '离开页面前请确认内容是否已保存',
    // })
  },
  methods: {
    onFocus(e){
      this.isFocus=true
    //   uni.createSelectorQuery().select(".cci-end").boundingClientRect((res)=>{
    //   console.log(res)
    //   const scrollH = res.height;
    //   console.log('cci-end:'+scrollH)
    //   uni.pageScrollTo({
    //     scrollTop: scrollH, //this.scrollHeightDefault+e.target.offsetTop+this.keyboardHeight, //滚动的距离
    //     duration: 30, //过渡时间
    //   })
    
    // }).exec()
//  this.$nextTick(()=>{
//   uni.pageScrollTo({
//         scrollTop: 3000, //this.scrollHeightDefault+e.target.offsetTop+this.keyboardHeight, //滚动的距离
//         duration: 30, //过渡时间
//       })
//  })
    },
    onEditorBlur(){
      this.isFocus=false                                                                                                          
    },
    goPage(status) {
      uni.navigateTo({
        url: `/pages/article/forumDraft?status=${status}`,
      })
    },
    async getDetail() {
      uni.showLoading({
        title: '加载中',
      })
      let res = await forumDetail(this.id)
      this.title = res.data.title
      this.content = res.data.content
      this.$refs.editor.onEditorReady()
      uni.hideLoading()
    },
    onUploadBefore: function () {
      this.formData = {
        timestamp: Date.parse(new Date()) / 1000,
      }
    },
    onUpdate(res) {
      res.html = handleHtmlImage(res.html)
      this.value = res.html
    },
    // 发布
    async onRelease(e) {
      this.content = e.html
      try {
        let params = {
          title: this.title,
          content: this.content,
          status: 10,
        }
        let http
        if (this.id) {
          http = forumUpdate
          params.id = this.id
        } else {
          http = forumAdd
        }
        let data = await http({ ...params })
        if (data.code == 0) {
          uni.showToast({
            title: '发布成功,等待审核',
            duration: 2000,
          })
          setTimeout(() => {
            uni.navigateBack({})
          }, 2000)
        }
      } catch (e) {
        console.log(e)
      }
    },
    //保存
    async onSave(e) {
      this.content = e.html

      try {
        let http = this.id ? forumUpdate : forumAdd
        let params = {
          title: this.title,
          content: this.content,
        }
        if (this.id) {
          params.id = this.id
        } else {
          params.status = 0
        }
        let data = await http({ ...params })
        if (data.code == 0) {
          uni.showToast({
            title: '保存成功',
            duration: 2000,
          })
          setTimeout(() => {
            uni.navigateBack({})
          }, 2000)
        }
      } catch (e) {
        console.log(e)
      }

     
    },
  },
  options: {
    styleIsolation: 'shared',
  },
}
</script>
<style>
.placeholder_class {
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
  line-height: 40rpx;
}
.ql-editor.ql-blank:before {
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
  line-height: 40rpx;
  font-style: normal;
}
</style>
<style lang="scss" scoped>
.row {
  padding: 30rpx;
  background: #fff;
  margin-bottom: 12rpx;
  /deep/ .u-textarea {
    padding: 0;
  }
  .lable {
    font-size: 30rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 42rpx;
    margin-bottom: 20rpx;
  }
  .star {
    font-size: 30rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ea531c;
    line-height: 42rpx;
  }
  .btn-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10rpx;
    position: relative;
    z-index: 999999;
//     padding-bottom: 60rpx;
// margin-bottom: 60rpx;
    .btn {
      width: 209rpx;
      height: 56rpx;
      background: #eeeeee;
      border-radius: 40rpx;
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #4474be;
      line-height: 56rpx;
      margin-right: 20rpx;
      padding: 0;
      margin-left: 0;
    }
    .btn::after {
      border: none;
    }
    .btn:nth-child(2) {
      color: #ea531c;
    }
  }
}
.row-focus{
  padding-bottom: 120rpx;
}
</style>
