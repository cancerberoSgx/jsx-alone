import * as filesPacked_ from './filesPacked.json'
interface File {
  isBinary: false
  fileName: string
  content: string
}
const files: File[] = Object.values(filesPacked_ as { [f: string]: File }).filter(f => f.fileName).map(f => ({
  ...f,
  fileName: f.fileName.substring(f.fileName.lastIndexOf('/') + 1, f.fileName.length),
}))

export function getFile(fileName: string) {
  return files.find(f => f.fileName === fileName)!.content
}