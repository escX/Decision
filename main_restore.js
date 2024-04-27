const { makeDecision } = require('./main')
const { D } = require('./test/data')
const IFIS_data = require('./test/data_restore_IFIS')
const relativeLoss_data = require('./test/data_restore_relativeLoss')
const sort_liang = require('./test/data_restore_sort_liang')
const sort_wang = require('./test/data_restore_sort_wang')
const category_liang = require('./test/data_restore_category_liang')
const category_wang = require('./test/data_restore_category_wang')

window.sort_liang = sort_liang
window.sort_wang = sort_wang
window.category_liang = category_liang
window.category_wang = category_wang
window.makeDecision = function (S) {
  return makeDecision(S, D, IFIS_data, relativeLoss_data)
}
