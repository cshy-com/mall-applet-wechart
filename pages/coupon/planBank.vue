<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-07-16 15:41:44
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-07-16 16:13:05
 * @FilePath: \mall-applet\pages\coupon\planBank.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
      <nodata
         
        :config="{
          content: '暂无数据',
          imgUrl: defaultImg,
        }"
      ></nodata>
    </div>
</template>

<script>
export default {
 
    components: {},
    props: {},
    data() {
        return {

        };
    },
    // 计算属性
    computed: {
      defaultImg() {
      return this.$fileUrl + '/sysFile/img_dingdan.png'
    },
    },
    // 监听data中的数据变化
    watch: {},
    // 方法集合
    methods: {

    },
    // 生命周期，创建完成时（可以访问当前this实例）
    created() {

    },
    // 生命周期：挂载完成时（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() { },//生命周期：创建之前
    beforeMount() { },//生命周期：挂载之前
    beforeUpdate() { },//生命周期：更新之前
    updated() { },//生命周期：更新之后
    beforeDestroy() { },//生命周期：销毁之前
    destroyed() { },//生命周期：销毁完成
    activated() { },//如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>
<style scoped>

</style>