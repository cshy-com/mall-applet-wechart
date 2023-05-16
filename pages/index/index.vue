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
