import { axios } from '@/utils/request'
import { addParams } from '@/utils'

const get = function(url, params, options = {}) {
  return axios({ url, method: 'get', params, ...options })
}

const post = function(url, data, options = {}) {
  return axios({ url, method: 'post', data, ...options })
}

// const _delete = function (url, options = {}) {
//   return axios({ url, method: 'delete', ...options })
// }

const API = {
  login: '/oauth?grant_type=password',
  userInfo: '/service-manage-users/user/findByUsername',
  dataCollectList: '/pustone/waterSensorList',
  deviceSelectList: '/pustone/deviceLite',
  inspectList: '/pustone/waterReport',
  deviceGpsList: '/pustone/showGPS',
  deviceDetail: '/pustone/indexDevice',
}

export function login(parameter) {
  const auth = { username: 'webApp', password: '123456' }
  const data = addParams('', parameter).slice(1)
  return post(API.login, data, { auth })
}

export function queryUserInfoByUsername(username, options) {
  const url = `${API.userInfo}/${username}`
  return get(url, {}, options)
}

export function queryDataCollectList(params) {
  const url = addParams(API.dataCollectList, params)
  return get(url)
}

export function queryDeviceSelectList(params) {
  const url = addParams(API.deviceSelectList, params)
  return get(url)
}

export function queryInspectDataList(params) {
  const url = addParams(API.inspectList, params)
  return get(url)
}

export function queryInspectList(params) {
  const url = addParams(API.inspectList, params)
  return get(url)
}

export function queryDeviceGpsList(params) {
  const url = addParams(API.deviceGpsList, params)
  return get(url)
}

export function queryDeviceDetail(params) {
  const url = addParams(API.deviceDetail, params)
  return get(url)
}
