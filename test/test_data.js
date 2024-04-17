// 直觉模糊系统数据
const IFIS_data = [
  {
    object: 'x1',
    props: [
      [0.6, 0.2],
      [0.7, 0.2],
      [0.5, 0.4],
      [0.5, 0.2],
      [0.7, 0.2],
    ]
  },
  {
    object: 'x2',
    props: [
      [0.8, 0.1],
      [0.5, 0.3],
      [0.7, 0.3],
      [0.6, 0.4],
      [0.7, 0.3],
    ]
  },
  {
    object: 'x3',
    props: [
      [0.7, 0.2],
      [0.5, 0.2],
      [0.5, 0.5],
      [0.6, 0.3],
      [0.8, 0.2],
    ]
  },
  {
    object: 'x4',
    props: [
      [0.5, 0.4],
      [0.6, 0.1],
      [0.6, 0.2],
      [0.7, 0.2],
      [0.6, 0.1],
    ]
  },
  {
    object: 'x5',
    props: [
      [0.8, 0.2],
      [0.6, 0.2],
      [0.7, 0.3],
      [0.7, 0.2],
      [0.7, 0.2],
    ]
  },
  {
    object: 'x6',
    props: [
      [0.6, 0.4],
      [0.5, 0.2],
      [0.6, 0.4],
      [0.5, 0.3],
      [0.6, 0.3],
    ]
  }
]

// 优势类数据
const advantages_data = [
  { object: 'x1', moreBetter: ['x1', 'x5'] },
  { object: 'x2', moreBetter: ['x2', 'x3', 'x5'] },
  { object: 'x3', moreBetter: ['x3', 'x4', 'x5'] },
  { object: 'x4', moreBetter: ['x4'] },
  { object: 'x5', moreBetter: ['x5'] },
  { object: 'x6', moreBetter: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6'] }
]

module.exports = {
  IFIS_data,
  advantages_data,
}
