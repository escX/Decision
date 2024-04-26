const { IFIS, relativeLoss, D } = require('./raw_data')

// 直觉模糊系统数据
const IFIS_data = IFIS()

// 相对损失函数
const relativeLoss_data = relativeLoss()

// 对比排序数据
const compare_data = []

module.exports = {
  D,
  IFIS_data,
  relativeLoss_data,
  compare_data
}
