// const Decimal = require('decimal.js')
// plus sub times div

const { IFIS_data } = require('./test/test_data')
const { getIFISExcludePropIndex } = require('./utils')
const getAdvantages = require('./src/advantages')
const getAdvanInfoEntropy = require('./src/advanInforEntropy')
const getImportantDegree = require('./src/importantDegree')
const getWeights = require('./src/weights')
const getConditionProbabilities = require('./src/conditionProbability')

function main() {
  console.log('-------------------------- 优势类 --------------------------')
  const advan = getAdvantages(IFIS_data)
  console.log('包含所有属性时的优势类：\n', advan)

  const advanExcludeArray = []
  for (let i = 0; i < IFIS_data[0].props.length; i++) {
    const advanExclude = getAdvantages(getIFISExcludePropIndex(IFIS_data, i))
    advanExcludeArray.push(advanExclude)
    console.log(`排除第${i + 1}个属性时的优势类：\n`, advanExclude)
  }


  console.log('-------------------------- 优势信息熵 --------------------------')
  const advanInfoEntropy = getAdvanInfoEntropy(advan)
  console.log('包含所有属性时的优势信息熵：', advanInfoEntropy)

  const advanInfoEntropyExcludeArray = []
  for (let i = 0; i < advanExcludeArray.length; i++) {
    const advanInfoEntropyExclude = getAdvanInfoEntropy(advanExcludeArray[i])
    advanInfoEntropyExcludeArray.push(advanInfoEntropyExclude)
    console.log(`排除第${i + 1}个属性时的优势信息熵：`, advanInfoEntropyExclude)
  }


  console.log('-------------------------- 属性重要度 --------------------------')
  const importantDegreeArray = []
  for (let i = 0; i < advanInfoEntropyExcludeArray.length; i++) {
    const importantDegree = getImportantDegree(advanInfoEntropy, advanInfoEntropyExcludeArray[i])
    importantDegreeArray.push(importantDegree)
    console.log(`第${i + 1}个属性的重要度：`, importantDegree)
  }


  console.log('-------------------------- 属性权重 --------------------------')
  const weights = getWeights(importantDegreeArray)
  for (let i = 0; i < weights.length; i++) {
    console.log(`第${i + 1}个属性的权重：`, weights[i])
  }

  console.log('-------------------------- 条件概率 --------------------------')
  const advanAmounts = advan.map(item => item.moreBetter.length)
  const conditionProbabilities = getConditionProbabilities(IFIS_data, advanAmounts, weights)
  console.log(conditionProbabilities)
}

main()
