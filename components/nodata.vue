<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-29 16:45:51
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-01 09:52:59
 * @FilePath: \mall-applet\components\nodata.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view
    class="no-data-view"
    :style="{ background: conf.background, height: conf.height }"
  >
    <image
      v-if="conf.imgUrl"
      :style="{
        width: conf.imgWidth,
        height: conf.imgHeight,
        'margin-top': conf.top + 'rpx',
      }"
      :src="conf.imgUrl ? conf.imgUrl : defImg"
    ></image>
    <image
      v-if="!conf.imgUrl"
      class="no-data"
      :src="defImg"
    ></image>
    <view
      :style="{
        color: conf.color,
        'font-size': conf.fSize + 'rpx',
        'padding-top': conf.txtTop + 'rpx',
      }"
      >{{ conf.content }}</view
    >
  </view>
</template>

<script>
export default {
  name: 'nodata',
  props: {
    config: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      conf: {
        type: '1',
        top: 285,
        imgWidth: '315rpx',
        imgHeight: '315rpx',
        imgUrl: '',
        content: '暂无数据',
        fSize: 28,
        color: '#888888',
        txtTop: 0,
        background: '#F2F4F5',
        height: '1015rpx',
      },
    }
  },
  computed: {
    defImg(){
      return this.$fileUrl + '/sysFile/img_zanwujilu.png'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.conf = Object.assign(this.conf, this.config)
    },
  },
}
</script>

<style scoped>
.no-data-view {
  text-align: center;
  background: #fff;
}
.no-data {
  width: 278rpx;
  height: 251rpx;
}
</style>
