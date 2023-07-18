/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-08 17:00:41
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-18 17:02:56
 * @FilePath: \mall-applet\util\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import comUtils from './comUtils.js'
import { getAuthorization } from '@/util/auth'
import store from '../store/index.js'
export const request = (options) => {
    const token = getAuthorization()
    const headers = options.header ? options.header : {};
    if (token) {
        headers['Authorization'] = `${token}`
    }
    return new Promise((resolve, reject) => {
        uni.request({
            url: comUtils.baseUrl + options.url,
            data: options.data || {},
            method: options.method,
            header: headers,
            success: res => {
                const statusCode = res.statusCode // http状态码

                if (statusCode === 200) {
                    const requestCode = res.data.code // 自己后端定义code
                        // 成功
                    if (!requestCode) {
                        resolve(res.data)
                    } else {
                        if (requestCode === 200) {
                            resolve(res.data)
                        } else if (requestCode === 401) {
                            uni.redirectTo({
                                url: '/pages/public/login'
                            })
                        } else if (requestCode === 5001) {
                            uni.showModal({
                                title: '提示',
                                content: res.data.msg,
                                showCancel: false,
                                success: function(res) {
                                    if (res.confirm) {

                                    } else if (res.cancel) {

                                    }
                                }
                            });
                            reject(res.data)
                        } else {
                            uni.showToast({
                                title: res.data.msg || '请求接口失败',
                                icon: "none",
                                duration: 2500

                            })
                            reject(res.data)
                        }
                    }

                } else {

                    if (statusCode === 403) {
                        //没有进行身份认证
                        uni.redirectTo({
                            url: '/pages/certification/realName'
                        })

                    } else {
                        uni.showToast({
                            title: res.data.msg || '请求接口失败',
                            icon: "none",
                            duration: 2500
                        })
                    }
                    reject(res.data)
                }
            },
            fail: err => {
                // uni.showToast({
                // 	title:"请求接口失败",
                // })
                console.log('err', err)

                uni.showToast({
                    title: err.data.msg || '请求接口失败',
                    icon: "none",
                    duration: 2500
                })
                reject(err)
            }
        })
    })
}