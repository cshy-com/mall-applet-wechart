<template>
  <!--index.wxml-->
  <view class="container">
    <view class="header-top"><text>高端定制</text></view>
    <view class="search-and-address">
      <view class="positioning">
        <text class="iconfont icon-dingwei"></text>

        <text class="text">武汉</text>
        <text class="iconfont icon-xialajiantou"></text>
      </view>
      <view class="bg-sear">
        <view class="scrolltop" @tap="toSearchPage">
          <view class="section">
            <text class="iconfont icon-sousuo"></text>
            <text class="placeholder">输入关键字搜索</text>
          </view>
          <view class="search-btn">
            <text class="text"> 搜索 </text>
          </view>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="cat-row">
        <view class="cat-item">
          <view class="item" @tap="toCouponCenter(0)" data-sts="1">
            <image src="/static/img/icon/home-icon-1.png"></image>
            <text>餐饮美食</text>
          </view>
          <view class="item" @tap="toCouponCenter(1)" data-sts="2">
            <image src="/static/img/icon/home-icon-2.png"></image>
            <text>休闲玩乐</text>
          </view>
          <view class="item" @tap="toCouponCenter(2)" data-sts="3">
            <image src="/static/img/icon/home-icon-3.png"></image>
            <text>生活服务</text>
          </view>
          <view class="item" @tap="toCouponCenter(3)" data-sts="4">
            <image src="/static/img/icon/home-icon-4.png"></image>
            <text>健康守护</text>
          </view>
          <view class="item" @tap="toCouponCenter(4)" data-sts="5">
            <image src="/static/img/icon/home-icon-5.png"></image>
            <text>美容养颜</text>
          </view>
          <view class="item" @tap="toCouponCenter(5)" data-sts="6">
            <image src="/static/img/icon/home-icon-6.png"></image>
            <text>品质出行</text>
          </view>
          <view class="item" @tap="toCouponCenter(6)" data-sts="7">
            <image src="/static/img/icon/home-icon-7.png"></image>
            <text>出国留学</text>
          </view>
          <view class="item" @tap="toCouponCenter(7)" data-sts="8">
            <image src="/static/img/icon/home-icon-8.png"></image>
            <text>艺术品鉴</text>
          </view>
          <view class="item" @tap="toCouponCenter(8)" data-sts="8">
            <image src="/static/img/icon/home-icon-1.png"></image>
            <text>户外运动</text>
          </view>
          <view class="item" @tap="toCouponCenter(9)" data-sts="8">
            <image src="/static/img/icon/home-icon-2.png"></image>
            <text>公益慈善</text>
          </view>
          <view class="item" @tap="toCouponCenter(10)" data-sts="8">
            <image src="/static/img/icon/home-icon-3.png"></image>
            <text>拍摄服务</text>
          </view>
          <view class="item" @tap="toCouponCenter(11)" data-sts="8">
            <image src="/static/img/icon/home-icon-4.png"></image>
            <text>商务礼仪</text>
          </view>
          <view class="item" @tap="toCouponCenter(12)" data-sts="8">
            <image src="/static/img/icon/home-icon-5.png"></image>
            <text>服装定制</text>
          </view>
          <view class="item" @tap="toCouponCenter(13)" data-sts="8">
            <image src="/static/img/icon/home-icon-6.png"></image>
            <text>非遗传承</text>
          </view>
          <view class="item" @tap="toCouponCenter(14)" data-sts="8">
            <image src="/static/img/icon/home-icon-7.png"></image>
            <text>活动策划</text>
          </view>
        </view>
      </view>

      <!-- 消息播放 -->
    </view>
    <tabs :list="statusList" :selectIndex="selectClassIndex"></tabs>
    <view class="home-content">
      <view class="updata" v-if="updata">
        <block v-for="(item, index) in taglist" :key="index">
          <!-- 商城热卖 -->
          <view
            class="hot-sale"
            v-if="item.style == 1 && item.prods && item.prods.length"
          >
            <view class="hotsale-item-cont">
              <block v-for="(prod, index2) in item.prods" :key="index2">
                <view
                  class="prod-items"
                  @tap="toProdPage(prod.prodid)"
                  :data-prodid="prod.prodId"
                >
                  <view class="hot-imagecont">
                    <!-- prod.pic -->
                    <image
                      :src="require('@/static/img/test5.png')"
                      class="hotsaleimg"
                    ></image>
                  </view>
                  <view class="hot-text">
                    <view class="hotprod-text">{{ prod.prodName }}</view>
                    <!-- <view class="prod-info">{{prod.brief}}</view> -->
                    <view class="prod-text-info">
                      <view class="price">
                        <text class="symbol">￥</text>
                        <text class="big-num">{{
                          prod.price[0] | parsePrice
                        }}</text>
                      </view>
                      <view class="basket-img">
                        <text class="iconfont icon-dianzan"></text>
                        <text class="zan-num">123</text>
                      </view>
                    </view>
                  </view>
                </view>
              </block>
            </view>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
import tabs from '@/components/tabs.vue'

export default {
  data() {
    return {
      indicatorDots: true,
      indicatorColor: '#d1e5fb',
      indicatorActiveColor: '#1b7dec',
      autoplay: true,
      interval: 2000,
      duration: 1000,

      indexImgs: [
        {
          imgUrl: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
        },
        {
          imgUrl: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
        },
      ],
      seq: 0,
      news: [],
      statusList: [
        {
          title: '关注',
        },
        {
          title: '推荐',
        },
        {
          title: '论坛',
        },
        {
          title: '建议',
        },
        {
          title: '商户招标',
        },
      ],
      selectClassIndex: 0,
      taglist: [
        {
          style: 1,
          id: 1,
          title: '上新',
          prods: [
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [102],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
            {
              pic: 'https://csdnimg.cn/70592b2299594e37aedcaa91fc52a294.png',
              prodName: '商品名称',
              price: [10, 2],
              prodid: 33,
            },
          ],
        },
      ],
      sts: 0,
      scrollTop: '',
      current: 0,
      updata: true,
    }
  },

  components: { tabs },
  props: {},
  onLoad: function () {
    this.getLocation()
    // this.getAllData();
  },
  onReady() {
    //
  },
  onShow() {
    //#ifdef MP-WEIXIN
    // uni.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       uni.navigateTo({
    //         url: '/pages/login/login'
    //       });
    //     }
    //   }
    // });
    //#endif
    // http.getCartCount(); //重新计算购物车总数量
  },

  onPullDownRefresh: function () {
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    var ths = this
    setTimeout(function () {
      // ths.getAllData(); // wx.hideNavigationBarLoading() //完成停止加载

      uni.stopPullDownRefresh() //停止下拉刷新
    }, 100)
  },
  methods: {
    // getAreaCode通过经纬度(wgs84)坐标获取区域码
    getAreaCode(latitude, longitude) {
      this.$refs.uForm.resetFields()
      var that = this
      that.$u.api
        .getAreaCode({
          latitude: latitude,
          longitude: longitude,
        })
        .then((res) => {
          if (res.code == 100000000) {
            console.log('通过经纬度坐标获取区域码:', res)
            // console.log(res, 'areaCode');
            that.bindList.areaCode = res.data.areaCode
            that.bindList.specificAddress = res.data.detailLocation
            that.bindList.address = res.data.areaLocation
          } else {
            uni.showToast({ title: res.msg, icon: 'none' })
          }
        })
        .catch((err) => {
          this.loadState = '加载失败err'
          console.log('getDevList_err:', err) //--------------------
        })
    },

    // 定位获取
    fnGetlocation() {
      let that = this
      uni.getLocation({
        type: 'wgs84', //默认为 wgs84 返回 gps 坐标
        geocode: 'true',
        isHighAccuracy: 'true',
        accuracy: 'best', // 精度值为20m
        success: function (res) {
          console.log('定位获取:', res)
          let platform = uni.getSystemInfoSync().platform
          if (platform == 'ios') {
            //toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
            that.bindList.long = res.longitude.toFixed(6)
            that.bindList.lat = res.latitude.toFixed(6)
          } else {
            that.bindList.long = res.longitude
            that.bindList.lat = res.latitude
          }
          that.bindList.longlat =
            '经度' +
            that.changeTwoDecimal_f(that.bindList.long) +
            '/' +
            '纬度' +
            that.changeTwoDecimal_f(that.bindList.lat)
          that.getAreaCode(res.latitude, res.longitude)
        },
        fail(err) {
          if (
            err.errMsg ===
            'getLocation:fail 频繁调用会增加电量损耗，可考虑使用 wx.onLocationChange 监听地理位置变化'
          ) {
            uni.showToast({
              title: '请勿频繁定位',
              icon: 'none',
            })
          }
          if (err.errMsg === 'getLocation:fail auth deny') {
            // 未授权
            uni.showToast({
              title: '无法定位，请重新获取位置信息',
              icon: 'none',
            })
            authDenyCb && authDenyCb()
            that.isLocated = false
          }
          if (
            err.errMsg ===
            'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF'
          ) {
            uni.showModal({
              content: '请开启手机定位服务',
              showCancel: false,
            })
          }
        },
      })
    },

    // 定位授权
    getLocation() {
      let that = this
      // 1、判断手机定位服务【GPS】 是否授权
      uni.getSystemInfo({
        success(res) {
          console.log('判断手机定位服务是否授权:', res)
          let locationEnabled = res.locationEnabled //判断手机定位服务是否开启
          let locationAuthorized = res.locationAuthorized //判断定位服务是否允许微信授权
          if (locationEnabled == false || locationAuthorized == false) {
            //手机定位服务（GPS）未授权
            uni.showToast({
              title: '请打开手机GPS',
              icon: 'none',
            })
          } else {
            //手机定位服务（GPS）已授权
            // 2、判断微信小程序是否授权位置信息
            // 微信小程序已授权位置信息
            uni.authorize({
              //授权请求窗口
              scope: 'scope.userLocation', //授权的类型
              success: (res) => {
                that.fnGetlocation()
              },
              fail: (err) => {
                err = err['errMsg']
                uni
                  .showModal({
                    content: '需要授权位置信息',
                    confirmText: '确认授权',
                  })
                  .then((res) => {
                    console.log(res)
                    if (res[1]['confirm']) {
                      uni.openSetting({
                        success: (res) => {
                          if (res.authSetting['scope.userLocation']) {
                            // 授权成功
                            uni.showToast({
                              title: '授权成功',
                              icon: 'none',
                            })
                            that.fnGetlocation()
                          } else {
                            // 未授权
                            uni.showToast({
                              title: '授权失败,请重新授权',
                              icon: 'none',
                            })
                            uni.showModal({
                              title: '授权',
                              content:
                                '获取授权' +
                                authouName +
                                '失败,是否前往授权设置？',
                              success: function (result) {
                                if (result.confirm) {
                                  uni.openSetting()
                                }
                              },
                              fail: function () {
                                uni.showToast({
                                  title: '系统错误！',
                                  icon: 'none',
                                })
                              },
                            })
                          }
                        },
                      })
                    }
                    if (res[1]['cancel']) {
                      // 取消授权
                      uni.showToast({
                        title: '你拒绝了授权，无法获得周边信息',
                        icon: 'none',
                      })
                    }
                  })
              },
              complete(res) {
                // console.log('授权弹框', res);
                if (res.errMsg == 'authorize:ok') {
                  that.fnGetlocation()
                } else {
                  uni.showModal({
                    title: '授权',
                    content:
                      '获取授权' + authouName + '失败,是否前往授权设置？',
                    success: function (result) {
                      if (result.confirm) {
                        uni.openSetting()
                      }
                    },
                    fail: function () {
                      uni.showToast({
                        title: '系统错误！',
                        icon: 'none',
                      })
                    },
                  })
                }
              },
            })
          }
        },
      })
    },

    changeStu(index) {
      this.selectClassIndex = index
    },
    //事件处理函数
    bindViewTap: function () {
      // uni.navigateTo({
      //   url: '../logs/logs'
      // });
    },
    // 页面滚动到指定位置指定元素固定在顶部
    onPageScroll: function (e) {
      //监听页面滚动
      // this.setData({
      //   scrollTop: e.scrollTop
      // });
    },
    toProdPage(id) {
      var prodid = id
      if (prodid) {
        uni.navigateTo({
          url: '/pages/subPack/merchant/commodityDetail?prodid=' + prodid,
        })
      }
    },
    // 加入购物车
    addToCart: function (item) {
      // uni.showLoading({
      //   mask: true
      // });
      // var params = {
      //   url: "/prod/prodInfo",
      //   method: "GET",
      //   data: {
      //     prodId: item.prodId
      //   },
      //   callBack: res => {
      //     var params1 = {
      //       url: "/p/shopCart/changeItem",
      //       method: "POST",
      //       data: {
      //         basketId: 0,
      //         count: 1,
      //         prodId: res.prodId,
      //         shopId: res.shopId,
      //         skuId: res.skuList[0].skuId
      //       },
      //       callBack: res => {
      //         //console.log(res);
      //         uni.hideLoading();
      //         http.getCartCount(); //重新计算购物车总数量
      //         uni.showToast({
      //           title: "加入购物车成功",
      //           icon: "none"
      //         });
      //       }
      //     };
      //     http.request(params1);
      //   }
      // };
      // http.request(params);
    },
    toCouponCenter(index) {
      if (index > 4) {
        this.$u.toast('正在开发中，敬请期待')
        return
      }
      console.log(index)
      uni.navigateTo({
        url: '/pages/subPack/merchant/index?cateId=' + index,
      })
    },
    // 跳转搜索页
    toSearchPage: function () {
      uni.navigateTo({
        url: '/pages/subPack/search-page/search-page',
      })
    },
    //跳转商品活动页面
    toClassifyPage: function (e) {
      // var url = '/pages/prod-classify/prod-classify?sts=' + e.currentTarget.dataset.sts;
      // var id = e.currentTarget.dataset.id;
      // var title = e.currentTarget.dataset.title;
      // if (id) {
      //   url += "&tagid=" + id + "&title=" + title;
      // }
      // uni.navigateTo({
      //   url: url
      // });
    },
    //跳转公告列表页面
    onNewsPage: function () {
      // uni.navigateTo({
      //   url: '/pages/recent-news/recent-news'
      // });
    },

    getAllData() {
      // http.getCartCount(); //重新计算购物车总数量
      // this.getIndexImgs();
      // this.getNoticeList();
      // this.getTag();
    },

    //加载轮播图
    getIndexImgs() {
      // //加载轮播图
      // var params = {
      //   url: "/indexImgs",
      //   method: "GET",
      //   data: {},
      //   callBack: res => {
      //     this.setData({
      //       indexImgs: res,
      //       seq: res
      //     });
      //   }
      // };
      // http.request(params);
    },

    getNoticeList() {
      // // 加载公告
      // var params = {
      //   url: "/shop/notice/topNoticeList",
      //   method: "GET",
      //   data: {},
      //   callBack: res => {
      //     this.setData({
      //       news: res
      //     });
      //   }
      // };
      // http.request(params);
    },

    // 加载商品标题分组列表
    getTag() {
      // var params = {
      //   url: "/prod/tag/prodTagList",
      //   method: "GET",
      //   data: {},
      //   callBack: res => {
      //     this.setData({
      //       taglist: res
      //     });
      //     for (var i = 0; i < res.length; i++) {
      // this.updata = false
      // this.updata = true
      //       this.getTagProd(res[i].id, i);
      //     }
      //   }
      // };
      // http.request(params);
    },

    getTagProd(id, index) {
      //  var param = {
      //    url: "/prod/prodListByTagId",
      //    method: "GET",
      //    data: {
      //      tagId: id,
      //      size: 6
      //    },
      //    callBack: res => {
      // this.updata = false
      // this.updata = true
      //      var taglist = this.taglist;
      //      taglist[index].prods = res.records;
      //      this.setData({
      //        taglist: taglist
      //      });
      //    }
      //  };
      //  http.request(param);
    },

    /**
     * 跳转至商品详情
     */
    showProdInfo: function (e) {
      // let relation = e.currentTarget.dataset.relation;
      // if (relation) {
      //   uni.navigateTo({
      //     url: 'pages/prod/prod'
      //   });
      // }
    },
  },
}
</script>
<style>
@import './index.scss';
</style>
