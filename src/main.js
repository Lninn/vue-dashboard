// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import './core/lazy_use'

import VueAMap from 'vue-amap'
localStorage.removeItem('_AMap_raster')
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: 'ca1ba3379644b43538076505f51700d3',
  plugin: [
    'Geocoder',
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.CircleEditor',
  ],
})

import { VueAxios } from './utils/request'
Vue.use(VueAxios)

import './utils/directives/action'

import bootstrap from './bootstrap'

import './permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: h => h(App),
}).$mount('#app')
