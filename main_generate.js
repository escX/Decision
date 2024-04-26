const { makeDecision } = require('./main')
const { IFIS_data, relativeLoss_data, D } = require('./test/data')

window.compare_liang = []
window.compare_liu = []
window.makeDecision = function (S) {
  return makeDecision(S, D, IFIS_data, relativeLoss_data)
}
