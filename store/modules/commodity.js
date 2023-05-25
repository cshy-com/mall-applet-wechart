import * as api from '@/util/api.js'
import cateList from '@/mock/cateList.js'
const state = {
    shopInfo: null, //店铺信息
    commodityInfo: null, //商品信息
    cateAll: cateList.cateList

}
const getters = {
    shopInfo: (state) => {

        return state.shopInfo
    },
    commodityInfo: (state) => {
        return state.commodityInfo
    },
    cateAll: (state) => {

        return state.cateAll
    }

}
const mutations = {
    setShopInfo: (state, val) => {

        state.shopInfo = val
    },
    setCommodityInfo: (state, val) => {
        state.commodityInfo = val
    },
    setCateAll: (state, val) => {

        state.cateAll = val
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