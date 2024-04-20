/**
 * 计算决策结果
    input(得分函数): {
      object: string
      sp: number
      sb: number
      sn: number
    }[]
    output(决策结果): {
      pos: string[]
      bnd: string[]
      neg: string[]
      sort: string[]
    }
 */

function getDecision(scores) {
  const pos = []
  const bnd = []
  const neg = []

  for (let i = 0; i < scores.length; i++) {
    const score = scores[i]
    if (score.sp <= score.sb && score.sp <= score.sn) {
      pos.push(score.object)
    }
    if (score.sb <= score.sp && score.sb <= score.sn) {
      bnd.push(score.object)
    }
    if (score.sn <= score.sp && score.sn <= score.sb) {
      neg.push(score.object)
    }
  }

  const sortedPos = [...pos].sort((a, b) => {
    const scoreA = scores.find(item => item.object === a).sp
    const scoreB = scores.find(item => item.object === b).sp
    return scoreA - scoreB
  })

  const sortedBnd = [...bnd].sort((a, b) => {
    const scoreA = scores.find(item => item.object === a).sb
    const scoreB = scores.find(item => item.object === b).sb
    return scoreA - scoreB
  })

  const sortedNeg = [...neg].sort((a, b) => {
    const scoreA = scores.find(item => item.object === a).sn
    const scoreB = scores.find(item => item.object === b).sn
    return scoreA - scoreB
  })

  return {
    pos,
    bnd,
    neg,
    sort: [...sortedPos, ...sortedBnd, ...sortedNeg]
  }
}

module.exports = getDecision
