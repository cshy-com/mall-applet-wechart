<template>
	<view class="playAudio">
		<view class="audioName">{{audioData.url}}</view>
		<view class="audioInfo">
			<view class="audioProgressbar">
				<slider class="slider" @change="hanle_slider_change" @changing="hanle_slider_changing"  min="0" block-size="8" :max="sliderTotal"
					backgroundColor="#EDEDED" block-color="#B1876F" activeColor="#B1876F" :value="sliderVal" />
			</view>
			<view class="audioBtn" @click="audio_play">
				<image v-if="!is_play" src="https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/icon_play@2x.png"></image>
				<image v-else src="https://smfk-oss-bucket.oss-cn-beijing.aliyuncs.com/mystical/img/icon_pause@2x.png"></image>
			</view>
		</view>
		<view class="audioTxt" v-if="total_process">{{current_process}}/{{total_process}}</view>
	</view>
</template>

<script>
	export default {
		name: 'playAudio',
		props: {
			audioData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				innerAudioContext:undefined,
				is_moving_slider: false,
				is_play: false,
				current_process: 0,
				total_process: undefined,
				sliderVal:0,
				sliderTotal:0
			}
		},
		watch: {},
		mounted() {
			this.creatAudio()
		},
		onLoad(e) {},
		
		methods: {
			creatAudio() {
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.src = this.audioData.tempUrl;
				this.innerAudioContext.title = '录音文件';
				this.innerAudioContext.autoplay = false;
				this.innerAudioContext.obeyMuteSwitch = false;
				this.innerAudioContext.onPlay(() => {
					console.log('播放!');
				});
				this.innerAudioContext.onPause(() => {
					console.log('暂停播放!');
					this.is_play = false
				});
				this.innerAudioContext.onSeeking((res) => {
					console.log("进行跳转", res);
				})
			
				this.innerAudioContext.onSeeked((res) => {
					console.log("结束跳转", res);
			
				});
			
				this.innerAudioContext.onEnded(() => {
					console.log('播放结束!');
					// this.sliderVal = this.sliderTotal
					this.current_process = this.total_process
				});
			
				this.innerAudioContext.onTimeUpdate(() => {
					if(!this.is_moving_slider){
						const {
							currentTime,
							duration,
							buffered
						} = this.innerAudioContext;
						//进度条最大值
						this.total_process = this.format(duration)
						this.current_process = this.format(currentTime)
						this.sliderVal = Math.floor(currentTime)
						this.sliderTotal = Math.floor(duration)
					}
				});
			},
			audio_play() {
				if (this.is_play) {
					this.is_play = false
					this.innerAudioContext.pause()
				} else {
					this.is_play = true
					this.innerAudioContext.play()
				}
			},
			// 拖动进度条，到指定位置
			hanle_slider_change(e) {
				const position = e.detail.value
				this.is_moving_slider = false;
				this.seekCurrentAudio(position)
			},
			// 拖动进度条控件
			seekCurrentAudio(position) {
				// 更新进度条
				let that = this
				console.log('seek_position',position)
				this.innerAudioContext.seek(Math.floor(position))
				this.current_process = this.format(position)
				this.sliderVal = Math.floor(position)
			},
			hanle_slider_changing(){
				this.is_moving_slider = true;
			},
			format(t){
				let str = ''
				const minutes = Math.floor(t / 60) >= 10 ? Math.floor(t / 60) : '0' + Math.floor(t / 60)
				str = minutes + ':' + ((t % 60) / 100).toFixed(2).slice(-2)
				return str
			}
		},
	}
</script>

<style lang="scss">
	.playAudio {
		padding: 20rpx;

		.audioName {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			font-size: 24rpx;
			font-weight: bold;
			color: #333333;
		}

		.audioInfo {
			display: flex;
			align-items: center;

			.audioProgressbar {
				flex: 1;
			}

			.audioBtn {
				width: 64rpx;
				height: 64rpx;
				margin-left: 16rpx;
				background-color: #fff;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 30rpx;
					height: 30rpx;
					display: block;
				}
			}
		}

		.audioTxt {
			font-size: 21rpx;
			color: #999999;
		}
	}
</style>
