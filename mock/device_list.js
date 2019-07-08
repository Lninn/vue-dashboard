const list = [
  {
    deviceId: '12354135',
    deviceModel: 'sdfasdfsdfasf',
    deviceName: '测试添加设备',
    deviceType: 1,
    id: 3,
    latitude: 23.6235,
    localeUrl: 'http://qiniu.pustonegroup.com/FiNTVzY3lDSNJXITeM5F4LVZ3r_8',
    location: '西湖',
    longitude: 23.6234,
    management: '西湖管理所',
    productionTime: '2019-07-03 10:51:49',
    version: '2.3.3',
    windLevel: null,
  },
  {
    deviceId: '123456lpLQbc',
    deviceModel: 'sdfasdfsdfasf',
    deviceName: '测试添加设备',
    deviceType: 1,
    id: 15,
    latitude: 23.6235,
    localeUrl: null,
    location: '西湖',
    longitude: 23.6234,
    management: '西湖管理所',
    productionTime: '2019-06-28 14:43:56',
    version: '2.3.3',
    windLevel: null,
  },
]

function table(method) {
  let res = null
  switch (method) {
    case 'GET':
      res = list
      break

    default:
      res = null
      break
  }

  return res
}

module.exports = table
