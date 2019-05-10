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

import Authorized from './components/Authorized'
Vue.component('Authorized', Authorized)
import Auth from './directives/auth'
Vue.use(Auth)

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1154049_w87h4oeytph.js', // 在 iconfont.cn 上生成
})

Vue.component('IconFont', IconFont)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
