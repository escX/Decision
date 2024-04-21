const { IFIS, relativeLoss } = require('./raw_data')

// 西格玛参数
const S = 0.6

// 直觉模糊系统数据
const IFIS_data = IFIS()

// 相对损失函数
const relativeLoss_data = relativeLoss()

module.exports = {
  S,
  IFIS_data,
  relativeLoss_data
}
