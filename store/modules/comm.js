/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-23 09:31:02
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-05-23 09:31:28
 * @FilePath: \mall-applet\store\modules\comm.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as api from '@/util/api.js'
import comUtils from '@/util/comUtils.js'
const state = {

    fileUrl: comUtils.fileUrl

}
const getters = {

    fileUrl: (state) => {
        return state.fileUrl
    }

}
const mutations = {

    setFileUrl: (state, value) => {
        state.fileUrl = value
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