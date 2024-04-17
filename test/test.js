const getAdvantages = require('../src/advantages')
const getAdvanInfoEntropy = require('../src/advanInforEntropy')

const { IFIS_data, advantages_data } = require('./test_data')

function test_getAdvantages() {
  const res = getAdvantages(IFIS_data)
  console.log(res)
}

function test_getAdvanInfoEntropy() {
  const res = getAdvanInfoEntropy(advantages_data)
  console.log(res)
}

module.exports = {
  test_getAdvantages,
  test_getAdvanInfoEntropy,
}
