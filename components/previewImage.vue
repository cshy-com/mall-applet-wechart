<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-08 17:00:40
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-04 14:45:27
 * @FilePath: \mall-admind:\work\mall-applet\components\previewImage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<uni-popup style="z-index: 99999999;position: relative;" :mask-click="false" ref="previewImgPop">
		<view style="z-index: 99999999;" class="popup-content">
			<view class="previewImgCont">
				<image :src="tempUrl" class="imgUrl" mode='aspectFit'></image>
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
			},
			tempUrl:{
				type:String,
				default:''
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
			width:60rpx;
			height: 60rpx;
			top: 6rpx;
			right: 0rpx;
			z-index: 2;
			border-radius: 50%;
			background: rgba(255, 255, 255, .6);
		}
	
		.imgUrl {
			width: 92vw;
		}
	}
</style>
