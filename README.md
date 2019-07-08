# ant-design-vue-pro

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## User Router

## /user/login

## /user/register

## Dashboard Router

## /dashboard/analysis

## /dashboard/monitor

## /dashboard/workplace

## Forms

## /form/basic-form

## /form/step-form

+ /form/step-form/step1

+ /form/step-form/step2

+ /form/step-form/step3

## /form/advanced-form


### 首页

1 当前用户的所有设备列表信息

/api/device/list

params: { userId: 12345 }

```
[{
  deviceId: "12354135"
  deviceModel: "sdfasdfsdfasf"
  deviceName: "测试添加设备"
  deviceType: 1
  id: 3
  latitude: 23.6235
  localeUrl: "http://qiniu.pustonegroup.com/FiNTVzY3lDSNJXITeM5F4LVZ3r_8"
  location: "西湖"
  longitude: 23.6234
  management: "西湖管理所"
  productionTime: "2019-07-03 10:51:49"
  version: "2.3.3"
  windLevel: null
}]
```

3 当前用户第一次添加的设备的传感器最新数据

/api/sensor/data

params: { deviceId: 12345 }

```
[{
  centerId: 2000000002
  cod: 0
  dog: 0
  dumpEnergy: 0
  errcode: "E00007BC"
  fileId: "/Images"
  gpsLat: 0.002728
  gpsLon: 0.015498
  nhn: 0
  ph: 0
  pictureName: "ce33ff24fabbb41281dc0968f4de0688.jpg"
  temp: 0
  time: 1562050758000
  zs: 0
}]
```

### 监测点

1 用户的监测点列表（河道信息）

```
[{
  deviceId: "12354135"
  deviceModel: "sdfasdfsdfasf"
  deviceName: "测试添加设备"
  deviceType: 1
  id: 3
  latitude: 23.6235
  localeUrl: "http://qiniu.pustonegroup.com/FiNTVzY3lDSNJXITeM5F4LVZ3r_8"
  location: "西湖"
  longitude: 23.6234
  management: "西湖管理所"
  productionTime: "2019-07-03 10:51:49"
  version: "2.3.3"
  windLevel: null
}]
```

### 巡查管理

没有请求接口

### 数据服务

### 数据统计

1 当前用户的所有设备

2 当前选中设备的历史传感器数据

/api/sensor/list

params: { deviceId: 12345 }

```
[{
  centerId: 2000000002
  cod: 0
  dog: 0
  dumpEnergy: 0
  errcode: "E00007BC"
  fileId: "/Images"
  gpsLat: 0.002728
  gpsLon: 0.015498
  nhn: 0
  ph: 0
  pictureName: "ce33ff24fabbb41281dc0968f4de0688.jpg"
  temp: 0
  time: 1562050758000
  zs: 0
}]
```

### 数据分析

没有内容

### 预警分析

没有接口