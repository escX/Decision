function renderCategory() {
  // 对象划分域
  const decision = window.data.decision;
  const categoryChart = echarts.init(document.getElementById('category'), null, {
    width: 600,
    height: 450
  });
  categoryChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        data: [
          { value: decision.pos.length, name: `POS (${decision.pos.length})` },
          { value: decision.neg.length, name: `NEG (${decision.neg.length})` },
          { value: decision.bnd.length, name: `BND (${decision.bnd.length})` },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
      }
    ]
  })
}

function renderSort() {
  // 方案排序
  const sort = window.data.decision.sort;
  const sortNum = Array(sort.length)
  sort.forEach((item, index) => {
    const objIndex = Number(item.replace('x', '')) - 1
    const number = index + 1
    sortNum[objIndex] = number
  })

  const sortChart = echarts.init(document.getElementById('sort'), null, {
    width: 1200,
    height: 600
  });

  sortChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: Array(sort.length).fill(0).map((_, index) => `x${index + 1}`),
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Sort',
        type: 'bar',
        barWidth: '60%',
        data: sortNum
      }
    ]
  })
}

function render() {
  renderCategory()
  renderSort()
}
