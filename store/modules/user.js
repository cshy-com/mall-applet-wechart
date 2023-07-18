/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-08 17:00:40
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-17 10:38:51
 * @FilePath: \mall-admind:\work\mall-applet\store\modules\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as api from '@/util/api.js'
import { getUserInfo } from '@/api/index'
const state = {
    userInfo: uni.getStorageSync('user'), //个人信息


}
const getters = {
    userInfo: (state) => {
        return state.userInfo
    },


}
const mutations = {
    setUserInfo: (state, val) => {
        state.userInfo = val
    },


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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}