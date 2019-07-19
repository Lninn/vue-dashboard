import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '../config'

// base library
import './lazy_lib/components_use'
import Viser from 'viser-vue'

// ext library
import VueClipboard from 'vue-clipboard2'
import Auth from './directives/auth'
Vue.use(Auth)

import Authorized from '../components/Authorized'
Vue.component('Authorized', Authorized)

VueClipboard.config.autoSetContainer = true

Vue.use(Viser)

Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
