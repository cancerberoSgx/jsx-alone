import * as monaco from 'monaco-editor'
import { isDesktop } from '../util/media'
import { throttle } from '../util/debounce'
import { jsxSyntaxHighlightInstall } from './jsxSyntaxHighlight'
import { dispatch, getState } from '../store/store'
import { EDITOR_ACTION } from '../store/editor'
import { jsx_alone_core_d_ts } from '../util/filesPacked/jsx_alone_core_d_ts'

export function initMonacoWorkers() {
  if (typeof (self as any).MonacoEnvironment === 'undefined') {
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
  }
}

let editor: monaco.editor.IStandaloneCodeEditor | undefined

export function getMonacoInstance() {
  return editor
}

export function installEditor(code: string, theme: string, containerEl: HTMLElement) {
  if (editor) {
    return
  } 

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    typeRoots: ['node_modules/@types'],
    jsx: monaco.languages.typescript.JsxEmit.React,
    jsxFactory: 'JSXAlone.createElement'
  })

  editor = monaco.editor.create(containerEl, {
    model: monaco.editor.createModel(code, 'typescript', monaco.Uri.parse('file:///main.tsx')),
    language: 'typescript',
    theme,
    wordWrap: 'on',
    lineNumbers: isDesktop() ? 'on' : 'off',
    glyphMargin: isDesktop(),
    folding: isDesktop(),
    minimap: isDesktop() ? undefined : {
      enabled: false
    }
  })

  monaco.editor.createModel(jsx_alone_core_d_ts, 'typescript', monaco.Uri.parse('file:///index.d.ts'))

  editor.getModel()!.onDidChangeContent(
    throttle(
      (e: monaco.editor.IModelContentChangedEvent) => {
        dispatch({
          type: EDITOR_ACTION.EDITOR_MODEL_CHANGED,
          payload: {
            code: editor!.getModel()!.getValue(),
            version: editor!.getModel()!.getVersionId()
          }
        })
      }, 3000, { trailing: true }) as any
  )

  jsxSyntaxHighlightInstall(editor!)

  dispatch({
    type: EDITOR_ACTION.EDITOR_MODEL_CHANGED,
    payload: {
      code: editor!.getModel()!.getValue(),
      version: editor!.getModel()!.getVersionId()
    }
  })
  
}
