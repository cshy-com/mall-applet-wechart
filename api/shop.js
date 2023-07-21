/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-24 16:20:08
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-20 15:08:51
 * @FilePath: \mall-applet\api\shop.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { postPayload, postFormdata, putFormdata, deleteFormdata, getString } from '@/util/api.js'

// 分类 根据父级id查询子级列表
export function mallShopTypeListByParentId(data) {
    return getString('/mallShopType/mallListByParentId/' + data)
}
// 获取店铺详情
export function mallShopById(data) {
    return getString('/mallShop/mallObj/' + data)
}
// 获取店铺列表
export function mallShopPage(data) {
    return postPayload('/mallShop/page', data)
}
// 获取用户店铺收藏列表
export function mallShopCollectList(data) {
    return postPayload('/mallShopCollect/mallPage', data)
}
// 用户收藏店铺
export function mallShopCollectAdd(data) {
    return postPayload('/mallShopCollect/mallAdd/' + data)
}
// 取消收藏
export function mallShopCollectDel(data) {
    return postPayload('/mallShopCollect/mallDel/' + data)
}
// 获取商品列表

export function getCommodityList(data) {
    return postPayload('/mallCommodity/list', data)

}
// 查分页
export function getCommodityPage(data) {
    return postPayload('/mallCommodity/page', data)

}
// 获取商品详情
export function getCommodityDetail(data) {
    return getString('/mallCommodity/obj/' + data)
}

// 店铺评论新增
export function shopCommentsAdd(data) {
    return postPayload('/shop/comments/add', data)
}
// 查询店铺评论
export function shopCommentsPage(data) {
    return postPayload('/shop/comments/page', data)
}
// 查看订单评论
export function shopCommentsObj(data) {
    return getString('/shop/comments/obj', data)
}