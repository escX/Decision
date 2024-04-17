/**
 * 计算条件概率
    input1(直觉模糊系统数据): {
      object: string
      props: [number, number][]
    }[]
    input2(属性权重): number[]
    output(条件概率): {
      object: string
      probabiliey: number[]
    }[]
 */

function getConditionProbability(props, weight) {
  let memshipProbability = 0
  let nonMemshipProbability = 0

  for (let i = 0; i < props.length; i++) {
    memshipProbability += props[i][0] * weight[i]
    nonMemshipProbability += props[i][1] * weight[i]
  }

  return [memshipProbability, nonMemshipProbability]
}

function getConditionProbabilities(data, weight) {
  return data.map(item => ({
    object: item.object,
    probability: getConditionProbability(item.props, weight)
  }))
}

module.exports = getConditionProbabilities
