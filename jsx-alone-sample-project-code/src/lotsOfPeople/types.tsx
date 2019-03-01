export interface Person {
  name: string
  age: number
  friends: Person[]
}
export interface Model {
  people: Person[]
}
export interface LotsOfPeopleConfig {
  peopleCount: number
  friendsCount: number
}
export interface LotsOfPeopleRendererConfig {
  buildModelT: number, JSXAloneCreateElementT: number
}
