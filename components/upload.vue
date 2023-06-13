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
      :previewFullImage="previewFullImage"
    ></u-upload>
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
  computed: {},
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
  /deep/ .u-upload__deletable {
    height: 40rpx !important;
    width: 40rpx !important;
    .u-upload__deletable__icon {
      top: 6px !important;
    }
    .uicon-close {
      font-size: 40rpx !important;
    }
  }
  /deep/ .uicon-camera-fill {
    font-size: 40rpx !important;
  }
}
</style>
