/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-08 17:00:40
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-30 17:56:20
 * @FilePath: \mall-applet\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { postPayload, postFormdata, putPayload, deleteFormdata, getString, getPayload } from '@/util/api.js'
export function pageHome(data) {
    return getString('/index', data)
}
// 获取短信验证码

export function sendCode(data) {
    return getString('/mallCode/sendCode/' + data)
}
// 注册
export function register(data) {
    return postPayload('/mallUser/register', data)
}
// 登陆
export function login(data) {
    return postPayload('/mallUser/login', data)
}
// 获取手机号登陆
export function wxLogin(data) {
    return getString('/mallUser/wxLogin/' + data)
}

export function listByParentId(data) {

    return postPayload('/mallShopType/listByParentId/' + data)
}
// 获取用户信息
export function getUserInfo() {
    return getString('/mallUser/mallGetInfo')
}
// 修改个人信息
export function updateUserInfo(data) {
    return postPayload('/mallUser/mallUpdateUserInfo', data)
}

//获取论坛分页列表
export function ForumPage(data) {
    return postPayload('/mallForum/page', data)
}
//获取论坛详情
export function forumDetail(data) {
    return getString('/mallForum/obj/' + data)
}
// 论坛新增
export function forumAdd(data) {
    return postPayload("/mallForum/add", data)
}
// 论坛修改
export function forumUpdate(data) {
    return putPayload('/mallForum/update', data)
}
// 论坛删除
export function forumDel(data) {
    return deleteFormdata('/mallForum/delete/' + data)
}
// 论坛浏览量 
export function forumView(data) {
    return getString('/mallForum/mallPageView/' + data)
}
// 列表论坛发布 
export function mallForumListAdd(data) {
    return putPayload('/mallForum/listAdd/' + data)
}
//客户建议列表
export function advicesList(data) {
    return postPayload("/advices/page", data)
}
//新增客户建议
export function advicesAdd(data) {
    return postPayload("/advices/add", data)
}
//客户建议详情
export function advicesInfo(data) {
    return getString("/advices/details", data)
}

// 项目列表
export function projectPage(data) {
    return postPayload("/projects/page", data)
}
//项目详情
export function projectObj(data) {
    return getString("/projects/obj/" + data)
}
// 查询字典数据列表
export function systemDictList(data) {
    return getPayload('/system/dict/data/list', data)
}
//根据id查询用户信息
export function getUserInfoById(data) {

    return getString("/mallUser/mallGetInfoById", data)
}

// 论坛评论
export function mallForumCommentsAdd(data) {
    return postPayload("/mallForumComments/add", data)
}
export function mallForumCommentsPage(data) {
    return postPayload("/mallForumComments/page", data)
}