// 字符串枚举
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

const value = 'UP'

if (value === Direction.Up) {
  console.log('go up!')
}

// 数字枚举
// 我们定义一系列的方向，然后这里面的值，枚举成员会被赋值为从 0 开始递增的数字,
enum Direction1 {
  Up,
  Down,
  Left,
  Right,
}
console.log(Direction1.Up)

// 还有一个神奇的点是这个枚举还做了反向映射
console.log(Direction1[0])
