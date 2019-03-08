import * as monaco from 'monaco-editor'
import { files } from './files';
import { isDesktop } from './media';
import { dispatch } from '../main';

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

export function installEditor(code:string, theme: string, containerEl: HTMLElement) {
  if (editor) { return }
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

  console.log(files.find(f => f.fileName === 'jsx-alone-core.d.ts')!.content.length);
  
  
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    files.find(f => f.fileName === 'jsx-alone-core.d.ts')!.content, 'node_modules/@types/jsx-alone-core/index.d.ts');

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
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
    }
  })

  const jsxDeclarationsCode = `
  ${files.find(f => f.fileName === 'jsx-alone-core.d.ts')!.content}
  // declare var JSXAlone: typeof AbstractJSXAlone
  `
  console.log(jsxDeclarationsCode);
  
  monaco.editor.createModel(jsxDeclarationsCode, "typescript", monaco.Uri.parse("file:///index.d.ts")),
  editor.getModel()!.onDidChangeContent(e => {
    code = editor!.getModel()!.getValue()
    // shouldnt need to set this.props...
    dispatch({ type: 'CHANGE_CODE', code })
  })
}