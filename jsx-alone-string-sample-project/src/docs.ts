import { run } from './run';
import { renderSimple } from './simple/main';
import { writeFileSync } from 'fs';
import {wrapInHtml} from 'misc-utils-of-mine-dom'

const samples = ['simple']

samples.forEach(name=>{
  const s = run(renderSimple, name)
  writeFileSync(`../docs/${name}.html`, wrapInHtml(s))
})