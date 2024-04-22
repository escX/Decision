const { IFIS_data, relativeLoss_data, S, D } = require('./test/data')
const { getIFISExcludePropIndex } = require('./utils')
const getAdvantages = require('./src/advantages')
const getAdvanInfoEntropy = require('./src/advanInforEntropy')
const getImportantDegree = require('./src/importantDegree')
const getWeights = require('./src/weights')
const getConditionProbability = require('./src/conditionProbability')
const getExpectedLosses = require('./src/expectedLoss')
const getScores = require('./src/score')
const getDecision = require('./src/decision')

const displayProgress = process.argv.slice(2)[0] === '--progress'

displayProgress && console.log('---------------------- 优势类 ----------------------')
const advan = getAdvantages(IFIS_data)
displayProgress && console.log('包含所有属性时的优势类：\n', advan)

const advanExcludeArray = []
for (let i = 0; i < IFIS_data[0].props.length; i++) {
  const advanExclude = getAdvantages(getIFISExcludePropIndex(IFIS_data, i))
  advanExcludeArray.push(advanExclude)
  displayProgress && console.log(`排除第${i + 1}个属性时的优势类：\n`, advanExclude)
}


displayProgress && console.log('---------------------- 优势信息熵 ----------------------')
const advanInfoEntropy = getAdvanInfoEntropy(advan)
displayProgress && console.log('包含所有属性时的优势信息熵：', advanInfoEntropy)

const advanInfoEntropyExcludeArray = []
for (let i = 0; i < advanExcludeArray.length; i++) {
  const advanInfoEntropyExclude = getAdvanInfoEntropy(advanExcludeArray[i])
  advanInfoEntropyExcludeArray.push(advanInfoEntropyExclude)
  displayProgress && console.log(`排除第${i + 1}个属性时的优势信息熵：`, advanInfoEntropyExclude)
}


displayProgress && console.log('---------------------- 属性重要度 ----------------------')
const importantDegreeArray = []
for (let i = 0; i < advanInfoEntropyExcludeArray.length; i++) {
  const importantDegree = getImportantDegree(advanInfoEntropy, advanInfoEntropyExcludeArray[i])
  importantDegreeArray.push(importantDegree)
  displayProgress && console.log(`第${i + 1}个属性的重要度：`, importantDegree)
}


displayProgress && console.log('---------------------- 属性权重 ----------------------')
const weights = getWeights(importantDegreeArray)
for (let i = 0; i < weights.length; i++) {
  displayProgress && console.log(`第${i + 1}个属性的权重：`, weights[i])
}


displayProgress && console.log('---------------------- 条件概率 ----------------------')
const conditionProbabilities = []
for (let i = 0; i < advan.length; i++) {
  const advanArray = advan[i].moreBetter
  const advanObject = advan[i].object
  const advanMemship = []

  for (let j = 0; j < advanArray.length; j++) {
    const object = IFIS_data.find(item => item.object === advanArray[j])
    advanMemship.push(object.props)
  }

  conditionProbabilities.push({
    object: advanObject,
    probability: getConditionProbability(advanMemship, weights)
  })
}
displayProgress && console.log(conditionProbabilities)


displayProgress && console.log('---------------------- 期望损失 ----------------------')
const expectedLosses = getExpectedLosses(relativeLoss_data, conditionProbabilities)
displayProgress && console.log(expectedLosses)


displayProgress && console.log('---------------------- 得分函数 ----------------------')
const scores = getScores(expectedLosses)
displayProgress && console.log(scores)


displayProgress && console.log('---------------------- 决策结果 ----------------------')
const decision = getDecision(scores)
console.log(decision)

try {
  window.data = {
    advan,
    advanExcludeArray,
    advanInfoEntropy,
    advanInfoEntropyExcludeArray,
    importantDegreeArray,
    weights,
    conditionProbabilities,
    expectedLosses,
    scores,
    decision,
    IFIS_data,
    relativeLoss_data,
    S,
    D
  }
} catch (err) {

}
