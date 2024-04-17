/**
 * 计算权重
   input(重要度): [number, number][]
   output(权重): [number, number][]
 */

function getWeights(data) {
  let totalWeight = 0
  const weights = []

  for (let i = 0; i < data.length; i++) {
    totalWeight += data[i][0]
  }
  for (let i = 0; i < data.length; i++) {
    const weight = data[i][0]
    weights.push([weight, totalWeight])
  }

  return weights
}

module.exports = getWeights
