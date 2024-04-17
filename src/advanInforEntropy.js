/**
 * 计算优势信息熵
    input(优势类数据): {
      object: string
      moreBetter: string[]
    }[]
    output(优势信息熵): number
 */

const Decimal = require('decimal.js')

// 计算优势概率
function getAdvanProbability(advanAmount, totalAmount) {
  const a = new Decimal(advanAmount)
  const b = new Decimal(totalAmount)

  return a.div(b)
}

// 遍历累加：(moreBetter.length / objectAmount) * (1 - (moreBetter.length / objectAmount))
function getAdvanInfoEntropy(data) {
  let entropy = 0

  data.forEach(item => {
    const advanProbability = getAdvanProbability(item.moreBetter.length, data.length)
    entropy += (advanProbability * (1 - advanProbability))
  })

  return entropy
}

module.exports = getAdvanInfoEntropy
