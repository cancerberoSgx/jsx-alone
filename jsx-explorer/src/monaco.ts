import * as monaco from 'monaco-editor'
(self as any).MonacoEnvironment = {
  getWorkerUrl(moduleId: any, label: any) {
    if (label === 'json') {
      return './json.worker.js'
    }
    if (label === 'css') {
      return './css.worker.js'
    }
    if (label === 'html') {
      return './html.worker.js'
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js'
    }
    return './editor.worker.js'
  }
}
interface Config {
  container: HTMLElement
  code: string,
  theme: 'light'|'dark'
}
export function create(config: Config) {
  // setup()
  const e = monaco.editor.create(config.container, {
    value: config.code,
    language: 'javascript',
    theme: config.theme === 'light' ? 'vs' : 'vs-dark'
  })
  return e
}
// function setup() {

// }
