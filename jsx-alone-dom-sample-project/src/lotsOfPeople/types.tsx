export interface Person {
  name: string;
  age: number;
  friends: Person[];
}
export interface Model {
  people: Person[]
}