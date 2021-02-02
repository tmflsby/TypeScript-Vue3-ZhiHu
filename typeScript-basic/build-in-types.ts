//global objects
const a: Array<number> = [1,2,3]
const date = new Date()
date.getTime()
const reg = /abc/
reg.test('abc')

//build-in object
Math.pow(2, 2)

//DOM and BOM
let body = document.body
let allLis = document.querySelectorAll('li')
allLis.forEach(i => {
  console.log(i)
})

document.addEventListener('click', (e) => {
  e.preventDefault()
})

//Utility Types
interface IPerson {
  name: string
  age: number
}
let curry: IPerson = { name: 'curry', age: 20 }
type IPartial = Partial<IPerson>
let curry2: IPartial = { name: 'curry' }
type IOmit = Omit<IPerson, 'name'>
let curry3: IOmit = { age: 20 }

