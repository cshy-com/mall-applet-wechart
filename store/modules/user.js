import * as api from '@/util/api.js'
const state = {
	userInfo: null, 			//个人信息
	bankAuthRes: null,		//银行卡绑定结果
	
}
const getters = {
	GET_USERINFO: (state) => {
		return state.userInfo
	},
	GET_BANKAUTHRES: (state) => {
		return state.bankAuthRes
	}
	
}
const mutations = {
	SET_USERINFO: (state, val) => {
		state.userInfo = val
	},
	SET_BANKAUTHRES: (state, val) => {
		state.bankAuthRes = val
	}
	
}
const actions = {
	// 判断是否登录--新加接口
	isLogin({
		commit,
		dispatch
	}) {
		return new Promise((resolve, reject) => {
			api.postPayload(api.serverApiUrl.getLoginStatus).then(res => {
				// 已经登录
				if (res.data) {
					dispatch('wxLogin').then(res2 => {
						resolve(res2)
					}).catch(() => {
						reject()
					})
				} else {
					reject()
				}
			}).catch(() => {
				reject()
			})
		})
	
	},
	wxLogin({
		commit
	}) {
		// 获取登录凭证
		return new Promise((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success: (res) => {
					const code = res.code
					// 静默登录
					api.postPayload(api.serverApiUrl.clientLogin, {
						loginCode: code
					}).then(res2 => {
						// 直接进入首页
						const resData = res2.data
						uni.setStorageSync('token', resData.userToken)
						resolve(res2)
					}).catch(() => {
						reject()
					})
				}
			})
		})
	},
	getUserInfo({
		commit
	}) {
		return new Promise((resolve, reject) => {
			api.getString(api.serverApiUrl.getUserInfo).then(res => {
				const resData = res.data
				 
					commit('SET_USERINFO', resData)
					resolve(res)
				
				
			}).catch(() => {
				reject()
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