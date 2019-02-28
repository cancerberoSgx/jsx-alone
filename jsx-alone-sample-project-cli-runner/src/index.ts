
export interface Config {
  sample: Samples
  n: number[]
  m: number[]
  runs: number
}
export interface Sample {
  name: Samples, impl: 'string'|'dom'
  run(config:SampleConfig):Result
}
export interface Result {
  renderTime: number, createElementTime: number, config: SampleConfig, series: {n:number, m: number, r: number}
}


export type Samples = 'lotsOfPeopleDom'|'lotsOfPeopleString'

export interface SampleConfig {
  n: number , m: number
}