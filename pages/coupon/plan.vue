<template>
  <view>
    <defNav title="客户营销活动"></defNav>

    <view class="order-tit">
      <view class="order-tab">
        <u-tabs
        
          :scrollable="true"
          :current="currentIndex"
          :list="tabList"
          @click="onStsTap"
          lineColor="#3b6dbb"
          :activeStyle="{
            color: '#3b6dbb',
            fontWeight: 'bold',
          }"
          :inactiveStyle="{
            fontSize: '30rpx',
            color: '#888888',
          }"
          lineHeight="5"
          lineWidth="45"
        ></u-tabs>
      </view>
      <view
        class="content-box"
        v-for="(item,index) in list"
        :key="item.id"
        @tap="($event) => goDetail(index)"
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
              <view class="title font-30-500 over-ellipsis-1"
                ><text class="">{{ item.title }}</text></view
              >

              <view class="title-time">
                <image
                  :src="defTime"
                  :lazy-load="true"
                  :lazy-load-margin="0"
                  :mode="'aspectFill'"
                  class="icon-img"
                />
                <text class="createTime font-26">
                  {{ item.createTime }}
                </text>
              </view>
              <view class="sub-titlt over-ellipsis-2">
                {{ item.content }}
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
              <view
                class="content-img bachground-def-img"
                v-for="img in item.mainUrl"
                :key="img.id"
              >
                <image
                  :src="img || defImg"
                  :lazy-load="true"
                  :lazy-load-margin="0"
                  :mode="'aspectFill'"
                />
              </view>
            </view>
          </view>
          <view class="content-footer font-22 flex-between-center">
            <view class="content-footer-item flex-center">
              <image
                :src="defVisitImg"
                :lazy-load="true"
                :lazy-load-margin="0"
                :mode="'aspectFill'"  class="icon-img"
              />
              <text class="createTime font-26"> {{ item.visits }} 人阅读 </text>
            </view>
            <view class="content-footer-item">
              <view class="btn"> 立即报名 </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import list from './paly.js'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      currentIndex: 0,
      tabList: [
        {
          name: '银行活动需求发布',
          id: 10,
         badge: {
                        value: 3,
                    }
        },
        // {
        //   name: '年度活动计划',
        //   id: 20,
        //   badge: {
        //                 value: 5,
        //             }
      
        // },
        {
          name: '商户推荐活动申报',
          id: 30,
          badge: {
                        value: 2,
                    }
          
        },
      ],
      list: list.list,
    }
  },
  // 计算属性
  computed: {
    defTime() {
      return this.$fileUrl + '/sysFile/ic_shijian.png'
    },

    defVisitImg() {
      return this.$fileUrl + '/sysFile/ic_yuedu.png'
    },
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onStsTap(e) {
      this.currentIndex = e.index
       if(e.index==0){
        this.list= list.list
       }
       if(e.index==1){
        this.list= list.list2
       }
      //  if(e.index==2){
      //   this.list= list.list2
      //  }
    },
    goDetail(index) {
      uni.navigateTo({
        url: `/pages/coupon/planDetail?index=${index}&currentIndex=${this.currentIndex}`,
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
}
</script>
<style scoped lang="scss">
.order-tit{
  /deep/ .u-badge--error{
    background-color:  rgba(250, 100, 0, 1)!important;
    position: relative;
    top: -8px;
    left: -3px;
  }
 
}
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
    .icon-img {
      width: 33rpx;
      height: 33rpx;
    }
    .createTime {
        color: #c0c0c0;
        line-height: 37rpx;
        margin-left: 10rpx;
      }
    .content-item-left {
      flex: 0 0 420rpx;
      width: 420rpx;
      .title {
        margin-bottom: 14rpx;
        max-height: 84rpx;
        // height: 42rpx;
        font-weight: 500;
        color: #333333;
        line-height: 42rpx;
      }
      .title-time {
        display: flex;
        align-items: center;
      }
     

      .sub-titlt {
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        line-height: 40rpx;
        margin-top: 26rpx;
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
        .btn{
          width: 156rpx;
          height: 57rpx;
          border:2rpx solid rgba(59, 109, 187, 1);
          
font-weight: 400;
font-size: 28rpx;
color: #3B6DBB;
line-height: 57rpx;
text-align: center;
 border-radius: 28rpx; 
        }
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
