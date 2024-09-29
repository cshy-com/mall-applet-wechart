<template>
  <view>
    <defNav title="个人资料"></defNav>
    <view class="form-box">
      <view class="form-box-item">
        <view class="form-box-item-row">
          <view class="label">头像</view>
          <button
            class="avatar-wrapper item-right"
            open-type="chooseAvatar"
            @chooseavatar="upLoadAvatar"
          >
            <!-- <view class="item-right" @click="upLoadAvatar"> -->
            <image
              mode="aspectFill"
              class="avater"
              :src="userInfoForm.avatar || defaultAvatar"
            >
            </image>
            <image mode="aspectFill" :src="defaultRight" class="right-icon">
            </image>
            <!-- </view>   -->
          </button>
        </view>

        <view class="form-box-item-line"></view>
        <view class="form-box-item-row">
          <view class="label">昵称</view>
          <view class="item-right">
            <input
              @blur="savaNickName"
              @confirm="savaNickName"
              confirm-type="nickname"
              v-model="userInfoForm.nickName"
              :maxlength="10"
              type="nickname"
            />

            <image mode="aspectFill" :src="defaultRight" class="right-icon">
            </image>
          </view>
        </view>
      </view>
      <view class="form-box-item" @click="showSex = true">
        <view class="form-box-item-row">
          <view class="label">性别</view>
          <view class="item-right">
            <text>{{
              userInfoForm.sex == 0
                ? '男'
                : userInfoForm.sex == 1
                ? '女'
                : '未知'
            }}</text>
            <image mode="aspectFill" :src="defaultRight" class="right-icon">
            </image>
          </view>
        </view>
      </view>

      <view class="view-action" v-if="showSex">
        <u-action-sheet
          :show="showSex"
          :actions="actions"
          :safeAreaInsetBottom="true"
          @close="showSex = false"
          @select="sexSelect"
          :cancelText="'取消'"
          round="27rpx"
        >
        </u-action-sheet>
      </view>
    </view>
  </view>
</template>

<script>

import { updateUserInfo } from '@/api/index'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('user')
import comUtils from '@/util/comUtils.js'
import { getAuthorization } from '@/util/auth'
export default {
  components: {  },
  options: { styleIsolation: 'shared' },
  data() {
    return {
      showSex: false,
      userInfoForm: {
        nickName: '',
        sex: '',
        avatar: [],
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

      radio: '',
      switchVal: false,
      user: {},
      uploadImgUrl: comUtils.baseUrl + '/common/upload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getAuthorization(),
        'Content-Type': 'multipart/form-data',
      },
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    defaultRight() {
      return `${this.$fileUrl}/sysFile/ic_bian_arrow.png`
    },
    defaultAvatar() {
      return `${this.$fileUrl}/sysFile/avatar.png`
    },
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    upLoadAvatar(e) {
      const { avatarUrl } = e.detail
      if (avatarUrl) {
        this.uploadAvatar(avatarUrl)
        return
      }
      let _this = this
      uni.chooseImage({
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths
          _this.uploadAvatar(tempFilePaths[0])
        },
      })
    },
    uploadAvatar(url) {
      uni.uploadFile({
        url: this.uploadImgUrl, //仅为示例，非真实的接口地址
        header: this.headers,
        filePath: url,
        name: 'file',
        formData: {
          // file: url,
        },
        success: (uploadFileRes) => {
          let res = JSON.parse(uploadFileRes.data)
          this.userInfoForm.avatar =  res.url
          this.savaData({ avatar: res.url, sex: this.userInfoForm.sex })
        },
      })
    },
    savaNickName() {
 
      // if (this.userInfoForm.nickName !== this.userInfo.nickName) {
        this.savaData({
          nickName: this.userInfoForm.nickName,
          sex: this.userInfoForm.sex,
        })
      // }
    },
    sexSelect(e) {
      this.userInfoForm.sex = e.index
      this.savaData({
        sex: this.userInfoForm.sex,
      })
    },

    async savaData(params) {
      try {
        // let params = {
        //   avatar: avatar || this.userInfo.avatar || this.defaultAvatar,
        //   nickName: nickName || this.userInfo.nickName,
        //   sex: sex || this.userInfo.sex,
        // }
        await updateUserInfo({ ...params })
        uni.$u.toast('修改成功')

        this.setUserInfo({ ...this.userInfoForm })
        uni.setStorageSync('user', { ...this.userInfoForm })
      } catch (e) {
        console.log(e)
      }
    },
  },
  watch: {},
  onReady() {
    this.userInfoForm = this.userInfo
  },
}
</script>

<style lang="scss" scoped>
.view-action {
  /deep/ .u-popup__content {
    background: none;
    background-color: none !important;
  }
  /deep/ .u-action-sheet__item-wrap {
    background: #fff;
    margin: 12rpx;
    border-radius: 27rpx;
  }
  /deep/ .u-action-sheet__item-wrap__item__name,
  /deep/ .u-action-sheet__cancel-text {
    color: #007aff;
  }

  /deep/ .u-gap {
    display: none;
  }
  /deep/ .u-action-sheet__cancel-text {
    margin: 0 13rpx;
    background: #fff;
    border-radius: 27rpx;
  }
}
.right-icon {
  width: 16rpx;
  height: 24rpx;
  margin-left: 10rpx;
}
.form-box {
  margin: 30rpx;

  .form-box-item {
    padding: 30rpx;
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 42rpx;
    background: #fff;
    border-radius: 14rpx;
    margin-bottom: 12rpx;
    .form-box-item-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-right {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 28rpx;
        margin-right: 0;
        background: none;
        padding: 0;

        input {
          text-align: right;
          line-height: 20px;
          height: 40rpx;
        }
        .avater {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }
      }
      .item-right::after {
        border: none;
      }
    }
    .form-box-item-line {
      width: 629rpx;
      height: 1rpx;
      border-bottom: 2rpx solid #eeeeee;
      margin: 30rpx 0 25rpx 0;
    }
  }

  // .form-btn {
  //   width: 200rpx;
  //   height: 85rpx;
  //   margin: 200rpx auto;
  //   button {
  //     height: 85rpx;
  //     background: $Gradual-color;
  //     border-radius: 10rpx;
  //     font-size: 30rpx;
  //     font-weight: 400;
  //     text-align: center;
  //     color: #ffffff;
  //     line-height: 85rpx;
  //   }
  // }
}
</style>
