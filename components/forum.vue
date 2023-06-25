<template>
  <view class="content">
    <view
      class="content-box"
      v-for="item in list"
      :key="item.id"
      @tap="($event) => goDetail(item)"
    >
   
      <view class="content-item">
        <view class="content-item-left">
          <view class="title over-ellipsis"
            ><text>{{ item.title }}</text></view
          >
          <view class="sub-title over-ellipsis"
            >
            
            <text v-if="current!=2">{{ item.subTitle }}</text>
            <text v-else>拒绝原因：巴拉巴拉</text>
            </view
          >
          <view class="content-footer">
            <view class="avater">
              <image :src="item.avater"> </image>
            </view>

            <text class="author">
              {{ item.author }}
            </text>

            <text class="createTime">
              {{ item.createTime }}
            </text>
          </view>
        </view>
        <view class="content-right">
          <view class="content-img">
            
          <image
            :src="item.image"
            :lazy-load="true"
            :lazy-load-margin="0"
            :mode="'aspectFill'"
          />
          </view>
          <view v-if="current==3" class="right-btn" @click.stop="show=true">
            <button class="'btn-del'">删除</button>
          </view>
        </view>
      </view>
    

    </view>
    <u-modal :title="'是否确认删除？'"  @cancel="show=false" :showCancelButton='true' :show="show" @confirm="confirm" ref="uModal" :asyncClose="true"></u-modal>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('commodity')
export default {
  //import引入组件才能使用
  components: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    current:{
      type:Number,
      default:0
    }
  },
  data() {
    return {  
      show: false    
              }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  onLoad: function () {},

  // 方法集合
  methods: {
    ...mapMutations(['setForumInfo']),
    delData(item){

    },
    confirm() {
			setTimeout(() => {
				// 3秒后自动关闭
				this.show = false;
			}, 3000)
		},
    goDetail(item) {
      this.setForumInfo(item)

      uni.navigateTo({
        url: '/pages/article/forumDatail',
      })
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
    padding: 20rpx;
    margin: 20rpx 20rpx 0 20rpx;
    height: 270rpx;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    position: relative;
    background: #fff;
    border-radius: 20rpx;
    .content-item-left {
      flex: 0 0 420rpx;
      width: 420rpx;
      .title {
        font-size: 32rpx;
        line-height: 42rpx;
        color: #151515;
        margin-bottom: 20rpx;
        max-height: 84rpx;
      }
      .sub-title {
        font-size: 26rpx;
        color: #999;
        line-height: 36rpx;
        margin-bottom: 20rpx;
        max-height: 72rpx;
      }
      .over-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .content-right {
      flex: 0 0 240rpx;
      width: 240rpx;
     
     
      .content-img{
        height: 170rpx; position: relative;
      overflow: hidden;image {
        width: 100%;
        height: 100%;
        will-change: transform;
      }
      }
      
    }
    .content-footer {
      position: absolute;
      bottom: 25rpx;
      left: 30rpx;
      height: 40rpx;
      display: flex;

      align-items: center;
      font-size: 22rpx;
      color: #999;
      .avater {
        width: 40rpx;
        height: 40rpx;
        border-radius: 40rpx;
        margin-right: 14rpx;
        vertical-align: middle;
        image {
          width: 100%;
          height: 100%;
          border-radius: 40rpx;
        }
      }
      .author {
        padding-right: 28rpx;
        position: relative;
        display: inline-block;
      }
      .createTime {
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
.right-btn{
  width:200rpx;
  margin: auto;
  margin-top: 40rpx;
  padding-bottom: 250rpx;
  button {
    height: 60rpx;
    background: $Gradual-color;
    border-radius: 10rpx;
    font-size: 30rpx;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    line-height: 60rpx
  }
}
</style>
