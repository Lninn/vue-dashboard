function data(method) {
  let res = null
  switch (method) {
    case 'POST':
      res = {
        centerId: 2000000002,
        cod: 0,
        dog: 0,
        dumpEnergy: 0,
        errcode: 'E00007BC',
        fileId: '/Images',
        gpsLat: 0.002728,
        gpsLon: 0.015498,
        nhn: 0,
        ph: 0,
        pictureName: 'ce33ff24fabbb41281dc0968f4de0688.jpg',
        temp: 0,
        time: 1562050758000,
        zs: 0,
      }
      break

    default:
      res = null
      break
  }

  return res
}

module.exports = data
