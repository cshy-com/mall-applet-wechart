/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-08 17:00:41
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-09 09:39:19
 * @FilePath: \mall-applet\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import { serverApiUrl } from './util/api.js'
import * as myRequest from './util/api.js'

Vue.prototype.myRequest = myRequest

Vue.prototype.$serverApiUrl = serverApiUrl
import comUtils from './util/comUtils.js'
Vue.prototype.$fileUrl = comUtils.fileUrl
console.log('comUtils.fileUrl' + comUtils.fileUrl, comUtils)
import nodata from './components/nodata.vue';
Vue.component('nodata', nodata);
import noMore from './components/noMore.vue';
Vue.component('noMore', noMore);
import defNav from "./components/defNav.vue"
Vue.component('defNav', defNav)
import store from './store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'
    // 封装自定义提示框
import $tip from 'util/tip.js'
Vue.prototype.$tip = $tip
import './filters/index'
import uView from 'uview-ui'
Vue.use(uView)
    // 如此配置即可
uni.$u.config.unit = 'rpx'
Number.prototype.az = function(n = 2) {
    let s = "";
    for (let i = 1; i < n; i++) {
        s += '0';
    }
    return (s + this).slice(-1 * n);
}
Vue.mixin({
    methods: {
        setData: function(obj) {
            let that = this;
            let keys = [];
            let val, data;
            Object.keys(obj).forEach(function(key) {
                keys = key.split('.');
                val = obj[key];
                data = that.$data;
                keys.forEach(function(key2, index) {
                    if (index + 1 == keys.length) {
                        that.$set(data, key2, val);
                    } else {
                        if (!data[key2]) {
                            that.$set(data, key2, {});
                        }
                    }
                    data = data[key2];
                })
            });
        }
    }
});
const app = new Vue({
    ...App,
    store
})
app.$mount()
    // #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
    const app = createSSRApp(App)
    return {
        app
    }
}
// #endif