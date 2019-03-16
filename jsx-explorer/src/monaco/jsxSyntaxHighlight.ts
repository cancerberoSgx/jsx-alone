import * as monaco from 'monaco-editor'
import { CodeWorkerResponse } from '../store/types'
import { registerStyle } from '../style/styles'
import { getMonacoInstance } from './monaco'
import { jsxColorSkins } from '../components/explorer/jsxColors/skinsData';
import { buildCssForSkin } from '../components/explorer/jsxColors/jsxColorsCssBuilder';

let lastJsxDecorations: string[] = []

//TODO: this could be improved  with hierarchy - is monaco supports adding a classname to a range ?
export function dispatchSyntaxHighlight(data: CodeWorkerResponse) {
  const editor = getMonacoInstance()! // TODO
  const model = editor.getModel()

  if (model && model.getVersionId() !== data.version) {
    return
  }
  const decorations: monaco.editor.IModelDeltaDecoration[] = data.jsxSyntaxHighLight.classifications.map(classification => {
    // const inlineClassName = `${classification.type ? `${classification.type}-of-${classification.parentKind}` : ''} ${classification.kind} ${(classification.extra||[]).join(' ')}`
    const inlineClassName = `${classification.kind} ${classification.parentKind} ${classification.parentKind} ${(classification.extra||[]).join(' ')}`
    return {
      range: new monaco.Range(classification.startLineNumber, classification.startColumn, classification.endLineNumber, classification.endColumn),
      options: {
        // Some class names to help us add some color to the JSX code
        inlineClassName
      }
    }
  })

  lastJsxDecorations = editor.deltaDecorations(lastJsxDecorations, decorations)
}

export function jsxSyntaxHighlightInstall(editor: monaco.editor.IStandaloneCodeEditor) {
  const { styles: lightStyles } = buildCssForSkin(jsxColorSkins.find(t => t.name === 'Default Light') || jsxColorSkins[0])

  registerStyle(lightStyles)

}
