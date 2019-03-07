import { ls } from 'shelljs'
import { readFileSync, writeFileSync, statSync } from 'fs'

export function main(config: Config) {
  const files = ls(config.input)

  !config.silent && console.log('stripping from ' + files.length + ' files using config: ', config);

  const stats: { reduction: number, finalSize: number, originalSize: number, f: string }[] = []

  files.forEach(f => {
    const originalSize = getFileSizeInBytes(f, "kilo-bytes")
    const s = readFileSync(f).toString()
    const result = replace(s, config);
    if (s.length !== result.length) {

    }
    writeFileSync(f, result)

    stats.push({
      reduction: s.length - result.length,//,
      f,
      originalSize,
      finalSize: getFileSizeInBytes(f, "kilo-bytes")
    })

  })

  !config.silent && console.log(`${stats
    .filter(s => bytesToKiloBytes(s.reduction))
    .sort((a, b) => a.reduction > b.reduction ? -1 : 1)
    .map(s => `${s.reduction}Kb reduction for ${s.f}`).join('\n')}`
  )

  let totalReduction = 0
  stats.forEach(s=>totalReduction+=s.reduction)
  !config.silent && console.log(`Total Reduction size: ${bytesToKiloBytes(totalReduction)}Kb`);
  

}
export interface Config extends ReplaceConfig {
  /** a pattern like "../docs/** /*.js" */
  input: string

}
interface ReplaceConfig {
  useStrict?: boolean
  // TODO: replaceWith,output,dontRemoveUseStrict,dontRemoveEsModuleInterop
  silent?: boolean
}
function getFileSizeInBytes(filename: string, unit: 'bytes' | 'mega-bytes' | 'kilo-bytes' = 'bytes') {
  const stats = statSync(filename)
  const fileSizeInBytes = stats.size
  return unit === 'bytes' ? fileSizeInBytes : unit === 'mega-bytes' ? fileSizeInBytes / 1000000.0 : unit === 'kilo-bytes' ? bytesToKiloBytes(fileSizeInBytes) : fileSizeInBytes
}
function bytesToKiloBytes(fileSizeInBytes: number) {
  return fileSizeInBytes / 1000.0
}
export function replace(s: string, config: ReplaceConfig = {}) {

  s = s.replace(/;\s*Object\.defineProperty\s*\(\s*[a-zA-Z0-9]+\s*\,\s*["']__esModule["']\s*\,\s*\{\s*value\s*\:\s*[^\}]+\}\s*\)\,/gm, ()=>';1,')
  
  s = s.replace(/,\s*Object\.defineProperty\s*\(\s*exports\s*\,\s*["']__esModule["']\s*\,\s*\{\s*value\s*\:\s*[^\}]+\}\s*\);/gm, ()=>',1;')

  s = s.replace(/;\s*Object\.defineProperty\s*\(\s*[a-zA-Z0-9]+\s*\,\s*["']__esModule["']\s*\,\s*\{\s*value\s*\:\s*[^\}]+\}\s*\)\;/gm, ()=>';')

  s = s.replace(/,\s*Object\.defineProperty\s*\(\s*[a-zA-Z0-9]+\s*\,\s*["']__esModule["']\s*\,\s*\{\s*value\s*\:\s*[^\}]+\}\s*\)\,/gm, ()=>',1,')
  // ;Object.defineProperty(exports,"__esModule",{value:!0}),
  //TODO: the rest


  if (config.useStrict) {

    // s = s.replace(uncompressed, ';')

    // s = s.replace(/\{\s*['"]use strict['"]\s*;/gm, '{')

    s = s.replace(/\{\s*['"]use strict['"]\s*;/gm, (match) => '{')



  }



  return s

}

    // const nothingSemi = /['"]use strict['"];/gm
    // s = s.replace(nothingSemi, ';')

    // const nothingComma = /['"]use strict['"],/gm

    //TODO: the rest
    // s = s.replace(nothingComma, '1,')
  // should strip these:
  // `Object.defineProperty(exports, "__esModule", { value: true });
  // exports.__esModule = true;`
  // Object.defineProperty(exports,"__esModule",{value:!0});
  // Object.defineProperty(e,"__esModule",{value:!0})