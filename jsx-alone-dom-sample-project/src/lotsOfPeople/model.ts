import * as faker from 'faker'
import { array, randomInt } from './util'
import { Person } from './types'

export const MODEL_CONFIG = { peopleCount: 100, friendsCount: 20 }

export function buildModel(config: Config) {
  return {
    people: makePeople(config)
  }
}
interface Config {
  peopleCount: number
  friendsCount: number
}
function makePeople(config: Config): Person[] {
  return array(config.peopleCount)
    .map(i => ({
      name: faker.name.findName(),
      age: randomInt(0, 100),
      friends: [] as any
    }))
    .map((p, i, a) => {
      p.friends = array(randomInt(0, config.friendsCount)).map(i => a[randomInt(0, a.length - 1)])
      return p
    })
}
