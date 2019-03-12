import * as examplesPacked_ from './examplesPacked.json'

interface File {
  isBinary: false
  fileName: string
  content: string
}

interface Example {
  name: string, code: string
}

const examplesPacked = examplesPacked_ as { [f: string]: File }

const globals: any = {
  exampleLotsOfComponents: {
    PERSON_COUNT: 10, CONTACT_COUNT: 4, ADDRESS_COUNT: 3
  },
  renderInCustomImpls: {
    WORD_COUNT: 20, PEOPLE_COUNT: 10
  }
}

export function getExample(name: string) {
  return examples.find(f => f.name === name)!.code
}

export const examples: Example[] = Object.values(examplesPacked).filter(f => f.fileName).map(f => {
  const name = f.fileName.substring('src/examples/toPack/'.length, f.fileName.length - 4)
  const g = globals[name]
  return {
    name,
    code: fixCode(f.content, g || {})
  }
}).sort((a, b) => a.name.localeCompare(b.name))

function fixCode(s: string, globals: any = {}) {
  const lines = s.split('\n')
  let i = lines.findIndex(l => l.includes('function'))
  const code = `
// Although you can import types from './index', only the following implementations are available in this example:

import {JSXAlone, JSXAloneDom, JSXAloneString, JSXAloneJson, ElementClassDom, ElementClassJson, ElementClassJson as ElementClass, ElementClassString } from './index'

function test() {
  ${Object.keys(globals).map(g => `  const ${g} = ${globals[g]};`).join('\n').trim()}
  ${lines.slice(i + 1, lines.length).join('\n').trim()}
`.trim()
  return code
}
