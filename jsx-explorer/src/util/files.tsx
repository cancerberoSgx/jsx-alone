import * as filesPacked_ from './filesPacked.json'
interface File {
  isBinary: false
  fileName: string
  content: string
}
const filesPacked = filesPacked_ as { [f: string]: File }

export const files: File[] = Object.values(filesPacked).filter(f => f.fileName).map(f => ({...f, 
  fileName: f.fileName.substring('src/util/toPack/'.length, f.fileName.length),
}))