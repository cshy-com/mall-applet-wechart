<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-29 16:45:51
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-05-29 16:48:20
 * @FilePath: \mall-applet\components\nodata.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="no-data-view" :style="{ 'margin-top': conf.top + 'vh' }">
    <!-- <image
      v-if="conf.imgUrl"
      :style="{ width: conf.imgWidth, height: config.imgHeight }"
      :src="conf.imgUrl ? conf.imgUrl : '@/static/img/icon.png'"
    ></image> -->
    <!-- <image
      v-if="!conf.imgUrl"
      class="no-data"
      src="@/static/images/nodata.png"
    ></image> -->
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
        top: 22,
        imgWidth: 0,
        imgHeight: 0,
        imgUrl: '',
        content: '暂无数据',
        fSize: 30,
        color: '#B3B3B3',
        txtTop: 0,
      },
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
