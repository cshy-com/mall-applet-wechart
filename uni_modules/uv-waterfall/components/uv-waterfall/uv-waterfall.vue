<template>
	<view class="uv-waterfall">
		<!-- #ifndef APP-NVUE -->
		<view class="uv-waterfall__gap_left"
			:style="[gapLeftStyle]"></view>
		<template v-if="columnNum>=1">
			<view id="uv-waterfall-1"
				class="uv-waterfall__column">
				<slot name="list1"
					:list1="list1"></slot>
			</view>
		</template>
		<template v-if="columnNum>=2">
			<view class="uv-waterfall__gap_center"
				:style="[gapCenterStyle]"></view>
			<view id="uv-waterfall-2"
				class="uv-waterfall__column">
				<slot name="list2"
					:list2="list2"></slot>
			</view>
		</template>
		<template v-if="columnNum>=3">
			<view class="uv-waterfall__gap_center"
				:style="[gapCenterStyle]"></view>
			<view id="uv-waterfall-3"
				class="uv-waterfall__column">
				<slot name="list3"
					:list3="list3"></slot>
			</view>
		</template>
		<template v-if="columnNum>=4">
			<view class="uv-waterfall__gap_center"
				:style="[gapCenterStyle]"></view>
			<view id="uv-waterfall-4"
				class="uv-waterfall__column">
				<slot name="list4"
					:list4="list4"></slot>
			</view>
		</template>
		<template v-if="columnNum>=5">
			<view class="uv-waterfall__gap_center"
				:style="[gapCenterStyle]"></view>
			<view id="uv-waterfall-5"
				class="uv-waterfall__column">
				<slot name="list5"
					:list5="list5"></slot>
			</view>
		</template>
		<view class="uv-waterfall__gap_right"
			:style="[gapRightStyle]"></view>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<waterfall
			:column-count="columnNum"
			:show-scrollbar="false"
			column-width="auto"
			:column-gap="columnGap"
			:left-gap="leftGap"
			:right-gap="rightGap"
			:always-scrollable-vertical="true"
			:style="[nvueWaterfallStyle]"
			@loadmore="scrolltolower">
			<slot></slot>
		</waterfall>
		<!-- #endif -->
	</view>
</template>
<script>
	import mpMixin from '@/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js'
	import mixin from '@/uni_modules/uv-ui-tools/libs/mixin/mixin.js'
	import props from './props.js';
	/**
	 * 瀑布流
	 * @description 该组件兼容所有端，nvue参考https://uniapp.dcloud.net.cn/component/waterfall.html
	 * @tutorial https://www.uvui.cn/components/list.html
	 * @property {Array}	value/modelValue	瀑布流数组数据，非nvue生效 （默认 [] ）
	 * @property {String}	idKey	  数据的id值，根据id值对数据执行删除操作，如数据为：{id: 1, name: 'uv-ui'}，那么该值设置为id，非nvue有效 （默认 '' ）
	 * @property {String ｜ Number}	addTime		每次插入数据的事件间隔，间隔越长能保证两列高度相近，但是用户体验不好，单位ms，非nvue生效（默认 200 ）
	 * @property {String ｜ Number}	columnCount		瀑布流的列数（默认 2 ）
	 * @property {String ｜ Number}			columnGap		列与列的间隙（默认 0 ）
	 * @property {String ｜ Number}			leftGap		左边和列表的间隙（默认 0 ）
	 * @property {String ｜ Number}			rightGap	右边和列表的间隙（默认 0 ）
	 * @property {Boolean}	showScrollbar		控制是否出现滚动条，仅nvue有效 （默认 false ）
	 * @property {String ｜ Number}		columnWidth		描述瀑布流每一列的列宽，nvue生效 （默认 auto）
	 * @property {String ｜ Number}	  width	  瀑布流的宽度，nvue生效 （默认 屏幕宽 ）
	 * @property {String ｜ Number}		height	 瀑布流的高度，nvue生效 （默认 屏幕高 ）
	 * @property {Object}	customStyle		定义需要用到的外部样式
	 *
	 * @example <uv-waterfall v-model="list"></uv-waterfall>
	 */
	export default {
		name: 'uv-waterfall',
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				list1: [],
				list2: [],
				list3: [],
				list4: [],
				list5: [],
				// 临时列表
				tempList: [],
				sys: uni.$uv.sys()
			}
		},
		computed: {
			// 破坏value变量引用，否则数据会保持不变
			copyValue() {
				// #ifdef VUE2
				return uni.$uv.deepClone(this.value)
				// #endif
				// #ifdef VUE3
				return uni.$uv.deepClone(this.modelValue)
				// #endif
			},
			columnNum() {
				return this.columnCount <= 0 ? 0 : this.columnCount >= 5 ? 5 : this.columnCount;
			},
			gapLeftStyle() {
				const style = {}
				style.width = uni.$uv.addUnit(this.leftGap)
				return style;
			},
			gapRightStyle() {
				const style = {}
				style.width = uni.$uv.addUnit(this.rightGap)
				return style;
			},
			gapCenterStyle() {
				const style = {}
				style.width = uni.$uv.addUnit(this.columnGap)
				return style;
			},
			nvueWaterfallStyle(){
				const style = {},
				addUnit = uni.$uv.addUnit
				if (this.width != 0) style.width = addUnit(this.width)
				if (this.height != 0) style.height = addUnit(this.height)
				// 如果没有定义列表高度，则默认使用屏幕高度
				if (!style.width) style.width = addUnit(this.sys.windowWidth, 'px')
				if (!style.height) style.height = addUnit(this.sys.windowHeight, 'px')
				return uni.$uv.deepMerge(style, uni.$uv.addStyle(this.customStyle))
			}
		},
		watch: {
			copyValue(nVal, oVal) {
				// #ifndef APP-NVUE
				// 取出数组发生变化的部分
				let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0
				// 拼接原有数据
				this.tempList = this.tempList.concat(uni.$uv.deepClone(nVal.slice(startIndex)))
				this.splitData()
				// #endif
			}
		},
		mounted() {
			// #ifndef APP-NVUE
			this.tempList = uni.$uv.deepClone(this.copyValue)
			this.splitData()
			// #endif
		},
		methods: {
			// 滚动到底部触发事件
			scrolltolower(e) {
				uni.$uv.sleep(30).then(() => {
					this.$emit('scrolltolower')
				})
			},
			// 拆分数据
			async splitData() {
				let rectArr = [];
				if (!this.tempList.length) return
				for (let i = 1; i <= this.columnNum; i++) {
					const rect = await this.$uvGetRect(`#uv-waterfall-${i}`);
					rectArr.push({ ...rect, name: i });
				}
				let item = this.tempList[0]
				// 因为经过上面两个await节点查询和定时器，数组有可能会变成空[]，导致item的值为undefined
				// 解决多次快速滚动会导致数据乱的问题
				if (!item) return
				const minCol = this.getMin(rectArr);
				// 列宽可能使用的到
				item.width = minCol.width;
				this[`list${minCol.name}`].push(item);
				// 移除临时数组中已处理的数据
				this.tempList.splice(0, 1)
				// 如果还有数据则继续执行
				if (this.tempList.length) {
					setTimeout(() => {
						this.splitData()
					}, this.addTime)
				} else {
					this.$emit('finish')
				}
			},
			getMin(arr) {
				const min = Math.min.apply(Math, arr.map(item => {
					return item.height;
				}))
				const newArr = arr.filter(item => item.height == min);
				return newArr[0];
			},
			// 清空数据列表
			clear() {
				for (let i = 1; i <= this.columnCount; i++) {
					this[`list${i}`] = [];
				}
				// #ifdef VUE2
				this.$emit('input', [])
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', [])
				// #endif
				this.tempList = []
			},
			// 清除指定的某一条数据，根据id来实现
			remove(id) {
				let index = -1
				// 删除组件数据
				for (let i = 1; i <= this.columnCount; i++) {
					index = this[`list${i}`].findIndex(item => item[this.idKey] == id)
					if (index != -1) {
						this[`list${i}`].splice(index, 1)
					}
				}
				// 同时删除父组件对应的数据
				// #ifdef VUE2
				index = this.value.findIndex(item => item[this.idKey] == id)
				if (index != -1) this.$emit('input', this.value.splice(index, 1))
				// #endif
				// #ifdef VUE3
				index = this.modelValue.findIndex(item => item[this.idKey] == id)
				if (index != -1) this.$emit('update:modelValue', this.modelValue.splice(index, 1))
				// #endif
			}
		}
	}
</script>
<style lang="scss"
	scoped>
	@import '@/uni_modules/uv-ui-tools/libs/css/components.scss';
	.uv-waterfall {
		@include flex(row);
		align-items: flex-start;
		&__column {
			@include flex(column);
			flex: 1;
			// #ifndef APP-NVUE
			height: auto;
			// #endif
		}
	}
</style>