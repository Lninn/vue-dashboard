const random = require('lodash/random')

function chart(method) {
  let res = null
  switch (method) {
    case 'GET':
      res = [...Array(6)].map(() => random(100))
      break
    default:
      res = null
  }
  return res
}

module.exports = chart
