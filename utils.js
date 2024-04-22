// 排除第 %%index%% 个属性后的模糊系统数据
function getIFISExcludePropIndex(data, index) {
  return data.map(item => ({
    object: item.object,
    props: item.props.filter((_, i) => i !== index)
  }))
}

// 解析字符串数据集，生成二维数组
function parseRawData(rawData, excludePropsIndex = []) {
  const array = rawData.split('\n')
  return array.slice(1, array.length - 1).map(item => {
    return item.split(',').filter((_, index) => !excludePropsIndex.includes(index)).map(data => Number(data))
  })
}

// 翻转二维数组
function reverseArray(data) {
  const propArray = []
  data[0].forEach((_, propIndex) => {
    const objectArray = []
    data.forEach((_, objectIndex) => {
      objectArray.push(data[objectIndex][propIndex])
    })
    propArray.push(objectArray)
  })
  return propArray
}

// 根据二维数组，生成平均数
function getMeanArray(data) {
  const meanArray = []

  reverseArray(data).forEach(prop => {
    const length = prop.length
    const amount = prop.reduce((a, b) => a + b)
    meanArray.push(Number((amount / length).toFixed(2)))
  })

  return meanArray
}

function calculateMean(data) {
  const sum = data.reduce((acc, value) => acc + value, 0);
  return sum / data.length;
}

function calculateStandardDeviation(data) {
  const mean = calculateMean(data);
  const squaredDifferences = data.map((value) => Math.pow(value - mean, 2));
  const variance = calculateMean(squaredDifferences);
  return Math.sqrt(variance);
}

// 根据二维数组，生成标准差
function getStdDevArray(data, d) {
  const stdDevArray = []

  reverseArray(data).forEach(props => {
    stdDevArray.push(calculateStandardDeviation(props) / d)
  })

  return stdDevArray
}

// 非隶属度 = 1-隶属度-随机数，获取该随机数
function getDiffRand(rest) {
  const rand = Math.round(Math.random() * rest)
  if (rest == 0) {
    return 0
  }
  return [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].slice(0, rest + 1)[rand]
}

// 高斯函数计算隶属度
function gaussianMembership(data, mean, stdDev) {
  return Number(Math.exp(-Math.pow(data - mean, 2) / (2 * Math.pow(stdDev, 2))).toFixed(1))
}

function getFourRand() {
  return [Number(Math.random().toFixed(2)), Number(Math.random().toFixed(2)), Number(Math.random().toFixed(2)), Number(Math.random().toFixed(2))].sort((a, b) => a - b)
}

// 生成两组相对损失函数
function getTwoRelativeLoss() {
  let rands = getFourRand()
  while (rands[0] + rands[3] >= 1 || rands[1] + rands[2] >= 1 || rands[0] > rands[2] || rands[3] < rands[1] || rands[0] === 0 || rands[3] === 1) {
    rands = getFourRand()
  }

  return [
    [rands[0], rands[3]],
    [rands[2], rands[1]],
  ]
}

// 生成所有相对损失函数数据
function getRelativeLoss(length) {
  const relativeLoss = []
  for (let i = 0; i < length; i++) {
    const [bp, np] = getTwoRelativeLoss()
    const [bn, pn] = getTwoRelativeLoss()

    relativeLoss.push({
      object: `x${i + 1}`,
      pp: [0, 1],
      bp,
      np,
      pn,
      bn,
      nn: [0, 1]
    })
  }

  return relativeLoss
}

// 获取数据模糊系统
function getIFISData(dataArray, meanArray, stdDevArray) {
  const meanLength = meanArray.length
  const stdDevLength = stdDevArray.length
  if (meanLength !== stdDevLength || !dataArray.every(item => item.length === meanLength)) {
    throw new Error('参数错误')
  }

  const data = []

  dataArray.forEach((object, objectIndex) => {
    const props = []

    object.forEach((prop, propIndex) => {
      const membership = gaussianMembership(prop, meanArray[propIndex], stdDevArray[propIndex])
      const restMembership = Number((1 - membership).toFixed(1))
      props.push([
        membership,
        Number((restMembership - getDiffRand(restMembership * 10)).toFixed(1))
      ])
    })

    data.push({
      object: `x${objectIndex + 1}`,
      props
    })
  })

  return data
}

module.exports = {
  getIFISExcludePropIndex,
  parseRawData,
  getMeanArray,
  getStdDevArray,
  getIFISData,
  getRelativeLoss
}
