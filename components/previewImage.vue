<template>
	<uni-popup style="z-index: 99999999;position: relative;" :mask-click="false" ref="previewImgPop">
		<view style="z-index: 99999999;" class="popup-content">
			<view class="previewImgCont">
				<image :src="previewData.tempUrl" class="imgUrl" mode='aspectFit'></image>
				<image src="https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/icon_close.png" class="closeImg" @tap="handelCancel"></image>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name:'previewImage',
		props:{
			visible: { // 是否显示
				type: Boolean,
				default: false
			},
			previewData:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return{}
		},
		watch:{
			visible:{
				handler:function(newVal){
					if(newVal){
						this.$refs.previewImgPop.open('center')
					}else{
						this.$refs.previewImgPop.close()
					}
				}
			}
		},
		create(){},
		methods:{
			videoErrorCallback(){
				uni.showToast({
					icon:'none',
					title:'视频播放出错，请尝试刷新'
				})
			},
			handelCancel(){
				this.$emit('cancel')
			}
		}
	}
</script>

<style lang="scss">
	.previewImgCont {
		position: relative;
	
		.closeImg {
			position: absolute;
			width: 30rpx;
			height: 30rpx;
			top: 6rpx;
			right: 6rpx;
			z-index: 2;
			background: rgba(255, 255, 255, .6);
		}
	
		.imgUrl {
			width: 92vw;
		}
	}
</style>
