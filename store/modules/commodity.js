import * as api from '@/util/api.js'
const state = {
    shopInfo: null, //店铺信息
    commodityInfo: null, //商品信息
    cateAll: [],
    forumInfo: null, //论坛文章详情
    opinionInfo: null, //意见
    tenderDetails: null, //招标详情
    opinionList: [],
    projectList: [],
    integralList: [],
    integralInfo: null, //积分收支详情
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
    },
    opinionInfo: (state) => {
        return state.opinionInfo
    },
    tenderDetails: (state) => {
        return state.tenderDetails
    },
    opinionList: (state) => {
        return state.opinionList
    },
    projectList: (state) => {
        return state.projectList
    },
    integralList: (state) => {
        return state.integralList
    },
    integralInfo: (state) => {
        return state.integralInfo
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
    },
    setOpinionInfo: (state, val) => {
        state.opinionInfo = val
    },
    seTenderDetails: (state, val) => {
        state.tenderDetails = val
    },
    setOpinionList: (state, val) => {
        state.opinionList = val
    },
    setProjectList: (state, val) => {
        state.projectList = val
    },
    setIntegralList: (state, val) => {
        state.integralList = val
    },
    setIntegralInfo: (state, val) => {
        state.integralInfo = val
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