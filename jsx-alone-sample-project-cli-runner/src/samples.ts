import { lotsOfPeopleAloneTest } from './lotsOfPeople/lotsOfPeopleAlone'
import { Sample, Result } from './types'
export const samples: Sample[] = [
  {
    name: 'lotsOfPeopleDom', impl: 'dom', run(config) {
      lotsOfPeopleAloneTest({ peopleCount: config.n, friendsCount: config.m })
      return {} as any as Result
    }
  },
  {
    name: 'lotsOfPeopleString', impl: 'string', run(config) {
      return {} as any as Result
    }
  }
]
