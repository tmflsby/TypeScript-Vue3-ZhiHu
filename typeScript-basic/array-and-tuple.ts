// 最简单的方法是使用[类型 + 方括号]来表示数组
let arrOfNumbers: number[] = [1, 2, 3]
// 数组的项中不允许出现其他的类型
// 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
arrOfNumbers.push(4)

function test () {
    console.log(arguments)
}

// 元组的表示和数组非常的相似，只不过他将类型写在了里面
// 这就对每一项起到了限定的作用
let user: [string, number] = ['Curry', 20]
user.push('Messi')
user.push(18)
//当我们少写一项，多写一项都会报错
