/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-29 13:54:15
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-09-06 09:52:14
 * @FilePath: \mall-admind:\work\mall-applet\api\integral.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { postPayload, putPayload, postFormdata, putFormdata, deleteFormdata, getString } from '@/util/api.js'



// 扫积分券码领积分
export function mallIntegralTicket(data) {
    return getString('/credits/details/add', data)
}
// 积分赠送
export function mallPaymentByPhoneNumber(data) {
    return postPayload('/mallIntegral/mallPaymentByPhoneNumber', data)
}
// 扫码支付积分
export function mallPaymentByUserId(data) {
    return postPayload('/mallIntegral/mallPaymentByUserId', data)
}

// 手机号转账
export function creditsTransfer(data) {
    return postPayload('/credits/details/transfer', data)
}

// 扫码转账给商家
export function creditsConsume(data) {
    return postPayload('/credits/details/consume', data)
}

// 商家收款码
export function paymentCode(data) {
    return postPayload('/mallShop/paymentCode', data)
}
// 积分明细
export function creditsDetailsPage(data) {
    return postPayload('/credits/details/page', data)
}
// 查询商家总积分
export function shopCreditsTotal(data) {
    return getString("/shop/credits/total", data)
}
// 查询商家积分明细
export function shopCreditsTotalPage(data) {
    return postPayload('/shop/credits/total/page', data)
}

// 查询个人积分
export function getUserTotal(data) {
    return getString("/credits/total/remaining")
}
// 个人付款码
export function getUserPayQrcode(data) {
    return getString('/mallUser/getQrcode', data)
}
// 商家收款

export function mallShopPayed(data) {
    return getString('/mallShop/getPayed', data)
}
// 生成转赠二维码
export function transferQrCode(data) {
    return getString('/credits/details/transferQrCode', data)

}
// 二维码转账
export function transferQrCodeScan(data) {
    return postPayload('/credits/details/transferQrCode/scan', data)
}
// 扫描转赠二维码获取详情
export function getTransferInfo(data) {
    return getString('/credits/transfer/history/obj/' + data)
}
// 根据积分券查积分信息
export function mallIntegralTicketObj(data) {
    return getString('/mallIntegralTicket/obj/' + data)
}
export function transferQrCodeDetails(data) {
    return getString('/credits/details/transferQrCode/query', data)
}