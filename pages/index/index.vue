<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-12 14:21:39
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-07 18:01:24
 * @FilePath: \mall-applet\pages\index\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view> </view>
</template>

<script>
import { getAuthorization } from '@/util/auth'
export default {
  data() {
    return {}
  },
  created() {},
  onShow() {
    console.log('onshow')
    let token = getAuthorization()
    console.log('token:' + token)
    if (token) {
      uni.switchTab({
        url: '/pages/index/home/index',
      })
    } else {
      uni.navigateTo({
        url: '/pages/public/login',
      })
    }
  },
  methods: {},
}
</script>

<style></style>
