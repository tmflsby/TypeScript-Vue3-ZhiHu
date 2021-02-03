interface Person {
    readonly id: number  // 只读属性
    name: string
    age?: number         // 可选属性
}

let curry: Person = {
    id: 1,
    name: 'Curry',
    age: 20
}
