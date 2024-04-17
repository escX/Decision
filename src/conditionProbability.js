/**
 * 计算条件概率
    input1(直觉模糊系统数据): {
      object: string
      props: [number, number][]
    }[]
    input2(优势类个数): number[]
    input3(属性权重): [number, number][]
    output(条件概率): {
      object: string
      probability: number[]
    }[]
 */

const Decimal = require('decimal.js')

function getConditionProbability(props, advanAmount, weights) {
  let memshipProbability = new Decimal(0)
  let nonMemshipProbability = new Decimal(0)
  const advanAmountDecimal = new Decimal(advanAmount)

  for (let i = 0; i < props.length; i++) {
    const memship = new Decimal(props[i][0])
    const nonMemship = new Decimal(props[i][1])
    const weightDecimal = new Decimal(weights[i][0]).div(new Decimal(weights[i][1]))
    memshipProbability = memshipProbability.plus(memship.times(weightDecimal))
    nonMemshipProbability = nonMemshipProbability.plus(nonMemship.times(weightDecimal))
  }

  return [
    memshipProbability.div(advanAmountDecimal).toNumber(),
    nonMemshipProbability.div(advanAmountDecimal).toNumber()
  ]
}

function getConditionProbabilities(data, advanAmounts, weights) {
  return data.map((item, index) => ({
    object: item.object,
    probability: getConditionProbability(item.props, advanAmounts[index], weights)
  }))
}

module.exports = getConditionProbabilities
