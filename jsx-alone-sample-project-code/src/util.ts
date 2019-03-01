import { randomIntBetween, randomItem } from 'jsx-alone-core'

export const names = {
    firstName: () => randomItem(firstNames), lastName:  () => randomItem(firstNames)
  }
export const numbers = {
  integer: (min: number, max: number) => randomIntBetween(min, max)
}
const firstNames =  [
  'William',
  'Jack',
  'Oliver',
  'Joshua',
  'Thomas',
  'Lachlan',
  'Cooper',
  'Noah',
  'Ethan',
  'Lucas',
  'James',
  'Samuel',
  'Jacob',
  'Liam',
  'Alexander',
  'Benjamin',
  'Max',
  'Isaac',
  'Daniel',
  'Riley',
  'Ryan',
  'Xavier',
  'Harry',
  'Jayden',
  'Nicholas',
  'Harrison',
  'Levi',
  'Luke',
  'Adam',
  'Henry',
  'Aiden',
  'Dylan',
  'Oscar',
  'Michael',
  'Jackson',
  'Logan' ]
