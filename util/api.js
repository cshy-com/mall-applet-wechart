/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-08 17:00:41
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-19 13:58:18
 * @FilePath: \mall-admind:\work\mall-applet\util\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from './request.js'

export const postPayload = (url, data) => {
    return request({
        method: 'post',
        url: url,
        data: data
    })
}
export const postFormdata = (url, data) => {
    return request({
        method: 'post',
        url: url,
        data: data,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    })
}
export const putFormdata = (url, data) => {
    return request({
        method: 'PUT',
        url: url,
        data: data,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    })
}
export const putPayload = (url, data) => {
    return request({
        method: 'PUT',
        url: url,
        data: data
    })
}
export const deleteFormdata = (url, data) => {
    return request({
        method: 'DELETE',
        url: url,
        data: data,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    })
}
export const getString = (url, data) => {
    return request({
        method: 'GET',
        url: url,
        data: data,
        header: {
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
}