<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-20 15:04:02
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-21 15:46:09
 * @FilePath: \mall-admind:\work\mall-applet\pages\article\forumAdd.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="title">
      <u-input placeholder="请输入标题" border="bottom" clearable></u-input>
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
    ></cu-editor>
  </view>
</template>

<script>
import cuEditor from '@/components/cu-editor/cu-editor'
import { handleHtmlImage } from '@/components/cu-editor/util'

export default {
  components: {
    cuEditor,
  },
  data() {
    return {
      content: '',
      uploadUrl: '',
      header: {},
      formData: {},
    }
  },
  onLoad(options) {
    if (options.item) {
      const item = JSON.parse(decodeURIComponent(options.item))
      item.content ? (this.content = item.content) : ''
    }
    wx.enableAlertBeforeUnload({
      message: '离开页面前请确认内容是否已保存',
    })
  },
  methods: {
    onUploadBefore: function () {
      this.formData = {
        timestamp: Date.parse(new Date()) / 1000,
      }
    },
    onUpdate(res) {
      res.html = handleHtmlImage(res.html)
      this.value = res.html
    },
    //保存
    onSave(e) {
      let html = e.html
      var containsImage = html.search(/<img /i) >= 0 //内容是否包含图片标签
      let txt = e.text.replace(/(^\s*)|[\r\n]|(\s*$)/g, '') //去掉换行符和两端空格
debugger
      uni.$emit('save', {
        html: txt == '' && !containsImage ? txt : html,
      })
    },
  },
}
</script>

<style></style>
