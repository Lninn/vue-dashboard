import { axios } from '@/utils/request'
import router from '../../router'

const state = {
  step: {
    payAccount: '',
    receiverAccount: {
      type: 'alipay',
      number: '',
    },
  },
}

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload,
    }
  },
}

const actions = {
  async submitStepForm({ commit }, { payload }) {
    await axios({
      url: '/api/form',
      method: 'POST',
      data: payload,
    })
    commit('saveStepFormData', payload)
    router.push('/form/step-form/result')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
