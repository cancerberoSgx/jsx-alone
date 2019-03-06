import { samples } from './samples'
import { Config, Result, MainResult } from "./types"
import { args } from "./cli"
import { array } from '../../jsx-alone-core/dist/src'
import { exec, config, mkdir, pwd } from 'shelljs'
import { writeFileSync } from 'fs'

config.silent = true

let silent = false
export function main(config: Config): MainResult {
  config.n = config.n ? (config.n + "" as any as string).split(',').map(s => parseInt(s)) : [100]
  config.m = config.m ? (config.m + '' as any as string).split(',').map(s => parseInt(s)) : [100]
  config.runs = config.runs || 5

  if (!args.sample) {
    console.error(`--sample is required. Usage:
    npx jsx-alone-sample-project-cli-runner --sample  lotsOfPeopleDom -n 1000 -m 10`)
    return process.exit(1)
  }
  const sample = samples.find(s => s.name === args.sample)
  if (!sample) {
    console.error(`sample ${args.sample} not found, these are available: ${samples.map(s => s.name).join(', ')}`)
    return process.exit(1)
  }

  silent = !config.log

  if (sample.impl === 'dom') {
    installJSDOM()
  }
  let totalTime = 0
  const results: (Result & { t: number })[] = []
  array(config.runs).forEach(r => {
    config.n.forEach(n => {
      config.m.map(n => n + 1).forEach(m => {
        const t0 = Date.now()
        const result = sample.run({ ...config, n, m })
        const t = Date.now() - t0
        results.push({ ...result, t, series: { n, m, r } })
        totalTime += t
        debug(`ended ${r} run n=${n} m=${m}`)
      })
    })
  })
  debug(`Sample ${sample.name}, ${config.runs} runs, ended in ${totalTime}ms `)
  const result: MainResult = {
    totalTime,
    currentCommit: getCurrentCommit(),
    userConfig: config,
    command: process.argv.slice(process.argv.findIndex(c => c.startsWith('--')), process.argv.length).join(' '),
    cwd: pwd(),
    results,
  }
  const resultString = JSON.stringify(config.dontPrintRuns ? { ...result, results: undefined } : result, null, 2)
  if (config.log) {
    const logFile = `${config.log || ''}-${result.currentCommit}-${sample.name}.json`
    debug(JSON.stringify(result))
    debug('TOTAL TIME: ' + result.totalTime)
    writeFileSync(logFile, resultString)
    debug(`Saved log ${logFile}`)
  }
  else {
    console.log(resultString)
  }

  return result
}

function debug(m: string) {
  !silent && console.log(m)
}

function getCurrentCommit() {
  return exec('git rev-parse --short HEAD').stdout.toString().trim()
}

function installJSDOM() {
  var JSDOM = require("jsdom").JSDOM
  const dom = new JSDOM('<html><head><head><body></body></html>', {
    url: 'http://foo.com',
    runScripts: "dangerously",
    resources: "usable"
  })
  const g = global as any
  g.document = dom.window.document
  g.window = dom.window
  g.navigator = dom.window.navigator
}
