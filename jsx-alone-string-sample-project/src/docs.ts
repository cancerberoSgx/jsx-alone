import { renderSimple } from './simple/main';
import { writeFileSync } from 'fs';
import {wrapInHtml} from 'misc-utils-of-mine-generic'
import { renderLotsOfPeople } from './lotsOfPeople/main';

const samples = [
  {name: 'simple', fn: renderSimple}
, {name: 'lotsOfPeople', fn: renderLotsOfPeople}
]

samples.forEach(sample=>{
  try {
    writeFileSync(`../docs/jsx-alone-string-sample-project/${sample.name}.html`, wrapInHtml(sample.fn(false)))
    writeFileSync(`../docs/jsx-alone-string-sample-project/${sample.name}-indented.html`, wrapInHtml(sample.fn(true)))
  } catch (error) {
    console.error(error, error.stack);
    
  }
})