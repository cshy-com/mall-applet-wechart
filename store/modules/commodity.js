import * as api from '@/util/api.js'
import cateList from '@/mock/cateList.js'
const state = {
    shopInfo: null, //店铺信息
    commodityInfo: null, //商品信息
    cateAll: cateList.cateList,
    forumInfo: null //论坛文章详情

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
    },
    forumInfo: (state) => {
        return state.forumInfo
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
    },
    setForumInfo: (state, val) => {
        state.forumInfo = val
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