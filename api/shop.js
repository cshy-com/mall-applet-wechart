/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-24 16:20:08
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-05-29 14:11:34
 * @FilePath: \mall-applet\api\shop.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { postPayload, postFormdata, putFormdata, deleteFormdata, getString } from '@/util/api.js'

// 分类 根据父级id查询子级列表
export function mallShopTypeListByParentId(data) {
    return getString('/mallShopType/mallListByParentId/' + data)
}
export function mallShopById(data) {
    return getString('/mallShop/obj/' + data)
}
export function mallShopPage(data) {
    return postPayload('/mallShop/page', data)
}