/**
 * 计算重要度
   input1(所有属性下的优势信息熵): [number, number]
   input2（排除某个属性时的优势信息熵）: [number, number]
   output: [number, number]
 */

function getImportantDegree(allEntropy, excludeEntropy) {
  if (allEntropy[1] !== excludeEntropy[1]) {
    throw new Error('分母不相等')
  } else {
    // 我们的计算方式应该能保证分母一致，不再进行转换
  }

  const entropyNum = Math.abs(allEntropy[0] - excludeEntropy[0])
  const entropyDen = allEntropy[1]

  return [entropyNum, entropyDen]
}

module.exports = getImportantDegree
