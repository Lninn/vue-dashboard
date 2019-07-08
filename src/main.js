import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Dropdown,
  Tabs,
  Form,
  Input,
  Checkbox,
  Select,
  Table,
  Row,
  Col,
  Divider,
  Card,
  Alert,
  Modal,
  Badge,
} from 'ant-design-vue'
Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(Dropdown)
Vue.use(Tabs)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Table)
Vue.use(Row)
Vue.use(Col)
Vue.use(Divider)
Vue.use(Card)
Vue.use(Alert)
Vue.use(Modal)
Vue.use(Badge)

import Authorized from './components/Authorized'
Vue.component('Authorized', Authorized)
import Auth from './directives/auth'
Vue.use(Auth)

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1154049_w87h4oeytph.js', // 在 iconfont.cn 上生成
})

Vue.component('IconFont', IconFont)

import VueAMap from 'vue-amap'
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
    'AMap.PolyEditor',
    'AMap.CircleEditor',
  ],
})

import { VueAxios } from './utils/request'
Vue.use(VueAxios)

// 本地存储
import VueStorage from 'vue-ls'
Vue.use(VueStorage, {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
