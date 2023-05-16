import * as api from '@/util/api.js'
const state = {
    shopInfo: null, //店铺信息
    commodityInfo: null, //商品信息

}
const getters = {
    getShopInfo: (state) => {
        return state.shopInfo
    },
    getCommodityInfo: (state) => {
        return state.commodityInfo
    }

}
const mutations = {
    setShopInfo: (state, val) => {
        state.shopInfo = val
    },
    setCommodityInfo: (state, val) => {
        state.commodityInfo = val
    }

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