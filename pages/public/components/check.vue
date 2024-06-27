<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-11 10:42:54
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-07 09:26:22
 * @FilePath: \mall-applet\controls\check.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="check-view">
    <view @click="checked" class="check">
      <!-- <u-icon
        :name="check ? 'checkmark-circle-fill' : 'checkmark-circle'"
        size="40"
        :color="check ? '#000' : '#ccc'"
      ></u-icon> -->
      <image
              :lazy-load="true"
              :lazy-load-margin="0"
              :src="check?defaultSelectChecked:defaultChecked"
            ></image>

    </view>
    <view class="content">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'check',
  props: {
    config: {
      type: Object,
      default: function () {
        return {
          color: '#eeeeee',
          size: 40,
          selectedColor: '#FE4501',
        }
      },
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed:{
    defaultChecked(){
      return `${this.$fileUrl}/sysFile/ic_no_tongyixieyi.png`
    },
    defaultSelectChecked(){
      return `${this.$fileUrl}/sysFile/ic_yes_tongyixieyi.png`
    }
  },
  data() {
    return {
      check: false,
    }
  },
  created() {
    this.check = this.selected
  },
  watch: {
    selected(n, o) {
      this.check = n
    },
  },
  methods: {
    checked() {
      this.check = !this.check
      this.$emit('result', this.check)
    },
  },
}
</script>

<style scoped lang="scss">
.check-view {
  display: flex;
  align-items: center;
}

.check {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
  image{
width: 35rpx;
height: 35rpx;
  }
}

.content {
  margin-left: 10rpx;
}
</style>
