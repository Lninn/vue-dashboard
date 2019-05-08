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

import Authorized from './components/Authorized'
Vue.component('Authorized', Authorized)
import Auth from './directives/auth'
Vue.use(Auth)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
