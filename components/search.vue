
<template>
  <view class="search-box">
    <view class="search-input-box"
      ><input
        :value="inputValue"
        :type="'text'"
        placeholder-class="placeholder_class"
        placeholder="输入关键字搜索"
        @focus="focus"
        :disabled="disabled"
        confirm-type="search"
        :maxlength="maxlength"
        @confirm="confirm"
        @input="onKeyInput"
      />
    </view>
    <view class="search-btn" @click="search">
      <view class="search-btn-img">
        <image :src="require('@/static/icon/search.png')" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {
    maxlength: {
      type: Number,
      default: 20,
    },
    title: {
      type: String,
      default: '',
    },
    disabled:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return { inputValue: '' }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {
    title: {
      handler(e) {
        if (e) {
          this.inputValue = e
        }
      },

      deep: true,
      immediate: true,
    },
  },
  // 方法集合
  methods: {
    onKeyInput: function (event) {
      this.inputValue = event.target.value
    },
    focus() {
      this.$emit('focus')
    },
    confirm() {
      this.$emit('confirm', this.inputValue)
    },
    search() {
      this.$emit('confirm', this.inputValue)
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
}
</script>

<style scoped lang="scss">
.search-box {
  margin: 0 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search-input-box {
    width: 597rpx;
    height: 72rpx;
    border-radius: 14rpx;
    border: 2rpx solid #e1e4e9;
    padding-left: 30rpx;
    input {
      height: 100%;
    }
  }

  .placeholder_class {
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #cccccc;
    line-height: 42rpx;
  }
  .search-btn {
    width: 72rpx;
    height: 72rpx;
    background: $app-background-color;
    border-radius: 14rpx;
    margin-left: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-btn-img {
      width: 44rpx;
      height: 44rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
