<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-08 17:00:40
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-13 15:57:24
 * @FilePath: \mall-applet\pages\index\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <!-- <userHome v-if="userType == 1" ref="userHomeRef"></userHome>
    <businessHome v-if="userType == 2"></businessHome> -->
  </view>
</template>

<script>
// import userHome from './userHome'
// import businessHome from './businessHome.vue'
export default {
  components: {
    // userHome,
    // businessHome,
  },
  data() {
    return {
      user: {},
    }
  },
  onLoad() {
    this.user = uni.getStorageSync('user')
    //1普通用户 2 商户
    if(this.user.userType==1){
      uni.switchTab({
         url: '/pages/index/home/userHome'
      })
    }else{
      
 
      uni.switchTab({url:'/pages/index/home/businessHome'})
    }

  },
  onShow(){
  },
  onPullDownRefresh() {
    // this.$refs.userHomeRef.current=0
    // this.$refs.userHomeRef.getAllCate()
    // this.$refs.userHomeRef.getCommodityRecommend()
    // setTimeout(function () {
    //   uni.stopPullDownRefresh()
    // }, 1000)
  },
  onReachBottom: function () {
    // this.$refs.userHomeRef.current++
    // this.$refs.userHomeRef.getCommodityRecommend()
  },
  methods: {},
}
</script>

<style></style>
