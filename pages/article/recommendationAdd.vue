<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-02 10:10:36
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-01 17:26:52
 * @FilePath: \mall-applet\pages\index\components\recommendation.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <defNav title="产品建议"></defNav>

    <view class="content">
      <view class="row">
        <view class="lable">
          <view>标题（比如扫一扫） <text class="star">*</text></view>
        </view>
        <view>
          <u-textarea
            v-model="form.title"
            placeholder-class="placeholder_class"
            placeholder="请填写不超过50字的问题对象，以便我们更精准的为你提供服务"
            count
            height="140rpx"
            border="none"
            maxlength="50"
          ></u-textarea>
        </view>
      </view>
      <view class="row">
        <view class="lable">
          <view
            >问题描述（比如扫一扫点击之后没有反应）
            <text class="star">*</text></view
          >
        </view>
        <view>
          <u-textarea
            v-model="form.content"
            border="none"
            placeholder-class="placeholder_class"
            placeholder="请填写不超过200字的问题描述，以便我们更精准的为你提供服务"
            count
            height="288rpx"
            maxlength="500"
          ></u-textarea>
        </view>
      </view>
      <view class="row">
        <view class="lable">
          <text>上传凭证（提供问题截图 非必填）</text>
        </view>
        <view>
          <upload v-model="fileList" width="200" height="200" :tip="'上传凭证'"></upload>
        </view>
      </view>
      <view class="row tel">
        <view class="lable">
          <text>联系电话</text>
        </view>
        <view>
          <u-input
          border="none"
            placeholder-class="placeholder_class"
            placeholder="请输入联系方式（非必填）"
            v-model="form.contactInfo"
          ></u-input>
        </view>
      </view>
      <view class="btn-footer">
        <button
          class="btn"
          @tap="submitForm"
          :disabled="(!form.content) ||(!form.title)"
        >
          提交
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import upload from '@/components/upload'
import { advicesAdd } from '@/api/index'
export default {
  //import引入组件才能使用
  components: { upload },
  props: {},
  data() {
    return {
      form: {
        contactInfo: null,
        title: '',
        content: '',
      },
      fileList: [],
    }
  },
  options: {
    styleIsolation: 'shared',
  },
  // 计算属性
  computed: { ...mapGetters(['opinionList']) },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['setOpinionList']),
    async submitForm() {
      if (!this.form.title) {
        this.$tip.toast('请填写你的建议')
        return
      }
      if (!this.form.content) {
        this.$tip.toast('请详情描述你的建议')
        return
      }
      let picturePathList =
        this.fileList.length > 0 ? this.fileList.map((val) => val.url) : null
      let { code } = await advicesAdd({
        picturePathList: picturePathList,
        ...this.form,
      })
      if (code == 0) {
        ;(this.form = {
          contactInfo: null,
          title: '',
          content: '',
        }),
          (this.fileList = [])

        this.$tip.toast('谢谢你的建议，我们将尽快给你答复！')
      }
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
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
  line-height: 40rpx;
}
</style>
<style scoped lang="scss">
.content {
  .row {
    padding: 30rpx;
    background: #fff;
    margin-bottom: 12rpx;
    /deep/ .u-textarea {
      padding: 0;
    }
  }
  .lable {
    font-size: 30rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 42rpx;
    margin-bottom: 20rpx;
  }
  .tel{
    display: flex;
    justify-items: flex-start;
    align-items: center;
    .lable{
      margin-right: 30rpx;margin-bottom: 0;
    }
 
  }

  .star {
    font-size: 30rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ea531c;
    line-height: 42rpx;
  }
  .btn-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    padding-top: 10rpx;
    width: 750rpx;
    height: 99rpx;
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    );
    .btn {
      background: #3b6dbb;
      font-size: 32rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 80rpx;
    }
    button {
      width: 690rpx;
      height: 80rpx;
      border-radius: 40rpx;
      
    }
    button[disabled] {
      background: #3b6dbb;
      border-radius: 40px;
      opacity: 0.3;
    }
  }
  .placeholder_class {
    font-size: 20rpx;
  }
}
</style>
