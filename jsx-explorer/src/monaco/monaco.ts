import * as monaco from 'monaco-editor'
import { isDesktop } from '../util/media';
import { dispatch } from '../main';
import { throttle } from '../util/debounce'
import { jsxSyntaxHighlightInstall } from './jsxSyntaxHighlight';
import { getFile } from '../util/files';
import { postMessage } from '../codeWorkerManager';

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
    typeRoots: ["node_modules/@types"],
    jsx: monaco.languages.typescript.JsxEmit.React,
    jsxFactory: 'JSXAlone.createElement',
  })

  editor = monaco.editor.create(containerEl, {
    model: monaco.editor.createModel(code, "typescript", monaco.Uri.parse("file:///main.tsx")),
    language: 'typescript',
    theme,
    lineNumbers: isDesktop() ? 'on' : 'off',
    glyphMargin: isDesktop(),
    folding: isDesktop(),
    minimap: isDesktop() ? undefined : {
      enabled: false
    },
  })

  monaco.editor.createModel(
    getFile('jsx-alone-core.d.ts'),
    "typescript", monaco.Uri.parse("file:///index.d.ts"))

  editor.getModel()!.onDidChangeContent(
    throttle(
      (e: monaco.editor.IModelContentChangedEvent) => {
        code = editor!.getModel()!.getValue()

        postMessage({
          title: 'main.tsx',
          code: editor!.getModel()!.getValue(),
          // Unique identifier to avoid displaying outdated validation
          version: editor!.getModel()!.getVersionId(),
        })

        dispatch({ type: 'CHANGE_CODE', code })
      }
      , 4000) as any
  )

  jsxSyntaxHighlightInstall(editor!)
}




