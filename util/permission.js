/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-09 17:44:38
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-05-11 11:24:11
 * @FilePath: \mall-admind:\work\mall-applet\util\permission.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getAuthorization } from '@/util/auth'

// 白名单
const whiteList = [
    '/', // 注意入口页必须直接写 '/'
    '/pages/public/login',
    '/pages/public/register',
    '/pages/public/agreement'
]

export default async function() {
    const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
        // 用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
    list.forEach(item => {
        uni.addInterceptor(item, {
            invoke(e) {
                // 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
                const url = e.url.split('?')[0]
                console.log('url', url)

                // 判断当前窗口是白名单，如果是则不重定向路由
                let pass
                if (whiteList) {
                    pass = whiteList.some((item) => {
                        if (typeof(item) === 'object' && item.pattern) {
                            return item.pattern.test(url)
                        }
                        return url === item
                    })
                }

                // 不是白名单并且没有token
                if (!pass && !getAuthorization()) {
                    uni.showToast({
                        title: '请先登录',
                        icon: 'none'
                    })
                    uni.navigateTo({
                        url: "/pages/public/login"
                    })
                    return false
                }
                return e
            },
            fail(err) { // 失败回调拦截
                console.log(err)
            }
        })
    })
}