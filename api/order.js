/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-16 15:40:50
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-28 17:55:32
 * @FilePath: \mall-admind:\work\mall-applet\api\order.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { postPayload, putPayload, postFormdata, putFormdata, deleteFormdata, getString } from '@/util/api.js'

// 获取订单列表
export function orderList(data) {
    return postPayload("/mallOrder/page", data)
}
//获取订单详情
export function orderDatail(data) {
    return getString('/mallOrder/obj/' + data)
}
//订单新增
export function orderAdd(data) {
    return postPayload('/mallOrder/add', data)
}
//获取订单二维码
export function orderQrCode(data) {
    return getString('/mallOrder/mallGetOrderQrcode/' + data)
}
// 商家完成订单
export function orderComplete(data) {
    return putPayload('/mallOrder/mallForFinish/' + data)
}
// 商家提交到店信息
export function orderForArrived(data) {
    return getString('/mallOrder/mallForArrivedByQrcode/' + data)
}
// 商家用过扫码获取code，订单详情
export function orderDetailByQrcode(data) {
    return getString('/mallOrder/mallGetObjByQrcode/' + data)
}
// 取消订单 

export function orderStatusChange(data) {
    return getString(`/mallOrder/cancel`, data)
}

//  完成订单
export function finishOrder(data) {
    return getString('/credits/details/consume', data)
}
export function mallOrderNumbers(data) {
    return getString('/mallOrder/countByStatus', data)
}