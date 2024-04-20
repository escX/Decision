/**
 * 计算期望损失
    input(期望损失): {
      object: string
      p: [number, number]
      b: [number, number]
      n: [number, number]
    }[]
    output(得分函数): {
      object: string
      sp: number
      sb: number
      sn: number
    }[]
 */

const Decimal = require('decimal.js')

function getScore(u, v) {
  const decimalU = new Decimal(u)
  const decimalV = new Decimal(v)
  const decimalOne = new Decimal(1)
  const decimalTwo = new Decimal(2)

  return Number(decimalU.minus(decimalV).plus((decimalOne.minus(decimalU).minus(decimalV)).div(decimalTwo)).toFixed(4))
}

function getScores(expectedLosses) {
  const scores = []
  for (let i = 0; i < expectedLosses.length; i++) {
    const expectedLoss = expectedLosses[i]
    scores.push({
      object: expectedLoss.object,
      sp: getScore(...expectedLoss.p),
      sb: getScore(...expectedLoss.b),
      sn: getScore(...expectedLoss.n),
    })
  }
  return scores
}

module.exports = getScores
