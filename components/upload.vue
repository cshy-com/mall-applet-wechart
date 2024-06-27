<template>
  <view class="upload">
    <u-upload
      :fileList="fileList"
      @afterRead="afterRead"
      @delete="deletePic"
      :name="name"
      :multiple="multiple"
      :width="width"
      :height="height"
      :maxCount="maxCount"
      :maxSize="maxSize * 1024 * 1024"
      :previewFullImage="previewFullImage"
      @oversize="overSize"
    >
      <slot>
        <view class="upload-slot">
          <view class="upload-slot-thumbnail">
            <image
              :src="defUploadIcon"
              :lazy-load="true"
              :lazy-load-margin="0"
              :mode="'aspectFill'"
            ></image>
          </view>
          <view class="upload-slot-tip">
            <text> {{ tip }} </text>
            <text> （最多{{ maxCount }}张） </text>
          </view>
        </view>
      </slot>
    </u-upload>
    <view class="tip" v-if="showTips">
      <view class="tip-value"
        >请上传大小不超过 <text class="color">{{ maxSize }}MB</text> 格式为
        png/jpg/jpeg 的文件</view
      >
    </view>
  </view>
</template>
<script>
import comUtils from '@/util/comUtils.js'
import { getAuthorization } from '@/util/auth'
export default {
  //import引入组件才能使用
  components: {},
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    width: {
      type: Number || String,
      default: 80,
    },
    height: {
      type: Number || String,
      default: 80,
    },
    maxCount: {
      type: Number,
      default: 5,
    },
    previewFullImage: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      default: 'upload',
    },
    maxSize: {
      type: Number,
      default: 1,
    },
    showTips: {
      type: Boolean,
      default: true,
    },
    tip: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fileList: [],
      uploadImgUrl: comUtils.baseUrl + '/common/upload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getAuthorization(),
        'Content-Type': 'multipart/form-data',
      },
    }
  },
  // 计算属性
  computed: {
     
    defUploadIcon(){
      return this.$fileUrl+'/sysFile/ic_main_tupian.png'
    }
  },
  // 监听data中的数据变化
  watch: {
    value: {
      handler(n, o) {
        if (n) {
          this.fileList = n
        } else {
          this.fileList = []
        }
      },
      deep: true,
      immediate: true,
    },
  },
  // 方法集合
  methods: {
    // 图片大小超出最大允许大小
    overSize(e) {
      uni.$u.toast(`上传图片大小不能超过${this.maxSize}MB!`)
    },
    deletePic(event) {
      this.fileList.splice(event.index, 1)
    },
    async afterRead(event) {
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)

      let fileListLen = this.fileList.length
      lists.map((item) => {
        this.fileList.push({
          ...item,
          status: 'uploading',
          message: '上传中',
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        let item = this.fileList[fileListLen]
        this.fileList.splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: 'success',
            message: '',
            url: result,
          })
        )
        fileListLen++
        this.$emit('input', this.fileList)
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: this.uploadImgUrl, // 仅为示例，非真实的接口地址
          header: this.headers,
          filePath: url,
          name: 'file',
          formData: {
            file: url,
          },
          success: (res) => {
            setTimeout(() => {
              if (res.statusCode == 200) {
                let data = JSON.parse(res.data)
                resolve(data.uploadBaseUrl + data.url)
              }
            }, 1000)
          },
        })
      })
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
<style lang="scss" scoped>
.upload {
  .tip {
    .tip-value {
      font-size: 22rpx;
      .color {
        color: rgb(245, 108, 108);
      }
    }
  }
  .upload-slot {
    width: 163rpx;
    height: 163rpx;
    border-radius: 14rpx;
    border: 1px dashed #cccccc;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .upload-slot-thumbnail {
      width: 44rpx;
      height: 44rpx;
      margin-bottom: 10rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .upload-slot-tip {
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #cccccc;
      line-height: 33rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  /deep/ .u-upload__wrap__preview {
    // width: 174rpx;
    // height: 174rpx;
    overflow: visible;
    margin-right: 9rpx;
    image {
      border-radius: 14rpx;
      width: 163rpx !important;
      height: 163rpx !important;
      border: 1px dashed #cccccc;
    }
  }
  /deep/ .u-upload__deletable {
    height: 34rpx !important;
    width: 34rpx !important;
    background-image: url('./../static/icon/ic_main_shanchu.png');
    background-size: 100%;
    top: -11rpx;
    right: -11rpx;
    background-color: transparent;
    border-bottom-left-radius: 0;
    .u-upload__deletable__icon {
    }
    .uicon-close {
      font-size: 0rpx !important;
    }
  }
  /deep/ .u-upload__success {
    display: none;
  }
  /deep/ .uicon-camera-fill {
    font-size: 40rpx !important;
  }
}
</style>
