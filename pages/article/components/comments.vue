<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-08-29 11:00:55
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-29 14:34:59
 * @FilePath: \mall-admind:\work\mall-applet\pages\article\components\comments.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view >
    <view v-for="item in list" :key="item.id" class="comment-box">
      
    <view class="page-user">
      <image
        class="user-avatar"
        :src="item.sysUserVo.avatar || defAvatar"
     
        lazy-load="false"
        binderror=""
        bindload=""
      >
      </image>
      <view class="user-name">{{ item.sysUserVo.nickName }} </view>
      <view class="time"
        ><image
          class="time-icon"
          :src="defTime"
          mode="aspectFit"
          lazy-load="false"
          binderror=""
          bindload=""
        >
        </image>
        <text> {{ item.createTime }}</text>
      </view>
    </view>
    <view class="content">{{ item.content }} </view>
    
  </view>
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  // 计算属性
  computed: {
    defTime() {
      return this.$fileUrl + '/sysFile/ic_shijian.png'
    },
    defAvatar() {
      return this.$fileUrl + '/sysFile/avatar.png'
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
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
.comment-box {
  margin: 0 30rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 40rpx;
  .page-user {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .user-avatar {
      width: 58rpx;
      height: 58rpx;
      border-radius: 50%;
      margin-right: 10rpx;
    }
    .user-name {
      color: #333333;
    }
    .time {
      margin-left: auto;
      color: #c0c0c0;
      line-height: 37rpx;
      font-size: 26rpx;
      display: flex;
      justify-content: flex-start;
      .time-icon {
        width: 33rpx;
        height: 33rpx;
        margin-right: 10rpx;
      }
    }
  }
  .content {
    margin-left: 68rpx;
    margin-top: 10rpx;
    border-bottom: 1rpx solid #eeeeee;
    padding-bottom: 30rpx;
    margin-bottom: 30rpx;
  }

 
}
.comment-box:last-child .content {
    border-bottom: none;
  }
</style>
