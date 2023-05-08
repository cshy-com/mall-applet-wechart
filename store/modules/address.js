import amapFile from '@/util/amap-wx.130.js'
import comUtils from '@/util/comUtils.js'
import * as api from '@/util/api.js'
const state = {
	cityDetails: {},		//城市信息
	fullCidy: {},				// 全局城市切换
}
const getters = {
	GET_CITYDETAILS: (state) => {
		return state.cityDetails
	},
	GET_FULLCITY: (state) => {
		return state.fullCidy
	},
}
const mutations = {
	SET_CITYDETAILS: (state, val) => {
		state.cityDetails = val
	},
	SET_FULLCITY: (state, val) => {
		state.fullCidy = val
	},
}
const actions = {
	getCity({
		commit
	}) {
		return new Promise((resolve, reject) => {
			// 向用户发起授权请求
			uni.authorize({
				scope: "scope.userLocation",
				success() {
					// 获取当前的地理位置、速度
					// uni.getLocation({
					// 	type: 'gcj02',
					// 	success: res => {
					/*
					 *** 高德API
					 */
					const key = comUtils.aMapKey
					let myAmapFun = new amapFile.AMapWX({
						key: key
					});
					// const location =
					// 	`${res.longitude},${res.latitude}` //location的格式为'经度,纬度'
					myAmapFun.getRegeo({
						// location: location,
						success: function(data) {
							//成功回调
							console.log(data, '高德getRegeo')
							const cityDetails = data[0]
							const regeocodeData = cityDetails
								.regeocodeData // 高德返回的逆地理编码
							// 通过高德行政区编码换取数据库城市码
							const params = {
								// cityCode: regeocodeData.addressComponent.adcode,
								cityName: regeocodeData.addressComponent
									.city
							}
							api.getString(api.serverApiUrl.convertCity, params)
								.then(result => {
									const resData = result.data
									cityDetails.city_code = resData.code
									cityDetails.city = resData.codeName
									commit('SET_CITYDETAILS', cityDetails)
									resolve(cityDetails)
								})
						},
						fail: function(info) {
							//失败回调
							console.log(info, '高德fail')
						}
					})
					// 	}
					// })
				},
				// 若用户不同意授权，弹框提示
				fail(res) {
					var that = this;
					wx.getSystemInfo({
						success: function(res) {
							if (res.locationEnabled == false) {
								uni.showToast({
									icon: "none",
									title: '未获取到您的定位权限，请在设置中打开。',
									duration: 2000
								})
							} else {
								uni.showModal({
									content: '未获取到您的定位权限，请在设置中打开。',
									confirmText: "确认",
									cancelText: '取消',
									success: (res) => {
										if (res.confirm) {
											uni.openSetting({
												success: (
													res
												) => {
													that
														.getLocation();
												}
											})
										} else {
											return false;
										}
									}
								})
								return false;
							}
						}
					})
					reject()
				}
			})
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}