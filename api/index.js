/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-08 17:00:40
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-13 16:12:54
 * @FilePath: \mall-applet\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { postPayload, postFormdata, putFormdata, deleteFormdata, getString } from '@/util/api.js'
import { data } from 'uview-ui/libs/mixin/mixin'
export function pageHome(data) {
    return getString('/index', data)
}


// 获取短信验证码

export function sendCode(data) {
    return getString('/mallCode/sendCode/' + data)
}
// 注册
export function register(data) {
    return postPayload('/mallUser/register', data)
}
// 登陆
export function login(data) {
    return postPayload('/mallUser/login', data)
}
// 获取手机号登陆
export function wxLogin(data) {
    return getString('/mallUser/wxLogin/' + data)
}

export function listByParentId(data) {

    return postPayload('/mallShopType/listByParentId/' + data)
}

export function getUserInfo() {
    return getString('/mallUser/mallGetInfo')
}
export function updateUserInfo(data) {
    return postPayload('/mallUser/mallUpdateUserInfo', data)
}

//获取论坛列表
//获取论坛详情

//客户建议列表
//新增客户建议
//客户建议详情

// 项目列表
//项目详情