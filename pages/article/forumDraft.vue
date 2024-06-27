<template>
  <view>
    <defNav title="草稿列表"></defNav>

    <view>
      <view class="tab">
        <view
          class="tab-item"
          :class="{ active: currentIndex == index }"
          @click="sectionChange(index)"
          v-for="(item, index) in list"
        >
          {{ item.name }}
        </view>
      </view>
      <nodata
        v-if="noData"
        :config="{
          content: '暂无数据',
          imgUrl: defImg,
        }"
      ></nodata>
      <view class="list-content" v-else>
        <uni-swipe-action>
          <view
            class="list-box"
            v-for="item in forumList"
            :key="item.id"
            @click="editEvent(item)"
          >
            <uni-swipe-action-item>
              <view class="list-item">
                <view class="list-item-title">{{ item.title }}</view>
                <view class="list-item-content">{{ item.content }}</view>
                <view class="sub-title over-ellipsis-2" v-if="item.status== 20">
                   
                  <text >拒绝原因：{{ item.remarks||'' }}</text>
                </view>
                <view class="list-item-btn">
                  <view class="time">
                    <image
                      :src="defTime"
                      :lazy-load="true"
                      :lazy-load-margin="0"
                      :mode="'aspectFill'"
                    />
                    <text class="text">
                      {{ item.createTime }}
                    </text>
                  </view>
                  <view class="right">
                    <view
                      class="btn"
                      v-if="currentIndex == 0"
                      @click.stop="publishEvent(item)"
                    >
                      <image
                        :src="defPublish"
                        :lazy-load="true"
                        :lazy-load-margin="0"
                        :mode="'aspectFill'"
                      />
                      <text class="btn-text"> 发布 </text>
                    </view>
                    <view class="btn" @click.stop="editEvent(item)">
                      <image
                        :src="defEdit"
                        :lazy-load="true"
                        :lazy-load-margin="0"
                        :mode="'aspectFill'"
                      />
                      <text class="btn-text">编辑 </text>
                    </view>
                  </view>
                </view>
              </view>
              <template v-slot:right v-if="currentIndex == 0">
                <view class="slot-button" @click.stop="delModelShow(item)">
                  <image
                    :src="defDele"
                    :lazy-load="true"
                    :lazy-load-margin="0"
                    :mode="'aspectFill'"
                  />
                  <text class="slot-button-text">删除</text>
                </view>
              </template>
            </uni-swipe-action-item>
          </view>
        </uni-swipe-action>
        <noMore v-if="more == 'noMore'"></noMore>
      </view>
    </view>

    <u-modal
      :title="'是否确认删除？'"
      @cancel="show = false"
      :showCancelButton="true"
      :show="show"
      @confirm="confirm"
      ref="uModal"
      :asyncClose="true"
    ></u-modal>
  </view>
</template>

<script>
import { ForumPage, forumDel, mallForumListAdd } from '@/api/index'
import { getTotalPage } from '@/util/util'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      // 0是草稿，10是待审核，20审核不通过，30审核通过
      list: [
        {
          name: '草稿',
          id: 0,
          num: 0,
        },
        {
          name: '未通过',
          id: 20,
          num: 0,
        },
      ],
      current: 1,
      total: 0,
      more: 'noMore',
      size: 10,
      currentIndex: 0,
      forumList: [],
      selectItem: null,
      show: false,
      noData: false,
    }
  },
  // 计算属性
  computed: {
    defImg() {
      return this.$fileUrl + '/sysFile/img_luntanzanwu.png'
    },
    defTime() {
      return this.$fileUrl + '/sysFile/ic_shijian.png'
    },
    defPublish() {
      return this.$fileUrl + '/sysFile/ic_cg_fabu.png'
    },
    defEdit() {
      return this.$fileUrl + '/sysFile/ic_cg_bianji.png'
    },
    defDele() {
      return this.$fileUrl + '/sysFile/ic_cg_shanchu.png'
    },
  },
  // 监听data中的数据变化
  watch: {},
  onShow() {
    this.getPageList()
  },
  onLoad(options) {
    if (options.status) {
      this.currentIndex = this.list.findIndex((val) => val.id == options.status)
    }
  },
  onPullDownRefresh() {
    this.current = 1
    this.getPageList()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  // 上拉触底事件
  onReachBottom: function () {
    if (this.more == 'more') {
      this.current++
      this.getPageList()
    }
  },
  // 方法集合
  methods: {
    async publishEvent(item) {
      try {
        await mallForumListAdd(item.id)
        this.$tip.successToast('发布成功！')
        this.getPageList()
      } catch (e) {
        console.log(e)
      }
    },
    // 编辑
    editEvent(item) {
      uni.navigateTo({
        url: `/pages/article/forumAdd?id=${item.id}`,
      })
    },
    delModelShow(item) {
      this.selectItem = item
      this.show = true
      delModelShow(item)
    },
    async confirm() {
      // 3秒后自动关闭

      try {
        await forumDel(this.selectItem.id)
        this.show = false
        this.$tip.successToast('删除成功！')
        this.getPageList()
      } catch (e) {
        console.log(e)
      }
    },
    sectionChange(index) {
      this.currentIndex = index
      this.current = 1
      this.more = 'more'
      this.forumList = []
      this.getPageList()
    },
    async getPageList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await ForumPage({
          current: this.current,
          size: this.size,
          status: this.list[this.currentIndex].id,
          type: 'user',
        })
        uni.hideLoading()

        this.total = res.total
        let totalPage = getTotalPage(this.total, this.size)
        if (this.current == 1) {
          this.noData = res.total == 0
          this.forumList = res.data
        } else {
          this.forumList = [...this.forumList, ...res.data]
        }

        if (totalPage > this.current) {
          this.more = 'more'
        } else {
          this.more = 'noMore'
        }
      } catch (e) {
      } finally {
        uni.hideLoading()
      }
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
.tab {
  background: #ffffff;
  display: flex;
  .tab-item {
    margin: 28rpx 30rpx;
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #888888;
    line-height: 42rpx;
  }
  .tab-item:nth-child(1) {
    border-right: 1rpx solid #888888;
    padding-right: 35rpx;
    margin-right: 35rpx;
  }
  .active {
    color: #3b6dbb;
  }
}

.slot-button {
  display: flex;
  width: 160rpx;

  background: #ea531c;
  border-radius: 14rpx;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 12rpx;
  margin-right: 12rpx;
  image {
    width: 44rpx;
    height: 44rpx;
  }
  .slot-button-text {
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 40rpx;
    margin-top: 8rpx;
  }
}
.list-item {
  margin: 12rpx 12rpx 0 12rpx;
  background: #fff;
  padding: 30rpx;
  border-radius: 14px;
  .list-item-title {
    font-size: 30rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 42rpx;
    margin-bottom: 14rpx;
  }
  .list-item-content {
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #888888;
    line-height: 37rpx;
  }
  .list-item-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 32rpx;
    .time {
      display: flex;
      justify-content: center;
      align-items: center;
      image {
        width: 33rpx;
        height: 33rpx;
      }
      .text {
        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #c0c0c0;
        line-height: 37rpx;
        margin-left: 13rpx;
      }
    }
    .right {
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 30rpx;
      image {
        width: 44rpx;
        height: 44rpx;
      }
      .btn-text {
        font-size: 30rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #3b6dbb;
        line-height: 42rpx;
      }
    }
  }
}
</style>
