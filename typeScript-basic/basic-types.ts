// Boolean类型
let isDone: boolean = false

// Number类型，注意 es6 还支持2进制和8进制
let age: number = 10
let binaryNumber: number = 0b1111

// String类型，注意 es6 新增的模板字符串也是没有问题的
let firstName: string = 'Curry'
let message: string = `Hell0! ${firstName}, age is ${age}`

// Undefined 和 Null
let u: undefined = undefined
let n: null = null

// 注意 undefined 和 null 是所有类型的子类型
// 也就是说 undefined 类型的变量，可以赋值给 number 类型的变量
let num: number = undefined

// any类型
let notSure: any = 4
notSure = 'maybe a string'
notSure = true
// 在任意值上访问任何属性都是允许的
notSure.myName
// 也允许调用任何方法
notSure.getName()
