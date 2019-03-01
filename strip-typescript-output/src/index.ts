import { ls } from 'shelljs'
import { readFileSync, writeFileSync } from 'fs'

export function main(config: Config) {
  ls(config.input).forEach(f => {
    const s = readFileSync(f).toString()
    const result = replace(s)
    writeFileSync(f, result)
  })
}
export interface Config {
  /** a pattern like "../docs/** /*.js" */
  input: string

  // TODO: replaceWith,output,dontRemoveUseStrict,dontRemoveEsModuleInterop
}

export function replace(s: string) {

  // should strip these:
  // `Object.defineProperty(exports, "__esModule", { value: true });
  // exports.__esModule = true;`
  // Object.defineProperty(exports,"__esModule",{value:!0});
  // Object.defineProperty(e,"__esModule",{value:!0})

const uncompressed = /Object\.defineProperty\s*\(\s*exports\s*\,\s*["']__esModule["']\s*\,\s*\{\s*value\s*\:\s*[^\}]+\}\s*\);/g
s = s.replace(uncompressed, ';')
const semiComma = /;Object\.defineProperty\s*\(\s*[a-zA-Z0-9]+\s*\,\s*["']__esModule["']\s*\,\s*\{\s*value\s*\:\s*[^\}]+\}\s*\)\,/g
s = s.replace(semiComma, ';1,')

const nothingSemi = /Object\.defineProperty\s*\(\s*[a-zA-Z0-9]+\s*\,\s*["']__esModule["']\s*\,\s*\{\s*value\s*\:\s*[^\}]+\}\s*\)\;/g
s = s.replace(nothingSemi, ';')
const nothingComma = /Object\.defineProperty\s*\(\s*[a-zA-Z0-9]+\s*\,\s*["']__esModule["']\s*\,\s*\{\s*value\s*\:\s*[^\}]+\}\s*\)\,/g
s = s.replace(nothingComma, '1,')
return s
}
