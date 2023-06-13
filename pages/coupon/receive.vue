<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-25 11:13:04
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-12 10:39:48
 * @FilePath: \mall-applet\pages\coupon\receive.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="btn-def"> <u-button @click="btnEvent" class="btn"  text="领取积分"    size="small"></u-button></view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {}
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    getUrlParams(url) {
        let o = {};    
        if (url.indexOf("?") != -1) {       
        let str = url.substr(url.indexOf("?") + 1).replace(/[#/|/#/]/g, "");       
        // console.log(str);       
        let strs = str.split("&");       
        // console.log(strs);      
        for (let i = 0; i < strs.length; i++) {      
        o[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);        
         }
        }
        return o;
      },
      // 领取积分
      btnEvent(){

      }
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  onLoad: function (options) {
    const { q } = options
    if (q) {
      let urlStr = decodeURIComponent(q)
  
      let urlParams = this.getUrlParams(urlStr)
      let code= urlParams.id
      console.log('urlParams'+urlParams)
      console.log('code'+code)

    }
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
<style scoped lang="scss">
  .btn-def {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 500rpx 0;
    margin: 0 auto;
    /deep/ button {
      background: #ff6a13;
      border-radius: 30rpx;
      color: #fff;
      height: 70rpx !important;
    }
  }
</style>
