const { IFIS, relativeLoss, D, S } = require('./raw_data')

// 直觉模糊系统数据
const IFIS_data = IFIS()

// 相对损失函数
const relativeLoss_data = relativeLoss()

module.exports = {
  D,
  S,
  IFIS_data,
  relativeLoss_data
}
