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


    }],
    projectList: [{
        title: '广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告',
        content: '广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告',
        time: "2019-03-09"
    }, {
        title: '广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告',
        content: '广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告',
        time: "2019-03-09"
    }, {
        title: '广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告',
        content: '广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告',
        time: "2019-03-09"
    }, {
        title: '广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告',
        content: '广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告',
        time: "2019-03-09"
    }, {
        title: '广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告',
        content: '广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告',
        time: "2019-03-09"
    }, {
        title: '广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告',
        content: '广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告广西新柳邕农产品批发市场二期项目西侧出入口配套设施工程项目公开招标采购公告',
        time: "2019-03-09"
    }],
    integralList: [{
            title: '支付给xxx商家',
            status: '+',
            money: 90,
            time: '2019-03-05'
        }, {
            title: '转账给xxx用户',
            status: '-',
            money: 90,
            time: '2019-03-05'
        },
        {
            title: '活动赠送积分',
            status: '+',
            money: 90,
            time: '2019-03-05'
        }
    ],
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