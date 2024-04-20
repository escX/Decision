/**
 * 计算期望损失
    input1(相对损失函数): {
      object: string
      pp: [number, number]
      bp: [number, number]
      np: [number, number]
      pn: [number, number]
      bn: [number, number]
      nn: [number, number]
    }[]
    input2(条件概率): {
      object: string
      probability: [number, number]
    }[]
    output(期望损失): {
      object: string
      p: [number, number]
      b: [number, number]
      n: [number, number]
    }[]
 */

const Decimal = require('decimal.js')

function oplus(ua, ub, va, vb) {
  const decimalOne = new Decimal(1)
  const decimalUa = new Decimal(ua)
  const decimalUb = new Decimal(ub)
  const decimalVa = new Decimal(va)
  const decimalVb = new Decimal(vb)

  return [
    Number(decimalOne.minus(decimalOne.minus(decimalUa).times(decimalOne.minus(decimalUb))).toFixed(4)),
    Number(decimalVa.times(decimalVb).toFixed(4))
  ]
}

function otimes(ua, ub, va, vb) {
  const decimalOne = new Decimal(1)
  const decimalUa = new Decimal(ua)
  const decimalUb = new Decimal(ub)
  const decimalVa = new Decimal(va)
  const decimalVb = new Decimal(vb)

  return [
    decimalUa.times(decimalUb).toNumber(),
    decimalOne.minus(decimalOne.minus(decimalVa).times(decimalOne.minus(decimalVb))).toNumber(),
  ]
}

function getExpectedLosses(relativeLoss, conditionProbability) {
  const expectedLoss = []
  for (let i = 0; i < relativeLoss.length; i++) {
    const [ub, vb] = conditionProbability[i].probability
    const [_vb, _ub] = conditionProbability[i].probability

    const [ppua, ppva] = relativeLoss[i].pp
    const [pnua, pnva] = relativeLoss[i].pn
    const [bpua, bpva] = relativeLoss[i].bp
    const [bnua, bnva] = relativeLoss[i].bn
    const [npua, npva] = relativeLoss[i].np
    const [nnua, nnva] = relativeLoss[i].nn

    const [pua, pva] = otimes(ppua, ub, ppva, vb)
    const [pub, pvb] = otimes(pnua, _ub, pnva, _vb)
    const p = oplus(pua, pub, pva, pvb)

    const [bua, bva] = otimes(bpua, ub, bpva, vb)
    const [bub, bvb] = otimes(bnua, _ub, bnva, _vb)
    const b = oplus(bua, bub, bva, bvb)

    const [nua, nva] = otimes(npua, ub, npva, vb)
    const [nub, nvb] = otimes(nnua, _ub, nnva, _vb)
    const n = oplus(nua, nub, nva, nvb)

    expectedLoss.push({
      object: relativeLoss[i].object,
      p,
      b,
      n
    })
  }
  return expectedLoss
}

module.exports = getExpectedLosses
