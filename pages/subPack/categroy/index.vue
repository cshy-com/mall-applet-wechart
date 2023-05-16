<template>
  <!--pages/category/category.wxml-->

  <view class="container">

    <!-- 头部搜索区 -->

    <view class="search-bar">
      <view
        class="search-box"
        @tap="toSearchPage"
      >
        <image
          src="/static/img/home/search.png"
          class="search-img"
        ></image>
        <text class="sear-input">搜索您想要的商品</text>
      </view>
    </view>
    <!-- 滚动内容区 -->
    <view class="main">
      <!-- 左侧菜单start -->
      <scroll-view
        scroll-y="true"
        class="leftmenu"
      >
        <block
          v-for="(item, index) in categoryList"
          :key="index"
        >
          <view
            :class="{active:selIndex==index}"
            class="menu-item"
            :data-index="index"
            :data-id="item.categoryId"
            @tap="onMenuTab(item,index)"
          >
            {{item.categoryName}}
          </view>
        </block>
        <view
          v-if="!categoryList || !categoryList.length"
          class="ca-empty"
        >{{categoryList && categoryList.length ? '该分类下暂无商品' : '暂无商品'}}</view>
      </scroll-view>
      <!-- 左侧菜单end -->

      <!-- 右侧内容start -->
      <scroll-view
        scroll-y="true"
        class="rightcontent"
      >
        <view class="cat-row">

          <view
            class="cat-item"
            v-for="item in 6"
            :key="item.id"
          >
            <view
              class="item"
              @tap="toClassifyPage"
              data-sts="1"
            >
              <image src="/static/img/icon/home-icon-1.png"></image>
              <text>定制商宴 {{ item }}</text>
            </view>
            <view
              class="item"
              @tap="toClassifyPage"
              data-sts="2"
            >
              <image src="/static/img/icon/home-icon-2.png"></image>
              <text>定制服装</text>
            </view>
            <view
              class="item"
              @tap="toClassifyPage"
              data-sts="3"
            >
              <image src="/static/img/icon/home-icon-3.png"></image>
              <text>定制美容</text>
            </view>
            <view
              class="item"
              @tap="toCouponCenter"
              data-sts="4"
            >
              <image src="/static/img/icon/home-icon-4.png"></image>
              <text>定制医疗</text>
            </view>
            <view
              class="item"
              @tap="toClassifyPage"
              data-sts="5"
            >
              <image src="/static/img/icon/home-icon-5.png"></image>
              <text>健身私教</text>
            </view>
            <view
              class="item"
              @tap="toClassifyPage"
              data-sts="6"
            >
              <image src="/static/img/icon/home-icon-6.png"></image>
              <text>定制服装</text>
            </view>
            <view
              class="item"
              @tap="toClassifyPage"
              data-sts="7"
            >
              <image src="/static/img/icon/home-icon-7.png"></image>
              <text>定制KTV</text>
            </view>
            <view
              class="item"
              @tap="toCouponCenter"
              data-sts="8"
            >
              <image src="/static/img/icon/home-icon-8.png"></image>
              <text>项目发布</text>
            </view>

          </view>
        </view>

      </scroll-view>
      <!-- 右侧内容end -->
      <!-- </block> -->
    </view>

  </view>
</template>

<!-- <script module="wxs" lang="wxs" src="../../wxs/number.wxs"></script> -->

<script>
// pages/category/category.js
// var http = require("../../utils/http.js");
// var config = require("../../utils/config.js");

export default {
  data() {
    return {
      selIndex: 0,
      categoryList: [
        {
          categoryName: '分类1',
          categoryId: 1
        },
        {
          categoryName: '分类1',
          categoryId: 1
        },
        {
          categoryName: '分类1',
          categoryId: 1
        }
      ],
      productList: [
        {
          prodName: '测试',
          brief: '件',
          price: [20, 30]
        }
      ],
      categoryImg: '',
      prodid: ''
    }
  },

  components: {},
  props: {},
  computed: {
    evaluateClass(evaluate) {
      return this.evaluate == evaluate ? 'selected' : ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // var ths = this; //加载分类列表
    // var params = {
    //   url: "/category/categoryInfo",
    //   method: "GET",
    //   data: {
    //     parentId: ''
    //   },
    //   callBack: function (res) {
    //     // console.log(res);
    //     ths.setData({
    //       categoryImg: res[0].pic,
    //       categoryList: res
    //     });
    //     ths.getProdList(res[0].categoryId);
    //   }
    // };
    // http.request(params);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    /**
     * 分类点击事件
     */
    onMenuTab(item, index) {
      var index = index // this.getProdList(id);

      // this.getProdList(this.categoryList[index].categoryId);
      this.setData({
        categoryImg: this.categoryList[index].pic,
        selIndex: index
      })
    },
    // 跳转搜索页
    toSearchPage: function () {
      // uni.navigateTo({
      //   url: '/pages/search-page/search-page'
      // });
    },

    getProdList() {
      //加载分类列表
      // var params = {
      //   url: "/prod/pageProd",
      //   method: "GET",
      //   data: {
      //     categoryId: categoryId
      //   },
      //   callBack: res => {
      //     // console.log(res);
      //     this.setData({
      //       productList: res.records
      //     });
      //   }
      // };
      // http.request(params);
    },

    //跳转商品详情页
    toProdPage: function () {
      // var prodid = e.currentTarget.dataset.prodid;
      // uni.navigateTo({
      //   url: '/pages/prod/prod?prodid=' + prodid
      // });
    }
  }
}
</script>
<style>
@import './category.css';
</style>