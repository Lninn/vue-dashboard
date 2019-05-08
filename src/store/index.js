import Vue from 'vue'
import Vuex from 'vuex'

// 表单状态
import form from './modules/form'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    form,
  },
})
