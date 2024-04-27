const { makeDecision } = require('./main')
const { IFIS_data, relativeLoss_data, D } = require('./test/data')

window.sort_liang = []
window.sort_wang = []
window.category_liang = []
window.category_wang = []
window.makeDecision = function (S) {
  return makeDecision(S, D, IFIS_data, relativeLoss_data)
}
