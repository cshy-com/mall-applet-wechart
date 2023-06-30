/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-11 16:59:40
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-06-30 16:40:19
 * @FilePath: \mall-applet\pages\merchant\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//所有二三级分类项
const cateList = [
        [{
                title: '黑珍珠',
                id: 0,
                icon: './../../../static/img/icon/home-icon-1.png',

            },
            {
                title: '五星餐厅',
                icon: './../../../static/img/icon/home-icon-2.png',

            },
            {
                title: '私房菜',
                icon: './../../../static/img/icon/home-icon-3.png',

            }, {
                title: '下午茶',
                icon: './../../../static/img/icon/home-icon-4.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-5.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-6.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-7.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-8.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-1.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-2.png',

            }
        ],
        [{
                title: '农庄',
                icon: './../../../static/img/icon/home-icon-1.png',

            },
            {
                title: '亲子游',
                icon: './../../../static/img/icon/home-icon-2.png',

            },
            {
                title: '露营',
                icon: './../../../static/img/icon/home-icon-3.png',

            }, {
                title: '采摘',
                icon: './../../../static/img/icon/home-icon-4.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-5.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-6.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-7.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-8.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-1.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-2.png',
            }
        ],
        [{
                title: '奢侈品护理',
                icon: './../../../static/img/icon/home-icon-1.png',

            },
            {
                title: '日式收纳',
                icon: './../../../static/img/icon/home-icon-2.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-3.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-4.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-5.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-6.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-7.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-8.png',
            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-1.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-2.png',
            }
        ],
        [{
                title: '名医问诊',
                icon: './../../../static/img/icon/home-icon-1.png',

            },
            {
                title: '高端体检',
                icon: './../../../static/img/icon/home-icon-2.png',

            },
            {
                title: '洁牙',
                icon: './../../../static/img/icon/home-icon-3.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-4.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-5.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-6.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-7.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-8.png',
            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-1.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-2.png',
            }
        ],
        [{
                title: '彩妆',
                icon: './../../../static/img/icon/home-icon-1.png',

            },
            {
                title: '美容护肤',
                icon: './../../../static/img/icon/home-icon-2.png',

            },
            {
                title: '美甲',
                icon: './../../../static/img/icon/home-icon-3.png',

            }, {
                title: '发型',
                icon: './../../../static/img/icon/home-icon-4.png',

            }, {
                title: '养生/艾灸',
                icon: './../../../static/img/icon/home-icon-5.png',

            }, {
                title: '塑形',
                icon: './../../../static/img/icon/home-icon-6.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-7.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-8.png',
            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-1.png',

            }, {
                title: '广告位',
                icon: './../../../static/img/icon/home-icon-2.png',
            }
        ],
        [{
                title: '健身中心',
                icon: './../../../static/img/icon/home-icon-1.png',

            },
            {
                title: '游泳',
                icon: './../../../static/img/icon/home-icon-2.png',

            },
            {
                title: '台球',
                icon: './../../../static/img/icon/home-icon-3.png',

            }, {
                title: '找教练',
                icon: './../../../static/img/icon/home-icon-4.png',

            }, {
                title: '订场',
                icon: './../../../static/img/icon/home-icon-5.png',

            }, {
                title: '武术搏击',
                icon: './../../../static/img/icon/home-icon-6.png',

            }, {
                title: '球类运动',
                icon: './../../../static/img/icon/home-icon-7.png',

            }, {
                title: '赛车',
                icon: './../../../static/img/icon/home-icon-8.png',

            }, {
                title: '羽毛球',
                icon: './../../../static/img/icon/home-icon-1.png',

            }, {
                title: '足球',
                icon: './../../../static/img/icon/home-icon-2.png',

            }
        ]
    ]
    // 一级分类项
const parentCate = [
    '定制商宴',
    '定制服装',
    '定制美容',
    '定制医疗',
    '健身私教',
    '定制服装',
    '定制KTV',
    '项目发布',
]
const selectData =

    [
        [{
                title: '美食',
                data: [
                    { text: '小吃', identity: 1, status: false },
                    { text: '火锅', identity: 2, status: false },
                    { text: '烧烤', identity: 3, status: false },
                    { text: '自助', identity: 4, status: false },
                ]
            },
            {
                title: '智能排序',
                data: [
                    { text: '好评优先', identity: 1, status: false },
                    { text: '销量优先', identity: 2, status: false },
                    { text: '价格优先', identity: 3, status: false },
                    { text: '配送优先', identity: 4, status: false },
                ]
            },
            {
                title: '筛选',
                data: [
                    { text: '三日内', identity: 1, status: false },
                    { text: '七日内', identity: 2, status: false },
                    { text: '一个月内', identity: 3, status: false }
                ]
            },
        ],
        [

            {
                title: '智能排序',
                data: [
                    { text: '好评优先', identity: 1, status: false },
                    { text: '销量优先', identity: 2, status: false },
                    { text: '价格优先', identity: 3, status: false },
                    { text: '配送优先', identity: 4, status: false },
                ]
            },
            {
                title: '筛选',
                data: [
                    { text: '三日内', identity: 1, status: false },
                    { text: '七日内', identity: 2, status: false },
                    { text: '一个月内', identity: 3, status: false }
                ]
            },
        ],
        [{
                title: '特价团购',
                data: [
                    { text: '小吃', identity: 1, status: false },
                    { text: '火锅', identity: 2, status: false },
                    { text: '烧烤', identity: 3, status: false },
                    { text: '自助', identity: 4, status: false },
                ]
            },

            {
                title: '智能排序',
                data: [
                    { text: '三日内', identity: 1, status: false },
                    { text: '七日内', identity: 2, status: false },
                    { text: '一个月内', identity: 3, status: false }
                ]
            },
        ],
        [

            {
                title: '智能排序',
                data: [
                    { text: '好评优先', identity: 1, status: false },
                    { text: '销量优先', identity: 2, status: false },
                    { text: '价格优先', identity: 3, status: false },
                    { text: '配送优先', identity: 4, status: false },
                ]
            },
            {
                title: '筛选',
                data: [
                    { text: '三日内', identity: 1, status: false },
                    { text: '七日内', identity: 2, status: false },
                    { text: '一个月内', identity: 3, status: false }
                ]
            },
        ],
        [

            {
                title: '智能排序',
                data: [
                    { text: '好评优先', identity: 1, status: false },
                    { text: '销量优先', identity: 2, status: false },
                    { text: '价格优先', identity: 3, status: false },
                    { text: '配送优先', identity: 4, status: false },
                ]
            },
            {
                title: '筛选',
                data: [
                    { text: '三日内', identity: 1, status: false },
                    { text: '七日内', identity: 2, status: false },
                    { text: '一个月内', identity: 3, status: false }
                ]
            },
        ],
    ]

// tag筛选
const tagList = [
        [
            '餐厅品质',
            '多人聚餐',
            '外卖到家',
            '营业中',
            '好评'
        ],
        [
            '潮牌',

        ],
        [
            '母亲节',

        ],
        [
            '特价团购',
            '附近',
            '智能排序'
        ],
        []

    ]
    //   二级页面tab切换
const statusList = [
        [{
                title: '美食餐厅',

            },
            {
                title: '品质外卖',

            },
        ],
        [{
                title: '精品服饰',
            },
            {
                title: '私家定制',
            },
        ],
        [{
                title: '精选好店铺',
            },
            {
                title: '发现好发型',
            },
            {
                title: '美发',
            },
            {
                title: '美甲美睫',
            },
            {
                title: '美容',
            },
        ],
        [{
                title: '爱护牙齿',
            },
            {
                title: '保护视力',
            },
            {
                title: '检查健康',
            },
            {
                title: '呵护女性',
            },
            {
                title: '养生调理',
            },
        ],
        [{
            title: '猜你喜欢',
        }]

    ]
    //   二级页面左右布局文章数据

const prods = [{
    prodId: 1,
    prodName: '店铺1',
    avater: '',
    name: 'momo',
    zan: 152
}, {
    prodId: 1,
    prodName: '店铺1',
    avater: '',
    name: 'momo',
    zan: 152
}, {
    prodId: 1,
    prodName: '店铺1',
    avater: '',
    name: 'momo',
    zan: 152
}, {
    prodId: 1,
    prodName: '店铺1',
    avater: '',
    name: 'momo',
    zan: 152
}, {
    prodId: 1,
    prodName: '店铺1',
    avater: '',
    name: 'momo',
    zan: 152
}, {
    prodId: 1,
    prodName: '店铺1',
    avater: '',
    name: 'momo',
    zan: 152
}, {
    prodId: 1,
    prodName: '店铺1',
    avater: '',
    name: 'momo',
    zan: 152
}, {
    prodId: 1,
    prodName: '店铺1',
    avater: '',
    name: 'momo',
    zan: 152
}, {
    prodId: 1,
    prodName: '店铺1',
    avater: '',
    name: 'momo',
    zan: 152
}, {
    prodId: 1,
    prodName: '店铺1',
    avater: '',
    name: 'momo',
    zan: 152
}]


const shopProds = [{
    prodId: 1,
    prodName: '寻味巴蜀2-3人餐',
    preview: '',
    price: '168',
    sale: 1000,
    discount: 8.1,
    originalPrice: 200
}, {
    prodId: 1,
    prodName: '寻味巴蜀2-3人餐',
    preview: '',
    price: '168',
    sale: 1000,
    discount: 8.1,
    originalPrice: 200
}, {
    prodId: 1,
    prodName: '寻味巴蜀2-3人餐',
    preview: '',
    price: '168',
    sale: 1000,
    discount: 8.1,
    originalPrice: 200
}, {
    prodId: 1,
    prodName: '寻味巴蜀2-3人餐',
    preview: '',
    price: '168',
    sale: 1000,
    discount: 8.1,
    originalPrice: 200
}, {
    prodId: 1,
    prodName: '寻味巴蜀2-3人餐',
    preview: '',
    price: '168',
    sale: 1000,
    discount: 8.1,
    originalPrice: 200
}]

const mockJson = [{
        shopAvater: 'http://39.104.53.172:8888/upload/2023/05/shop111.jpg',
        shopList: [{
                url: 'https://cdn.uviewui.com/uview/resources/video.mp4',
                poster: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
                type: 'video'
            },
            {

                url: 'http://39.104.53.172:8888/upload/2023/05/shop111-1.jpg',
                type: 'image',

            }, {
                url: 'http://39.104.53.172:8888/upload/2023/05/shop111-2.jpg',
                type: 'image',

            }, {

                url: 'http://39.104.53.172:8888/upload/2023/05/shop111-1.jpg',
                type: 'image',

            },
        ],
        shopName: '喜舍(江滩店)',
        type: 0,
        pid: 26,
        cateId: 23,
        rate: 4.9,
        totalComent: 551,
        averagePrice: 317,
        characteristic: '小吃甜点',
        address: '武昌/大东门',
        addressDetail: '沿江大道111号（武汉世茂凡象酒店2层）',
        tel: '18802717177',
        st: '11:30',
        et: '21:00',
        score1: 4.9,
        score2: 4.9,
        score3: 4.9,
        ranking: '武昌区小吃环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: 'http://39.104.53.172:8888/upload/2023/05/shop222.jpg',
        shopList: [{
                url: 'https://cdn.uviewui.com/uview/resources/video.mp4',
                poster: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
                type: 'video'
            },
            {

                url: 'http://39.104.53.172:8888/upload/2023/05/shop222-1.jpg',
                type: 'image',

            }, {
                url: 'http://39.104.53.172:8888/upload/2023/05/shop222-2.jpg',
                type: 'image',

            },
            {

                url: 'http://39.104.53.172:8888/upload/2023/05/shop222-1.jpg',
                type: 'image',

            }
        ],
        shopName: '观湖别院',
        type: 0,
        rate: 4.6,
        pid: 26,
        cateId: 23,
        totalComent: 399,
        averagePrice: 343,
        characteristic: '小吃甜点',
        address: '武昌/大东门',
        addressDetail: '楚河汉街万达尊对面烟霞路一号',
        tel: '027-87898008',
        st: '11:00',
        et: '21:00',
        score1: 4.8,
        score2: 4.9,
        score3: 4.8,
        ranking: '武昌区小吃环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    },
    {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '竹馨庄园',
        type: 0,
        rate: 4.6,
        pid: 2,
        cateId: 30,
        totalComent: 780,
        averagePrice: 83,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '木兰花谷',
        type: 1,
        rate: 4.2,
        pid: 2,
        cateId: 31,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '房车营地泾河公园',
        rate: 4.2,
        type: 2,
        pid: 2,
        cateId: 32,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '石榴红村',
        rate: 4.2,
        type: 3,
        pid: 2,
        cateId: 33,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '永辉草莓采摘基地',
        rate: 4.2,
        type: 4,
        pid: 2,
        cateId: 33,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '永辉草莓采摘基地',
        rate: 4.2,
        type: 5,
        pid: 2,
        cateId: 33,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '古德寺',
        rate: 4.2,
        type: 6,
        pid: 2,
        cateId: 32,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '昙华林',
        rate: 4.2,
        type: 7,
        pid: 2,
        cateId: 33,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '花博会',
        rate: 4.2,
        type: 8,
        pid: 2,
        cateId: 30,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '武汉大学-樱园',
        rate: 4.2,
        type: 9,
        pid: 2,
        cateId: 31,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    },
    {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '享一收纳',
        type: 0,
        rate: 4.6,
        pid: 3,
        cateId: 34,
        totalComent: 780,
        averagePrice: 83,
        characteristic: '收纳大师',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '收纳好评榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '素帕缇生活馆',
        rate: 4.2,
        type: 1,
        pid: 3,
        cateId: 45,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '上上弓射箭馆',
        rate: 4.2,
        type: 2,
        pid: 3,
        cateId: 34,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '全明星擂台',
        rate: 4.2,
        type: 3,
        pid: 3,
        cateId: 35,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '屋有岛沉浸游戏体验馆',
        rate: 4.2,
        type: 4,
        pid: 3,
        cateId: 34,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '喵庄园',
        rate: 4.2,
        type: 5,
        pid: 3,
        cateId: 35,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '肆意时光',
        rate: 4.2,
        type: 6,
        pid: 3,
        cateId: 34,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '悠米私人影院',
        rate: 4.2,
        type: 7,
        pid: 3,
        cateId: 35,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '乾潭',
        rate: 4.2,
        type: 8,
        pid: 3,
        cateId: 34,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '吾泰',
        rate: 4.2,
        type: 9,
        pid: 3,
        cateId: 35,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    },
    {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '永康堂',
        rate: 4.6,
        type: 0,
        pid: 4,
        cateId: 36,
        totalComent: 780,
        averagePrice: 83,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '爱康体检',
        rate: 4.2,
        type: 1,
        pid: 4,
        cateId: 37,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '萌芽齿科',
        rate: 4.2,
        type: 2,
        pid: 4,
        cateId: 38,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    },
    {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '思妍丽',
        rate: 4.6,
        type: 3,
        pid: 3,
        cateId: 39,
        totalComent: 780,
        averagePrice: 83,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '佐登妮丝SPA生活馆',
        rate: 4.2,
        type: 4,
        pid: 5,
        cateId: 40,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: 'mia美妆',
        rate: 4.2,
        type: 5,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        pid: 5,
        cateId: 41,

        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,

        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '仁爱口腔',
        rate: 4.2,
        type: 6,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        pid: 5,
        cateId: 42,

        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,

        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '牙达人口腔',
        rate: 4.2,
        type: 7,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        pid: 5,
        cateId: 43,

        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,

        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '好大夫口腔',
        rate: 4.2,
        type: 8,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        pid: 5,
        cateId: 44,

        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,

        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }, {
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopList: [],
        shopName: '新华健康',
        rate: 4.2,
        type: 9,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        address: '武昌/大东门',
        pid: 5,
        cateId: 45,

        addressDetail: '湖北省武汉市武昌区世贸商城F区3楼',
        tel: '027-123468',
        st: '11:00',
        et: '20:30',
        score1: 4.7,
        score2: 4.8,
        score3: 4.9,

        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }
]
export default {
    cateList,
    parentCate,
    selectData,
    tagList,
    statusList,
    prods,
    shopProds,
    mockJson
}