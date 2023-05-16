import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import {serverApiUrl} from './util/api.js'
import * as myRequest from './util/api.js'

Vue.prototype.myRequest = myRequest

Vue.prototype.$serverApiUrl = serverApiUrl
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
