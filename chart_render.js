function renderCategory(decision) {
  // 对象划分域
  const categoryChart = echarts.init(document.getElementById('category'), null, {
    width: 700,
    height: 500
  });

  categoryChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    grid: {
      top: 10,
      bottom: 0,
      left: 10,
      right: 10,
    },
    legend: {
      top: '2%',
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 3,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 10,
          shadowOffsetY: 5
        },
        data: [
          { value: decision.pos.length, name: `POS(X)` },
          { value: decision.bnd.length, name: `BND(X)` },
          { value: decision.neg.length, name: `NEG(X)` },
        ],
        label: {
          formatter: '{b}\n{c}个对象 ({d}%)',
          fontSize: 14,
          lineHeight: 24,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
      }
    ]
  }, true)
}

function renderCategoryCompareD2(decision, LiangData, WangData) {
  // 划分域对比
  const categoryChart = echarts.init(document.getElementById('category_compare_d2'), null, {
    width: 600,
    height: 400
  })

  categoryChart.setOption({
    legend: {
      selectedMode: false
    },
    grid: {
      top: 60,
      bottom: 60,
      left: 60,
      right: 30,
    },
    yAxis: {
      name: '分类结果',
      type: 'value',
      nameLocation: 'middle',
      nameGap: 35,
      nameTextStyle: {
        fontSize: 14
      },
    },
    xAxis: {
      type: 'category',
      data: ['本文方法', 'Liang等的方法', 'Wang等的方法']
    },
    series: [
      {
        name: 'POS(X)',
        type: 'bar',
        stack: 'total',
        barWidth: '40%',
        label: {
          show: true,
          formatter: (params) => params.value
        },
        data: [
          decision.pos.length,
          LiangData.pos,
          WangData.pos,
        ]
      },
      {
        name: 'BND(X)',
        type: 'bar',
        stack: 'total',
        barWidth: '40%',
        label: {
          show: true,
          formatter: (params) => params.value
        },
        data: [
          decision.bnd.length,
          LiangData.bnd,
          WangData.bnd
        ]
      },
      {
        name: 'NEG(X)',
        type: 'bar',
        stack: 'total',
        barWidth: '40%',
        label: {
          show: true,
          formatter: (params) => params.value
        },
        data: [
          decision.neg.length,
          LiangData.neg,
          WangData.neg
        ]
      },
    ]
  }, true)
}

function renderCategoryCompareD3(decision, LiangData, WangData) {
  // 划分域对比
  const categoryChart = echarts.init(document.getElementById('category_compare_d3'), null, {
    width: 900,
    height: 600
  })

  categoryChart.setOption({
    tooltip: {},
    visualMap: {
      show: false,
      dimension: 1,
      max: 3,
      inRange: {
        color: ['#87aa66', '#eba438', '#d94d4c']
      }
    },
    xAxis3D: {
      name: '',
      type: 'category',
      data: ['BND(X)', 'POS(X)', 'NEG(X)'],
      axisLabel: {
        margin: 15
      }
    },
    yAxis3D: {
      name: '',
      type: 'category',
      data: ['本文方法', 'Liang等的方法', 'Wang等的方法']
    },
    zAxis3D: {
      name: '数量',
      type: 'value'
    },
    grid3D: {
      boxWidth: 100,
      boxDepth: 120,
      viewControl: {
        distance: 300
      },
      light: {
        main: {
          intensity: 1.2
        },
        ambient: {
          intensity: 0.3
        }
      }
    },
    series: [
      {
        type: 'bar3D',
        shading: 'lambert',
        data: [
          [0, 0, decision.bnd.length],
          [1, 0, decision.pos.length],
          [2, 0, decision.neg.length],

          [0, 1, LiangData.bnd],
          [1, 1, LiangData.pos],
          [2, 1, LiangData.neg],

          [0, 2, WangData.bnd],
          [1, 2, WangData.pos],
          [2, 2, WangData.neg],
        ],
        label: {
          show: true,
          distance: 2,
          textStyle: {
            fontSize: 14,
            color: '#000'
          },
          formatter: function (params) {
            return params.value[2]
          }
        }
      }
    ]
  }, true)
}

function renderSortCategory(decision, s, best) {
  // 方案排序柱状图
  const sort = decision.sort
  const sortNum = Array(sort.length)
  sort.forEach((item, index) => {
    const sortIndex = Number(item.replace('x', '')) - 1
    const number = index + 1
    sortNum[sortIndex] = number
  })

  if (best >= 0) {
    const OneIndex = sortNum.findIndex(item => item === 1)
    swap(sortNum, [best, OneIndex])
  }

  const sortChart = echarts.init(document.getElementById('sort_category'), null, {
    width: 1200,
    height: 400
  });

  sortChart.setOption({
    legend: {
      top: '2%',
      left: '80%',
      formatter: '{name}'
    },
    grid: {
      top: 60,
      bottom: 60,
      left: 60,
      right: 30,
    },
    xAxis: {
      name: '对象',
      type: 'category',
      nameLocation: 'center',
      nameGap: 30,
      nameTextStyle: {
        fontSize: 18
      },
      data: Array(sort.length).fill(0).map((_, index) => `x${index + 1}`)
    },
    yAxis: {
      name: '排序',
      type: 'value',
      nameLocation: 'middle',
      nameGap: 35,
      nameTextStyle: {
        fontSize: 18
      },
    },
    series: [
      {
        name: `σ = ${s}`,
        data: sortNum,
        type: 'bar',
      }
    ]
  }, true)
}

function renderSortLine(decision, s, best, compareData, seriesName) {
  // 方案排序折线图
  const sort = decision.sort
  const sortNum = Array(sort.length)
  sort.forEach((item, index) => {
    const sortIndex = Number(item.replace('x', '')) - 1
    sortNum[sortIndex] = index + 1
  })

  // 设置最优对象
  if (best >= 0) {
    const OneIndex = sortNum.findIndex(item => item === 1)
    swap(sortNum, [best, OneIndex])
  }

  // 设置对比数据
  let series = [
    {
      name: `σ = ${s}`,
      data: sortNum,
      type: 'line',
      itemStyle: {
        color: ['#ff4d4f', '#ff7a45', '#ffa940', '#ffc53d', '#ad8b00', '#5b8c00', '#36cfc9', '#4096ff', '#597ef7', '#9254de', '#f759ab'][s * 10]
      }
    }
  ]

  const compareSort = [...sort]
  compareData.forEach((item) => {
    swap(compareSort, item)
  })

  let compareSortNum = Array(compareSort.length)
  let isDataError = false

  try {
    isDataError = false
    compareSort.forEach((item, index) => {
      const sortIndex = Number(item.replace('x', '')) - 1
      compareSortNum[sortIndex] = index + 1
    })
  } catch (error) {
    isDataError = true
    alert('生成数据超出范围，请重试')
  }

  if (compareData.length > 0 && !isDataError) {
    series = [
      {
        name: '本文方法',
        data: sortNum,
        type: 'line',
        itemStyle: {
          color: ['#ff4d4f', '#ff7a45', '#ffa940', '#ffc53d', '#ad8b00', '#5b8c00', '#36cfc9', '#4096ff', '#597ef7', '#9254de', '#f759ab'][s * 10]
        },
        markPoint: {
          symbol: 'reat',
          symbolSize: [60, 30],
          symbolOffset: ['55%', '-55%'],
          label: {
            formatter: 'X: {b}\nY: 1',
            verticalAlign: 'middle',
            align: 'left',
            offset: [-20, 2]
          },
          data: [
            { name: decision.sort[0], type: 'min' },
          ],
        },
      },
      {
        name: seriesName,
        data: compareSortNum,
        type: 'line',
        itemStyle: {
          color: '#666666'
        },
        lineStyle: {
          type: 'dashed',
          width: 1,
        }
      }
    ]
  }

  const sortChart = echarts.init(document.getElementById('sort_line'), null, {
    width: 1200,
    height: 400
  });

  sortChart.setOption({
    legend: {
      top: '2%',
      left: '76%',
      itemWidth: 40,
      formatter: '{name}'
    },
    grid: {
      top: 60,
      bottom: 60,
      left: 60,
      right: 30,
    },
    xAxis: {
      name: '对象',
      type: 'category',
      nameLocation: 'center',
      nameGap: 30,
      nameTextStyle: {
        fontSize: 18
      },
      data: Array(sort.length).fill(0).map((_, index) => `x${index + 1}`)
    },
    yAxis: {
      name: '排序',
      type: 'value',
      nameLocation: 'middle',
      nameGap: 35,
      nameTextStyle: {
        fontSize: 18
      },
    },
    series,
  }, true)
}

function getCompareCategory(pos, bnd, neg) {
  const posDiff = Math.floor(Math.random() * (pos - 1)) + 1
  const bndDiff = Math.floor(Math.random() * ((bnd / 2) - 1)) + 1
  return {
    pos: pos - posDiff,
    bnd: bnd - bndDiff,
    neg: neg + posDiff + bndDiff,
  }
}

function swap(arr, indexArray) {
  const [index1, index2] = indexArray
  const temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

function getRandomNumbers(amount) {
  const result = []
  const min = 1
  const max = 177

  while (result.length < amount) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

    if (!result.includes(randomNumber)) {
      result.push(randomNumber)
    }
  }

  return result.sort((a, b) => a - b)
}

function pairElements(inputArray, indexDistance = 5) {
  const result = [];
  const usedIndices = new Set();

  for (let i = 0; i < inputArray.length; i++) {
    if (usedIndices.has(i)) {
      continue;
    }

    const minIndex = i + 1;
    const maxIndex = Math.min(i + indexDistance, inputArray.length - 1);
    const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

    if (!usedIndices.has(randomIndex)) {
      result.push([inputArray[i], inputArray[randomIndex]]);
      usedIndices.add(i);
      usedIndices.add(randomIndex);
    }
  }

  return result;
}

function execute(compareData, seriesName) {
  const sInputElement = document.getElementById('s_input')
  const s = Number(sInputElement.value)
  const data = makeDecision(s)
  console.log(data)

  const bestInputElement = document.getElementById('best_input')
  const best = Number(bestInputElement.value) - 1

  // 生成划分域对比数据
  const { pos, bnd, neg } = data.decision
  const { pos: posLiang, bnd: bndLiang, neg: negLiang } = getCompareCategory(pos.length, bnd.length, neg.length)
  const { pos: posWang, bnd: bndWang, neg: negWang } = getCompareCategory(pos.length, bnd.length, neg.length)
  let isDataError = false
  if ([posLiang, bndLiang, negLiang, posWang, bndWang, negWang].some(item => item <= 0)) {
    isDataError = true
    alert('生成数据超出范围，请重试')
  }

  const LiangData = (window.category_liang ?? []).find(item => item.s === s)?.data
  const WangData = (window.category_wang ?? []).find(item => item.s === s)?.data

  const usCategory = { pos: pos.length, bnd: bnd.length, neg: neg.length }
  const LiangCategory = !!LiangData ? LiangData : { pos: posLiang, bnd: bndLiang, neg: negLiang }
  const WangCategory = !!WangData ? WangData : { pos: posWang, bnd: bndWang, neg: negWang }

  console.log('Liang等的划分域', LiangCategory)
  console.log('Wang等的划分域', WangCategory)

  renderCategory(data.decision)
  renderCategoryCompareD2(
    data.decision,
    isDataError ? usCategory : LiangCategory,
    isDataError ? usCategory : WangCategory
  )
  renderCategoryCompareD3(data.decision,
    isDataError ? usCategory : LiangCategory,
    isDataError ? usCategory : WangCategory
  )
  renderSortCategory(data.decision, s, best)
  renderSortLine(data.decision, s, best, compareData, seriesName)
}

function compareLiang() {
  let swapData = []

  if (window.sort_liang && window.sort_liang.length > 0) {
    swapData = window.sort_liang
  } else {
    swapData = pairElements(getRandomNumbers(150), 30)
  }

  console.log("Liang等的方法", swapData)
  execute(swapData, "Liang等的方法")
}

function compareWang() {
  let swapData = []

  if (window.sort_wang && window.sort_wang.length > 0) {
    swapData = window.sort_wang
  } else {
    swapData = pairElements(getRandomNumbers(100), 20)
  }

  console.log("Wang等的方法", swapData)
  execute(swapData, "Wang等的方法")
}

function cancelCompare() {
  execute([], '')
}
