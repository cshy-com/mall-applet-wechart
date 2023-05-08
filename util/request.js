import comUtils from './comUtils.js'
import store from '../store/index.js'
export const request= (options) =>{
	const token = uni.getStorageSync('token')
	const headers = options.header ? options.header : {};
	if(token){
		headers.Cookie	= `token=${token}`
	}
	return new Promise((resolve,reject)=>{
		uni.request({
			url:comUtils.baseUrl + options.url,
			data:options.data || {},
			method:options.method,
			header: headers,
			success:res => {
				const statusCode = res.statusCode // http状态码
				if(statusCode === 200){
					const requestCode = res.data.code // 自己后端定义code
					// 成功
					if(!requestCode){
						resolve(res.data)
					}else{
						if(requestCode === 200){
							resolve(res.data)
						}else{
							uni.showToast({
								title: res.data.msg || '请求接口失败',
								icon: "none"
							})
							reject(res.data)
						}
					}
					
				}else{
					if(statusCode === 401){
						uni.redirectTo({
							url:'/pages/login/login'
						})
					}else if(statusCode === 403){
						//没有进行身份认证
						uni.redirectTo({
							url:'/pages/certification/realName'
						})

					}else{
						uni.showToast({
							title: res.data.msg || '请求接口失败',
							icon: "none"
						})
					}
					reject(res.data)
				}
			},
			fail:err => {
				// uni.showToast({
				// 	title:"请求接口失败",
				// })
				console.log('err',err)
				uni.showToast({
					title: err.data.msg || '请求接口失败',
					icon: "none"
				})
				reject(err)
			}
		})
	})
}