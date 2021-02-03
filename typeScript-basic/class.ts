class Animal {
    readonly name: string
    constructor(name) {
        this.name = name
    }
    run() {
        return `${this.name} is running`
    }
}
const snake = new Animal('lily')
console.log(snake.run())

class Dog extends Animal {
    bark() {
        return `${this.name} is barking`
    }
}

const erHa = new Dog('erHa')
console.log(erHa.run())
console.log(erHa.bark())

class Cat extends Animal {
    constructor(name) {
        super(name)
        console.log(this.name)
    }

    static categories = ['mammal']

    run() {
        return 'Meow, ' + super.run()
    }
}
const DoraAmon = new Cat('DoraAmon')
console.log(DoraAmon.run())
console.log(Cat.categories)

// 类成员的访问修饰符
// public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
// private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
// protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
