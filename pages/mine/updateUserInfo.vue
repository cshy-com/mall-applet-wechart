<template>
  <view class="form-box">
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u-form labelPosition="left" :model="model1" :rules="rules" ref="uForm">
      <u-form-item
        label="昵称"
        prop="userInfo.nickName"
        borderBottom
        ref="item1"
        labelWidth="100"
      >
        <u-input v-model="model1.userInfo.nickName" border="none"  ></u-input>
      </u-form-item>
      <u-form-item
        label="头像"
        prop="userInfo.avatar"
        borderBottom
        ref="item1"
        labelWidth="100"
      >
    
        <upload
          :maxCount="1"
          v-model="model1.userInfo.avatar"
          width="200"
          height="200"
          :maxSize="1"
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
import { updateUserInfo } from '@/api/index'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('user')
export default {
  components: { upload },
  data() {
    return {
      showSex: false,
      model1: {
        userInfo: {
          nickName: '',
          sex: '',
          avatar: [],
          // tel: 123242,
        },
      },
      actions: [
        {
          name: '男',
          index: 0,
        },
        {
          name: '女',
          index: 1,
        },
        {
          name: '未知',
          index: 2,
        },
      ],
      sexIndex: 0,
      rules: {
        'userInfo.nickName': {
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
        'userInfo.avatar': {
          type: 'array',
          required: true,
          message: '请选择上传头像',
          trigger: ['blur', 'change'],
        },
      },
      radio: '',
      switchVal: false,
      user: {},
      defaultAvatar:require('@/static/img/icon/head04.png')
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    ...mapMutations(['setUserInfo']),
   

    sexSelect(e) {
      this.model1.userInfo.sex = e.name

      this.sexIndex = e.index
      this.$refs.uForm.validateField('userInfo.sex')
    },
    submitForm() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          this.savaData()
        })
        .catch((errors) => {
          uni.$u.toast('校验失败')
        })
    },
    async savaData() {
      try {
        let params = {
          avatar: this.model1.userInfo.avatar[0].url,
          nickName: this.model1.userInfo.nickName,
          sex: this.sexIndex,
        }
        await updateUserInfo({ ...params })
        uni.$u.toast('修改成功')
        this.userInfo.avatar=params.avatar
        this.userInfo.nickName=params.nickName
        this.userInfo.sex=params.sex

        
        this.setUserInfo({ ...this.userInfo })
        uni.setStorageSync('user', { ...this.userInfo })
        uni.switchTab({
          url: '/pages/index/user/index',
        })
      } catch (e) {
        console.log(e)
      }
    },
  },
  watch: {
    model1: {
      handler(newVal, oldVal) {
        if (newVal.userInfo.avatar.length > 0) {
          this.$refs.uForm.validateField('userInfo.avatar')
        }
      },
      immediate: true,
      // 开启深度监听 deep
      deep: true,
    },
  },
  onReady() {
     
    this.model1.userInfo.nickName = this.userInfo.nickName
    this.model1.userInfo.sex = this.actions.find(
      (val) => val.index == this.userInfo.sex
    ).name
    this.sexIndex = this.userInfo.sex
    if( this.userInfo.avatar){
      this.model1.userInfo.avatar.push({
      url: this.userInfo.avatar,
    })
    }
    

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
