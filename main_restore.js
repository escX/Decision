const { makeDecision } = require('./main')
const { D } = require('./test/data')
const IFIS_data = require('./test/data_restore_IFIS')
const relativeLoss_data = require('./test/data_restore_relativeLoss')
const compare_liang = require('./test/data_restore_compare_liang')
const compare_liu = require('./test/data_restore_compare_liu')

window.compare_liang = compare_liang
window.compare_liu = compare_liu
window.makeDecision = function (S) {
  return makeDecision(S, D, IFIS_data, relativeLoss_data)
}
