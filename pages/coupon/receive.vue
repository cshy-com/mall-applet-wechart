<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-25 11:13:04
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-14 15:34:36
 * @FilePath: \mall-applet\pages\coupon\receive.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="nav">
      <hx-navbar :config="config" ref="hxnb">
        <view slot="center">
          <view class="center" style="">
            <text class="color" style="font-size: 18px">{{
              config.title
            }}</text>
          </view>
        </view>
      </hx-navbar>
    </view>
    
    <view class="btn-def" >
      <button v-if="showDef"
        type="text"
        @click="getTicket"
        :plain="true"
      >
        <text>账号直接领取积分</text>
      </button>
      <button  
        type="text"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
        :plain="true"
      >
        <text>手机号领取积分</text>
      </button>
      
     
    </view>
    <u-modal :show="show" :content="content" @confirm="confirm"></u-modal>
  </view>
</template>

<script>
import { getUrlParams } from '@/util/util'
import { setAuthorization, getAuthorization } from '@/util/auth.js'
import { mallIntegralTicket } from '@/api/integral'
import { wxLogin } from '@/api/index.js'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapGetters } = createNamespacedHelpers('user')
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      show: false,

      content: '领取成功，去其他地方逛逛吧',
      userType: 1,
      code: '',
      showDef:false,
      config: {
        color: ['#000', '#000'],
        title: '领取积分',

        back: false,
        fixed: true,
        centerSlot: true,
      },
    }
  },
  // 计算属性
  computed: {...mapGetters(['userInfo']),},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['setUserInfo']),
    confirm(e) {
      uni.switchTab({
        url:
          this.userType == 1
            ? '/pages/index/home/userHome'
            : '/pages/index/home/businessHome',
      })
    },
    // 获取当前微信用户手机号，领取积分
    getPhoneNumber(e) {
      wxLogin(e.detail.code).then((res) => {
        if (res && res.code == 0) {
          setAuthorization(res.data.token)
          this.setUserInfo(res.data)
          uni.setStorageSync('user', res.data)
          this.getTicket()
        }
      })
    },
    getTicket() {
      mallIntegralTicket({ code: this.code }).then((res) => {
        if (res && res.code == 0) {
          this.show = true
        } else {
          this.content=res.msg+',去其他地方逛逛吧'
          this.show=true
        }
      })
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  onLoad: function (options) {
    const { q } = options
    if (q) {
      let urlStr = decodeURIComponent(q)

      let urlParams = getUrlParams(urlStr)
      this.code = urlParams.code
      console.log('urlParams' + JSON.stringify(urlParams))
      console.log('code' + this.code)
    }
    
  },
  onShow(){

    if(this.userInfo){
      this.showDef=true

    }
  },
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
.btn-def {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 500rpx 0;
  margin: 0 auto;
  flex-direction: column;
  /deep/ button {
    background: #000;
    border-radius: 30rpx;
    color: #fff;
    width: 300rpx;
    font-size: 28rpx;
    margin-bottom: 30rpx;
  }
}
.nav /deep/ .hx-navbar__content__main_center {
  justify-content: center;
  width: 100vw;
  position: fixed;
}
.center {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */

  justify-content: center;
  align-items: center;

  font-size: 28rpx;
  font-family: SourceHanSerifCN-SemiBold, SourceHanSerifCN;
  font-weight: 400;
  color: #000;
}
</style>
