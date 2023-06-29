<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-20 15:04:02
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-28 17:55:57
 * @FilePath: \mall-admind:\work\mall-applet\pages\article\forumAdd.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="title">
      <u-input
        v-model="title"
        :value="title"
        placeholder="请输入标题"
        border="bottom"
        clearable
      ></u-input>
    </view>
    <cu-editor
      ref="editor"
      :url="uploadUrl"
      :header="header"
      :formData="formData"
      :content="content"
      @before="onUploadBefore"
      @update="onUpdate"
      @save="onSave"
      @release="onRelease"
    ></cu-editor>
  </view>
</template>

<script>
import cuEditor from '@/components/cu-editor/cu-editor'
import { handleHtmlImage } from '@/components/cu-editor/util'
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
    }
  },
  onLoad(options) {
    if (options.id) {
      console.log("options.id"+options.id)
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
    async getDetail() {uni.showLoading({
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
    async onRelease(e) {
      this.content = e.html
      try {
        if(this.id){
          await forumUpdate({
          title: this.title,
          content: this.content,
          id: this.id,
          status: 10,
        })
        }else{
          await forumAdd({
          title: this.title,
          content: this.content,
          status:10
         
        })
        }
       
        uni.navigateBack({})
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
        await http({ ...params })
        uni.navigateBack({})
      } catch (e) {
        console.log(e)
      }

      //       let html = e.html
      //       var containsImage = html.search(/<img /i) >= 0 //内容是否包含图片标签
      //       let txt = e.text.replace(/(^\s*)|[\r\n]|(\s*$)/g, '') //去掉换行符和两端空格
      // debugger
      //       uni.$emit('save', {
      //         html: txt == '' && !containsImage ? txt : html,
      //       })
    },
  },
}
</script>

<style></style>
