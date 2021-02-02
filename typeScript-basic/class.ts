class Animal {
    readonly name: string;
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
    static categories = ['mammal']
    constructor(name) {
        super(name)
        console.log(this.name)
    }
    run() {
        return 'Meow, ' + super.run()
    }
}
const DoraAmon = new Cat('DoraAmon')
console.log(DoraAmon.run())
console.log(Cat.categories)
