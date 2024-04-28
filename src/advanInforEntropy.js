/**
 * 计算优势信息熵
    input(优势类数据): {
      object: string
      moreBetter: string[]
    }[]
    output(优势信息熵): [number, number]
 */

// 遍历累加 -(objectAmount - moreBetter.length) / (objectAmount * objectAmount)
function getAdvanInfoEntropy(data) {
  const objectAmount = data.length
  const entropyDen = objectAmount * objectAmount // 分母
  let entropyNum = 0 // 分子

  for (let i = 0; i < data.length; i++) {
    const moreBetterAmount = data[i].moreBetter.length
    entropyNum += (data.length - moreBetterAmount)
  }

  return [-entropyNum, entropyDen]
}

module.exports = getAdvanInfoEntropy
