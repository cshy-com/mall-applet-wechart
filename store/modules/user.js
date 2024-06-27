/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-08 17:00:40
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-29 14:06:15
 * @FilePath: \mall-admind:\work\mall-applet\store\modules\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as api from '@/util/api.js'
import { getUserInfo } from '@/api/index'
import { getUserTotal, shopCreditsTotal } from '@/api/integral'
import { mallOrderNumbers } from '@/api/order';
const state = {
    userInfo: uni.getStorageSync('user'), //个人信息
    integralTotal: 0, //积分
    orderNumber: null

}
const getters = {
    userInfo: (state) => {
        return state.userInfo
    },
    integralTotal: (state) => {
        return state.integralTotal
    },
    orderNumber: (state) => {
        return state.orderNumber
    }



}
const mutations = {
    setUserInfo: (state, val) => {
        state.userInfo = val
    },
    setIntegralTotal: (state, val) => {
        state.integralTotal = val
    },
    setOrderNumber: (state, val) => {
        state.orderNumber = val
    }
}
const actions = {
    setUserInfoAction: async(content, val) => {
        try {
            let res = await getUserInfo()
            content.commit('setUserInfo', res.data)
            uni.setStorageSync('user', res.data)
        } catch (e) {
            console.log(e)
        }
    },
    setIntegralTotalAction: async(content, val) => {
        try {
            let http = val == 2 ? shopCreditsTotal() : getUserTotal()
            let res = await http
            content.commit('setIntegralTotal', res.data)

        } catch (e) {
            console.log(e)
        }
    },
    setOrderNumberAction: async(content, val) => {
        try {

            let res = await mallOrderNumbers()
            content.commit('setOrderNumber', res.data)

        } catch (e) {
            console.log(e)
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}