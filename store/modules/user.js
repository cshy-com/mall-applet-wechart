import * as api from '@/util/api.js'
const state = {
    userInfo: null, //个人信息


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

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}