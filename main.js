const { IFIS_data, relativeLoss_data, D } = require('./test/data')
const { getIFISExcludePropIndex } = require('./utils')
const getAdvantages = require('./src/advantages')
const getAdvanInfoEntropy = require('./src/advanInforEntropy')
const getImportantDegree = require('./src/importantDegree')
const getWeights = require('./src/weights')
const getConditionProbability = require('./src/conditionProbability')
const getExpectedLosses = require('./src/expectedLoss')
const getScores = require('./src/score')
const getDecision = require('./src/decision')

window.makeDecision = function (S) {
  // ---------------------- 优势类 ----------------------
  const advan = getAdvantages(IFIS_data, S)

  const advanExcludeArray = []
  for (let i = 0; i < IFIS_data[0].props.length; i++) {
    const advanExclude = getAdvantages(getIFISExcludePropIndex(IFIS_data, i), S)
    advanExcludeArray.push(advanExclude)
  }

  // ---------------------- 优势信息熵 ----------------------
  const advanInfoEntropy = getAdvanInfoEntropy(advan)

  const advanInfoEntropyExcludeArray = []
  for (let i = 0; i < advanExcludeArray.length; i++) {
    const advanInfoEntropyExclude = getAdvanInfoEntropy(advanExcludeArray[i])
    advanInfoEntropyExcludeArray.push(advanInfoEntropyExclude)
  }

  // ---------------------- 属性重要度 ----------------------
  const importantDegreeArray = []
  for (let i = 0; i < advanInfoEntropyExcludeArray.length; i++) {
    const importantDegree = getImportantDegree(advanInfoEntropy, advanInfoEntropyExcludeArray[i])
    importantDegreeArray.push(importantDegree)
  }

  // ---------------------- 属性权重 ----------------------
  const weights = getWeights(importantDegreeArray)

  // ---------------------- 条件概率 ----------------------
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

  // ---------------------- 期望损失 ----------------------
  const expectedLosses = getExpectedLosses(relativeLoss_data, conditionProbabilities)

  // ---------------------- 得分函数 ----------------------
  const scores = getScores(expectedLosses)

  // ---------------------- 决策结果 ----------------------
  const decision = getDecision(scores)

  // ---------------------- 返回数据 ----------------------
  return {
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
    D
  }
}
