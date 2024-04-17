// const Decimal = require('decimal.js')
// add sub mul div

const {IFIS_data} = require('./test/test_data')
const {getIFISExcludePropIndex} = require('./utils')
const getAdvantages = require('./src/advantages')
const getAdvanInfoEntropy = require('./src/advanInforEntropy')
const getImportantDegree = require('./src/importantDegree')

function main() {
  // -------------------------- 优势类 --------------------------
  const advan = getAdvantages(IFIS_data)
  console.log('包含所有属性时的优势类：\n', advan)

  const advanExclude1 = getAdvantages(getIFISExcludePropIndex(IFIS_data, 0))
  console.log('排除第一个属性时的优势类：\n', advanExclude1)

  const advanExclude2 = getAdvantages(getIFISExcludePropIndex(IFIS_data, 1))
  console.log('排除第二个属性时的优势类：\n', advanExclude2)

  const advanExclude3 = getAdvantages(getIFISExcludePropIndex(IFIS_data, 2))
  console.log('排除第三个属性时的优势类：\n', advanExclude3)

  const advanExclude4 = getAdvantages(getIFISExcludePropIndex(IFIS_data, 3))
  console.log('排除第四个属性时的优势类：\n', advanExclude4)

  const advanExclude5 = getAdvantages(getIFISExcludePropIndex(IFIS_data, 4))
  console.log('排除第五个属性时的优势类：\n', advanExclude5)

  // -------------------------- 优势信息熵 --------------------------
  const advanInfoEntropy = getAdvanInfoEntropy(advan)
  console.log('包含所有属性时的优势信息熵：', advanInfoEntropy)

  const advanInfoEntropyExclude1 = getAdvanInfoEntropy(advanExclude1)
  console.log('排除第一个属性时的优势信息熵：', advanInfoEntropyExclude1)

  const advanInfoEntropyExclude2 = getAdvanInfoEntropy(advanExclude2)
  console.log('排除第二个属性时的优势信息熵：', advanInfoEntropyExclude2)

  const advanInfoEntropyExclude3 = getAdvanInfoEntropy(advanExclude3)
  console.log('排除第三个属性时的优势信息熵：', advanInfoEntropyExclude3)

  const advanInfoEntropyExclude4 = getAdvanInfoEntropy(advanExclude4)
  console.log('排除第四个属性时的优势信息熵：', advanInfoEntropyExclude4)

  const advanInfoEntropyExclude5 = getAdvanInfoEntropy(advanExclude5)
  console.log('排除第五个属性时的优势信息熵：', advanInfoEntropyExclude5)

  // -------------------------- 属性重要度 --------------------------
  const importDegree1 = getImportantDegree(advanInfoEntropy, advanInfoEntropyExclude1)
  console.log('第一个属性的重要度：', importDegree1)

  const importDegree2 = getImportantDegree(advanInfoEntropy, advanInfoEntropyExclude2)
  console.log('第二个属性的重要度：', importDegree2)

  const importDegree3 = getImportantDegree(advanInfoEntropy, advanInfoEntropyExclude3)
  console.log('第三个属性的重要度：', importDegree3)

  const importDegree4 = getImportantDegree(advanInfoEntropy, advanInfoEntropyExclude4)
  console.log('第四个属性的重要度：', importDegree4)

  const importDegree5 = getImportantDegree(advanInfoEntropy, advanInfoEntropyExclude5)
  console.log('第五个属性的重要度：', importDegree5)
}

main()
