import { array } from '../util'
import { Person, LotsOfPeopleConfig } from './types'
import { names, numbers } from 'misc-utils-of-mine-random-data'

export const MODEL_CONFIG: LotsOfPeopleConfig = { peopleCount: 100, friendsCount: 20 }

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
      name: `${names.firstName()} ${names.firstName()} ${names.lastName()} ${names.lastName()}`,
      age: numbers.integer(0, 100),
      friends: [] as any
    }))
    .map((p, i, a) => {
      p.friends = array(numbers.integer(Math.trunc(config.friendsCount / 2), config.friendsCount)).map(
        i => a[numbers.integer(0, a.length - 1)]
      )
      return p
    })
}
