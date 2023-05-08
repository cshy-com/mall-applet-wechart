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
