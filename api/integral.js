/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-06-29 13:54:15
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-18 11:35:04
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
export function creditsDetailsPage(data) {
    return postPayload('/credits/details/page', data)
}
export function shopCreditsTotal(data) {
    return getString("/shop/credits/total", data)
}

export function shopCreditsTotalPage(data) {
    return postPayload('/shop/credits/total/page', data)
}