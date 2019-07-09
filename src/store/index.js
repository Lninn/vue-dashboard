import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

// 表单状态
import form from './modules/form'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roles: {
      permissions: [],
    },
  },
  mutations: {},
  actions: {},
  getters,
  modules: {
    form,
  },
})
