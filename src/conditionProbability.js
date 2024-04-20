/**
 * 计算条件概率
    input1(对象优势类的隶属度和非隶属度): [number, number][][]
    input2(属性权重): [number, number][]
    output(条件概率): [number, number]
 */

const Decimal = require('decimal.js')

function getConditionProbability(advanMemship, weights) {
  let memshipTotal = new Decimal(0)
  let nonMemshipTotal = new Decimal(0)
  const advanAmount = new Decimal(advanMemship.length)
  const weightsDecimal = weights.map(item => new Decimal(item[0]).div(new Decimal(item[1])))

  for (let i = 0; i < advanMemship.length; i++) {
    // 计算第i个优势对象
    const object = advanMemship[i]
    for (let j = 0; j < object.length; j++) {
      // 计算第j个属性
      const memShipDecimal = object[j].map(item => new Decimal(item))
      memshipTotal = memshipTotal.plus(memShipDecimal[0].times(weightsDecimal[j]))
      nonMemshipTotal = nonMemshipTotal.plus(memShipDecimal[1].times(weightsDecimal[j]))
    }
  }

  return [
    Number(memshipTotal.div(advanAmount).toFixed(4)),
    Number(nonMemshipTotal.div(advanAmount).toFixed(4))
  ]
}

module.exports = getConditionProbability
