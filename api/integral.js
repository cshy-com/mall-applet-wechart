import { postPayload, putPayload, postFormdata, putFormdata, deleteFormdata, getString } from '@/util/api.js'


// 领取积分
export function collectPoints(data) {
    return postPayload("/coupon/receive", data)
}