import { ls } from 'shelljs';
import { readFileSync, writeFileSync } from 'fs';

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

  const r = /Object\.defineProperty\s*\(\s*[a-zA-Z0-9]+\s*\,\s*["']__esModule["']\s*\,\s*\{value\:\!0\}\)\;?/g;
  const result = s.replace(r, '');
  return result;
}
