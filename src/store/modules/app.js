import {
  queryDeviceSelectList,
  queryDataCollectList,
  login,
  queryUserInfoByUsername,
  queryInspectDataList,
  queryDeviceGpsList,
  queryDeviceDetail,
} from '@/services'
import {
  ACCESS_TOKEN,
  SET_TOKEN,
  USER_INFO,
  USER_ID,
  USER_NAME,
  STEP_FORMDATA,
} from '@/store/mutation-types'
import Vue from 'vue'

import { getPageResult } from '@/utils'

const state = {
  user: {
    token: '',
    name: '',
    id: '',
  },
  step: {
    payAccount: '',
    receiverAccount: {
      type: 'alipay',
      number: '',
    },
  },
}

const mutations = {
  [SET_TOKEN](state, token) {
    state.user.token = token
  },

  [USER_NAME](state, name) {
    state.user.name = name
  },

  [USER_ID](state, id) {
    state.user.id = id
  },

  [STEP_FORMDATA](state, { payload }) {
    state.step = {
      ...state.step,
      ...payload,
    }
  },
}

const actions = {
  Login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(response => {
          const {
            access_token: accessToken,
            expires_in: expiresIn,
            token_type: tokenType,
          } = response
          // console.log('expiresIn ', expiresIn)
          const token = `${tokenType} ${accessToken}`
          queryUserInfoByUsername(userInfo.username, {
            headers: { Authorization: token },
          }).then(res => {
            commit(USER_NAME, res.username)
            commit(USER_ID, res.id)
            Vue.ls.set(USER_INFO, JSON.stringify(res))

            commit(SET_TOKEN, token)
            Vue.ls.set(ACCESS_TOKEN, token, parseInt(expiresIn) * 1000)

            resolve(res)
          })
        })
        .catch(err => reject(err))
    })
  },

  GetDevSelectList({ state }) {
    return new Promise((resolve, reject) => {
      queryDeviceSelectList({ userId: state.user.id })
        .then(res => {
          const list = res.map((item, index) => {
            return {
              label: item.deviceName,
              value: item.deviceId,
              index: index + 1,
            }
          })
          resolve(list)
        })
        .catch(err => reject(err))
    })
  },

  GetDataCollectList({ state }, payload) {
    return queryDataCollectList(
      Object.assign({}, { userId: state.user.id }, payload)
    ).then(data => {
      return getPageResult(
        { page: data.pageNo, pageSize: data.pageSize },
        { total: data.total, data: data.data },
        { no: '' }
      )
    })
  },

  // eslint-disable-next-line
  GetInspectDataList({ state }, payload) {
    return queryInspectDataList(payload).then(data => {
      return getPageResult(
        { page: data.pageNo, pageSize: data.pageSize },
        { total: data.total, data: data.data },
        { no: '' }
      )
    })
  },

  GetDeviceGpsList() {
    return queryDeviceGpsList({ userId: state.user.id })
  },

  GetDeviceDetail({ state }, deviceId) {
    return queryDeviceDetail({ userId: state.user.id, deviceId })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
