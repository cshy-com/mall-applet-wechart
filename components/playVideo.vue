<template>
	<uni-popup style="z-index: 99999999;" :mask-click="false" ref="playVideo">
		<view class="playPanelCont">
			<image src="https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/icon_close.png" class="closeImg" @tap="handelCancel"></image>
			<video id="myVideo" 
				:src="videoData.tempUrl"
				@error="videoErrorCallback" 
				controls
			></video>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name:'playVideo',
		props:{
			visible: { // 是否显示
				type: Boolean,
				default: false
			},
			videoData:{
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
						this.$refs.playVideo.open('center')
					}else{
						this.$refs.playVideo.close()
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

<style>
	.playPanelCont{
		padding-top: 40rpx;
		position: relative;
	}
	.closeImg {
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		top: 6rpx;
		right: 6rpx;
		z-index: 999;
		background: rgba(255, 255, 255, .6);
	}
</style>
