import * as api from '@/util/api.js'
import cateList from '@/mock/cateList.js'
const state = {
    shopInfo: null, //店铺信息
    commodityInfo: null, //商品信息
    cateAll: cateList.cateList,
    forumInfo: null, //论坛文章详情
    opinionInfo: null, //意见
    tenderDetails: null, //招标详情
    opinionList: [{
        recommendation: '建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议',
        fileList: [{
            url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
        }, {
            url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
        }, {
            url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
        }],
        tel: '9876587987',
        createTime: '2023-06-02',
        replyList: [{
            title: '接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进',
            createTime: '2023-06-02',
        }, ]


    }, {
        recommendation: '建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议',
        fileList: [],
        tel: '9876587987',
        createTime: '2023-06-02',
        replyList: [{
            title: '接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进接受建议即将改进',
            createTime: '2023-06-02',
        }, ]


    }]
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
    }


}
const mutations = {
    setShopInfo: (state, val) => {

        state.shopInfo = val
    },
    setCommodityInfo: (state, val) => {
        debugger
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