/**
 * 优势类计算
    input(直觉模糊系统数据): {
      object: string
      props: [number, number][]
    }[]
    output(优势类数据): {
      object: string
      moreBetter: string[]
    }[]
 */

require('dotenv').config()
const s = Number(process.env.s)

// 判断 propB 优于 propA 条件：
// 隶属度: propB >= propA && 非隶属度 propB <= propA
function isBetterProp (propA, propB) {
  const [memshipDegreeA, NonMemshipDegreeA] = propA
  const [memshipDegreeB, NonMemshipDegreeB] = propB

  return memshipDegreeB >= memshipDegreeA && NonMemshipDegreeB <= NonMemshipDegreeA
}

// 返回所有 objectB 优于 objectA 的属性
function getBetterProps (objectA, objectB) {
  const betterPropsIndex = []
  for (let i = 0; i < objectA.props.length; i++) {
    if (isBetterProp(objectA.props[i], objectB.props[i])) {
      betterPropsIndex.push(i)
    }
  }

  return betterPropsIndex
}

// 遍历所有数据，判断 B 相对于 A 优势属性的数量，大于等于 s * 属性数量，则 B 优于 A
function getAdvantages (data) {
  const res = []

  for (let i = 0; i < data.length; i++) {
    const objectA = data[i]
    const moreBetter = []

    for (let j = 0; j < data.length; j++) {
      const objectB = data[j]
      const betterPropsIndex = getBetterProps(objectA, objectB)

      if (betterPropsIndex.length >= objectA.props.length * s) {
        moreBetter.push(objectB.object)
      }
    }

    res.push({ object: objectA.object, moreBetter })
  }

  return res
}

module.exports = getAdvantages
