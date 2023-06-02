<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-02 10:10:36
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-02 16:17:15
 * @FilePath: \mall-applet\pages\index\components\recommendation.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="content">
    <view class="lable">
      <view>问题和建议 <text class="star">*</text></view>
    </view>
    <view>
      <u-textarea
        v-model="form.recommendation"
        placeholder-class="placeholder_class"
        placeholder="请填写你的建议，感谢你的支持~ (必填)"
        count
        maxlength="500"
      ></u-textarea>
    </view>
    <view class="lable">
      <text>图片（选填，提供问题截图）</text>
    </view>
    <view>
      <upload v-model="form.fileList" width="200" height="200"></upload>
    </view>
    <view class="lable">
      <text>联系方式</text>
    </view>
    <view>
      <u-input
        placeholder-class="placeholder_class"
        placeholder="留下联系方式，更可能解决问题~"
        v-model="form.tel"
      ></u-input>
    </view>
    <view class="btn-footer">
      <button class="btn" @tap="submitForm">提交</button>
    </view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import upload from '@/components/upload'
export default {
  //import引入组件才能使用
  components: { upload },
  props: {},
  data() {
    return {
      form: {
        recommendation: '',
        fileList: [],
        tel: '',
        createTime: '2023-06-02',
        replyList: [],
      },
    }
  },
  // 计算属性
  computed: { ...mapGetters(['opinionList']) },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['setOpinionList']),
    submitForm() {
      if (!this.form.recommendation) {
        this.$tip.toast('请填写你的建议')
        return
      }

      this.setOpinionList(
        this.opinionList.concat(JSON.parse(JSON.stringify(this.form)))
      )
      this.form.recommendation = ''
      this.form.fileList = []
      this.form.tel = ''
      this.$tip.toast('谢谢你的建议，我们将尽快给你答复！')
    },
  },
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
  options: {
    styleIsolation: 'shared',
  },
}
</script>
<style>
.placeholder_class {
  font-size: 20rpx;
}
</style>
<style scoped lang="scss">
.content {
  background: #fff;
  border-radius: 30rpx;
  margin: 20rpx;
  padding: 40rpx 20rpx;
  .lable {
    margin-top: 40rpx;
    margin-bottom: 20rpx;
    color: #a67139;
    font-size: 24rpx;
  }
  .star {
    color: red;
  }
  .btn-footer {
    margin: 40rpx 60rpx;
    .btn {
      width: 200rpx;
      border-radius: 50rpx;
      background: #3b6dbb;
      color: #fff;
      border: none;
      font-size: 28rpx;
    }
  }
  .placeholder_class {
    font-size: 20rpx;
  }
}
</style>
