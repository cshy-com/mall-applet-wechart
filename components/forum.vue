<template>
  <view class="content">
    <view
      class="content-box"
      v-for="item in list"
      :key="item.id"
      @tap="($event) => goDetail(item)"
    >
      <view class="content-item">
        <view
          class="content-item-top"
          :class="{
            'content-item-top-0': !item.mainUrl,
            'content-item-top-2':
              item.mainUrl && [2, 3].includes(item.mainUrl.length),
          }"
        >
          <view class="content-item-left">
            <view class="title font-30-500 over-ellipsis-2"
              ><text class="">{{ item.title }}</text></view
            >
            <view class="user-avater">
              <view class="avater">
                <image :src="item.avatar || defaultAvatar"> </image>
              </view>

              <text class="author font-26 ">
                {{ item.nickName }}
              </text>
            </view>
          </view>
          <view
            class="content-right"
            :class="{
              'content-right-1':
                item.mainUrl && [1].includes(item.mainUrl.length),
              'content-right-2':
                item.mainUrl && [2, 3].includes(item.mainUrl.length),
            }"
          >
            <view class="content-img bachground-def-img" v-for="img in item.mainUrl" :key="img.id">
              <image
                :src="img || defImg"
                :lazy-load="true"
                :lazy-load-margin="0"
                :mode="'aspectFill'"
              />
            </view>
          </view>
        </view>
        <view class="content-footer font-22 flex-between-center" >
          <view class="content-footer-item flex-center">
            <image
              :src="defVisitImg"
              :lazy-load="true"
              :lazy-load-margin="0"
              :mode="'aspectFill'"
            />
            <text class="createTime font-26" > {{ item.visits }} </text>
          </view>
          <view class="content-footer-item">
            <image
              :src="defTime"
              :lazy-load="true"
              :lazy-load-margin="0"
              :mode="'aspectFill'"
            />
            <text class="createTime font-26">
              {{ item.createTime }}
            </text>
          </view>
        </view>
      </view>
    </view>
    <noMore v-if="more == 'noMore'"></noMore>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
import { forumDel } from '@/api/index'
export default {
  //import引入组件才能使用
  components: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    current: {
      type: Number,
      default: 0,
    },
    more: {
      type: String,
      default: 'more',
    },
  },
  data() {
    return {
      show: false,

      selectItem: null,
    }
  },
  // 计算属性
  computed: {
    defImg() {
      return this.$fileUrl + '/sysFile/img_default.png'
    },
    defVisitImg() {
      return this.$fileUrl + '/sysFile/ic_yuedu.png'
    },
    defTime() {
      return this.$fileUrl + '/sysFile/ic_shijian.png'
    },
    defaultAvatar() {
      return this.$fileUrl + '/sysFile/avatar.png'
    },
  },
  // 监听data中的数据变化
  watch: {},
  onLoad: function () {},

  // 方法集合
  methods: {
    ...mapMutations(['setForumInfo']),
    delData(item) {},
    delModelShow(item) {
      this.selectItem = item
      this.show = true
    },
    async confirm() {
      // 3秒后自动关闭

      try {
        await forumDel(this.selectItem.id)
        this.show = false
        this.$emit('getPage')
      } catch (e) {
        console.log(e)
      }
    },
    goDetail(item) {
      this.setForumInfo(item)
      // 查看详情
       
      if (item.status==30||item.status==10) {
        uni.navigateTo({
          url: `/pages/article/forumDatail?id=${item.id}&status=${item.status}`,
        })
      } else {
        // 继续编辑
        uni.navigateTo({
          url: '/pages/article/forumAdd?id=' + item.id,
        })
      }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  onShow() {},
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
.content-box {
  position: relative;
  .content-item {
    margin-top: 12rpx;

    position: relative;
    background: #fff;
    padding: 30rpx;
    margin-left: 12rpx;
    margin-right: 12rpx;
    border-radius: 12rpx;
    .content-item-top {
      display: flex;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
    }

    .content-item-left {
      flex: 0 0 420rpx;
      width: 420rpx;
      .title {
        margin-bottom: 14rpx;
        max-height: 84rpx;
        // height: 42rpx;
       
        color: #333333;
        line-height: 42rpx;
      }
     
    
    
      .user-avater {
        display: flex;
        align-items: center;
        margin: 14rpx 0 21rpx 0;
        .avater {
          width: 38rpx;
          height: 38rpx;
          border-radius: 50%;
          margin-right: 10rpx;
          vertical-align: middle;
          image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .author {
          padding-right: 28rpx;
          position: relative;
          display: inline-block;
       
          color: #888888;
          line-height: 37rpx;
        }
      }
    }
    .content-item-top-0 {
      .content-item-left {
        flex: 1;
        width: 100%;
      }
    }
    .content-item-top-2 {
      flex-direction: column;
      .content-item-left {
        flex: 1;
        width: 100%;
      }
      .content-right {
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20rpx;
        .content-img {
          width: 216rpx;
          height: 216rpx;
          background-size: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-image: $app-load-gif;
          background-color: #f5f5f5;
          margin-right: 8rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .content-img:nth-child(3) {
          margin-right: 0;
        }
      }
    }
   
    .content-right-1 {
      flex: 0 0 216rpx;
      width: 216rpx;

      .content-img {
        height: 216rpx;
        position: relative;
        overflow: hidden;
      
        background-color: #f5f5f5;
        image {
          width: 100%;
          height: 100%;
          will-change: transform;
          border-radius: 15rpx;
          background: #ededed;
        }
      }
    }
    .content-right-2 {
      .content-img {
        image {
          width: 100%;
          height: 100%;
          will-change: transform;
          border-radius: 15rpx;
          background: #ededed;
        }
      }
    }
    .content-footer {
      
      color: #999;
      margin-top: 20rpx;
      .content-footer-item {
        display: flex;
    align-items: center;
        image {
          width: 33rpx;
          height: 33rpx;
        }
      }

      .createTime {
        
        color: #c0c0c0;
        line-height: 37rpx;
        margin-left: 10rpx;
      }
    }
  }
}
.content-box::before {
  display: block;
  position: absolute;
  border-top: 1px solid #eee;
  width: 100%;
  bottom: 0;
  left: 0;
}
.content {
  padding-bottom: 20rpx;
}
 
</style>
