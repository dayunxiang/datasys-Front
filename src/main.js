// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

//proxy代理。上线后失效
// axios.defaults.baseURL="/api"

/* eslint-disable no-new */
new Vue({
  el: '#wrapper',
  router,
  components: { App },
  template: '<App/>'
})
