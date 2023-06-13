<template>
  <view class="form-box">
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u-form labelPosition="left" :model="model1" :rules="rules" ref="uForm">
      <!-- <u-form-item
        label="手机号"
        prop="userInfo.tel"
        borderBottom
        ref="item1"
        labelWidth="100"
      >
        <text>{{ model1.userInfo.tel }}</text>
      </u-form-item> -->
      <u-form-item
        label="昵称"
        prop="userInfo.name"
        borderBottom
        ref="item1"
        labelWidth="100"
      >
        <u-input v-model="model1.userInfo.name" border="none"></u-input>
      </u-form-item>
      <u-form-item
        label="头像"
        prop="userInfo.avater"
        borderBottom
        ref="item1"
        labelWidth="100"
      >
        <upload
          :maxCount="1"
          v-model="model1.userInfo.avater"
          width="200"
          height="200"
        ></upload>
      </u-form-item>
      <u-form-item
        label="性别"
        prop="userInfo.sex"
        borderBottom
        @click="
          showSex = true
          hideKeyboard()
        "
        ref="item1"
        labelWidth="100"
      >
        <u-input
          v-model="model1.userInfo.sex"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择性别"
          border="none"
        ></u-input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
    </u-form>
    <view class="form-btn">
      <button @click="submitForm">修改</button>
    </view>
    <u-action-sheet
      :show="showSex"
      :actions="actions"
      title="请选择性别"
      @close="showSex = false"
      @select="sexSelect"
    >
    </u-action-sheet>
  </view>
</template>

<script>
import upload from '@/components/upload'

export default {
  components: { upload },
  data() {
    return {
      showSex: false,
      model1: {
        userInfo: {
          name: '',
          sex: '',
          avater: [],
          // tel: 123242,
        },
      },
      actions: [
        {
          name: '男',
        },
        {
          name: '女',
        },
      ],
      rules: {
        'userInfo.name': {
          type: 'string',
          required: true,
          message: '请填写姓名',
          trigger: ['blur', 'change'],
        },
        'userInfo.sex': {
          type: 'string',
          max: 1,
          required: true,
          message: '请选择男或女',
          trigger: ['blur', 'change'],
        },
        'userInfo.avater': {
          type: 'array',
          required: true,
          message: '请选择上传头像',
          trigger: ['blur', 'change'],
        },
      },
      radio: '',
      switchVal: false,
      user: {},
    }
  },
  methods: {
    sexSelect(e) {
      this.model1.userInfo.sex = e.name
      this.$refs.uForm.validateField('userInfo.sex')
    },
    submitForm() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          uni.$u.toast('校验通过')
        })
        .catch((errors) => {
          uni.$u.toast('校验失败')
        })
    },
  },
  watch: {
    model1: {
      handler(newVal, oldVal) {
        if (newVal.userInfo.avater.length > 0) {
          this.$refs.uForm.validateField('userInfo.avater')
        }
      },
      immediate: true,
      // 开启深度监听 deep
      deep: true,
    },
  },
  onReady() {
    this.user = uni.getStorageSync('user')
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.uForm.setRules(this.rules)
  },
}
</script>
<style>
page {
  background: #fff;
}
</style>
<style lang="scss" scoped>
.form-box {
  padding: 30rpx;
  .form-btn {
    width: 200rpx;
    height: 85rpx;
    margin: 200rpx auto;
    button {
      height: 85rpx;
      background: $Gradual-color;
      border-radius: 10rpx;
      font-size: 30rpx;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      line-height: 85rpx;
    }
  }
}
</style>
