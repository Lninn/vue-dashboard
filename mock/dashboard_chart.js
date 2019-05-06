const random = require('lodash/random')

function chart(method) {
  let res = null

  switch (method) {
    case 'GET':
      res = [...Array(10)].map(() => random(100))
      break

    default:
      res = null
      break
  }

  return res
}

module.exports = chart
