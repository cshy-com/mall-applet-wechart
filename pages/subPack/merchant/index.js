/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-11 16:59:40
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-05-11 17:25:28
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

const mockJson = [
    [{
            shopAvater: './../../../static/img/cate/shop-avater.png',
            shopName: 'BIOBLE至爱法麦面包（西北湖店）',
            type: 0,
            rate: 4.6,
            totalComent: 780,
            averagePrice: 83,
            characteristic: '川菜馆',
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
            shopName: '伊莉维尔',
            rate: 4.2,
            type: 0,
            totalComent: 200,
            averagePrice: 40,
            characteristic: '川菜馆',
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
            shopName: '店铺名称2',
            rate: 4.2,
            type: 1,
            totalComent: 200,
            averagePrice: 40,
            characteristic: '川菜馆',
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
    ],
    [{
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopName: '竹馨庄园',
        rate: 4.6,
        totalComent: 780,
        averagePrice: 83,
        characteristic: '川菜馆',
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
        shopName: '木兰花谷',
        rate: 4.2,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
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
        shopName: '房车营地泾河公园',
        rate: 4.2,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
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
        shopName: '石榴红村',
        rate: 4.2,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
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
        shopName: '永辉草莓采摘基地',
        rate: 4.2,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }],
    [{
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopName: '美容店铺名称1',
        rate: 4.6,
        totalComent: 780,
        averagePrice: 83,
        characteristic: '川菜馆',
        ranking: '享一收纳',
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
        shopName: '美容店铺名称1',
        rate: 4.2,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }],
    [{
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopName: '永康堂',
        rate: 4.6,
        totalComent: 780,
        averagePrice: 83,
        characteristic: '川菜馆',
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
        shopName: '爱康体检',
        rate: 4.2,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
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
        shopName: '萌芽齿科',
        rate: 4.2,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }],
    [{
        shopAvater: './../../../static/img/cate/shop-avater.png',
        shopName: '思妍丽',
        rate: 4.6,
        totalComent: 780,
        averagePrice: 83,
        characteristic: '川菜馆',
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
        shopName: '佐登妮丝SPA生活馆',
        rate: 4.2,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
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
        shopName: 'mia美妆',
        rate: 4.2,
        totalComent: 200,
        averagePrice: 40,
        characteristic: '川菜馆',
        ranking: '武昌区川菜环境榜第一名',
        canCoupon: true,
        couponList: [{
            price: 98,
            total: 100,
        }, {
            price: 188,
            total: 200,
        }]

    }]
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