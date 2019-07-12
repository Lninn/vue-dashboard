import Vue from 'vue'
import store from '@/store/'
import {
  ACCESS_TOKEN,
  USER_INFO,
  USER_NAME,
  USER_ID,
} from '@/store/mutation-types'

export default function Initializer() {
  const userInfo = JSON.parse(Vue.ls.get(USER_INFO) || '')
  store.commit('app/SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
  store.commit(`app/${USER_NAME}`, userInfo.username)
  store.commit(`app/${USER_ID}`, userInfo.id)
  // last step
}
