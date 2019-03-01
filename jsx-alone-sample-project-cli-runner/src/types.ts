export interface Config {
  sample: SampleName
  n: number[]
  m: number[]
  runs: number
  log?: string
  dontPrintRuns?: boolean
}
export interface Sample {
  name: SampleName
  impl: 'string' | 'dom'
  run(config: SampleConfig): Result
}
export interface Result {
  renderTime: number
  createElementTime: number
  config: SampleConfig
  series: {
    n: number
    m: number
    r: number
  }
}
export type SampleName = 'lotsOfPeopleDom' | 'lotsOfPeopleString'
export interface SampleConfig {
  n: number
  m: number
}
export interface MainResult {
  results: Result[]
  totalTime: number
  currentCommit: string
  userConfig: Config
  command: string
  cwd: string
}
