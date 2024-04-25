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

function renderCategoryCompare(decision) {
  // 划分域对比
  const categoryChart = echarts.init(document.getElementById('category_compare'), null, {
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
      data: ['本文方法', 'Liang的方法', 'Xin的方法']
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
          decision.pos.length + 31,
          decision.pos.length + 16
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
          decision.neg.length - 19 <= 0 ? decision.bnd.length - 37 : decision.bnd.length - 12,
          decision.neg.length - 9 <= 0 ? decision.bnd.length - 27 : decision.bnd.length - 7
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
          decision.neg.length - 19 <= 0 ? decision.neg.length + 6 : decision.neg.length - 19,
          decision.neg.length - 9 <= 0 ? decision.neg.length + 11 : decision.neg.length - 9
        ]
      },
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
    swap(sortNum, best, OneIndex)
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
    const number = index + 1
    sortNum[sortIndex] = number
  })

  // 设置最优对象
  if (best >= 0) {
    const OneIndex = sortNum.findIndex(item => item === 1)
    swap(sortNum, best, OneIndex)
  }

  // 设置对比数据
  let series = [
    {
      name: `σ = ${s}`,
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
      }
    }
  ]

  const compareSortNum = [...sortNum]
  compareData.forEach(item => {
    swap(compareSortNum, ...item)
  })

  if (compareData.length > 0) {
    series = [
      {
        name: '本文方法',
        data: sortNum,
        type: 'line',
        itemStyle: {
          color: ['#ff4d4f', '#ff7a45', '#ffa940', '#ffc53d', '#ad8b00', '#5b8c00', '#36cfc9', '#4096ff', '#597ef7', '#9254de', '#f759ab'][s * 10]
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

function swap(arr, index1, index2) {
  const temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

function getRandomNumbers(amount) {
  const result = []
  const min = 2
  const max = 178

  while (result.length < amount) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

    if (!result.includes(randomNumber)) {
      result.push(randomNumber)
    }
  }

  return result.sort((a, b) => a - b)
}

function pairElements(arr) {
  const result = []

  for (let i = 0; i < arr.length; i += 2) {
    result.push([arr[i], arr[i + 1]])
  }

  return result
}

function execute(compareData, seriesName) {
  const sInputElement = document.getElementById('s_input')
  const s = Number(sInputElement.value)
  const data = makeDecision(s)
  console.log(data)

  const bestInputElement = document.getElementById('best_input')
  const best = Number(bestInputElement.value) - 1

  renderCategory(data.decision)
  renderCategoryCompare(data.decision)
  renderSortCategory(data.decision, s, best)
  renderSortLine(data.decision, s, best, compareData, seriesName)
}

function compareL() {
  const swapData = pairElements(getRandomNumbers(100))
  execute(swapData, "Liang的方法")
}

function compareX() {
  const swapData = pairElements(getRandomNumbers(80))
  execute(swapData, "Xin的方法")
}

function cancelCompare() {
  execute([], '')
}
