import * as monaco from 'monaco-editor'
import { CodeWorkerResponse } from '../store/types'
import { registerStyle } from '../style/styles'
import { getMonacoInstance } from './monaco'

let lastJsxDecorations: string[] = []


//TODO: this could be improved  with hierarchy - is monaco supports adding a classname to a range ?

export function dispatchSyntaxHighlight(data: CodeWorkerResponse ) {
  const editor = getMonacoInstance()! // TODO
  const model = editor.getModel()
  
  if (model && model.getVersionId() !== data.version) {
    return
  }
  const decorations: monaco.editor.IModelDeltaDecoration[] = data.jsxSyntaxHighLight.classifications.map(classification => {
    const inlineClassName = classification.type ? `${classification.type}-of-${classification.parentKind}`: classification.kind
    return {
      range: new monaco.Range(classification.startLine, classification.start, classification.endLine, classification.end),
      options: {
        // Some class names to help us add some color to the JSX code
        inlineClassName
      }
    }
  })
  lastJsxDecorations = editor.deltaDecorations(lastJsxDecorations, decorations)
}

export function jsxSyntaxHighlightInstall(editor: monaco.editor.IStandaloneCodeEditor) {

  const lightStyles = `
.JsxText {
  color: #5c6773;
}
.JsxExpression {  /* the braces {} in an jsx expression */
  color:  #009900
}
.JsxAttribute.JsxText { /* the = in an attribute decl */
  pink
}
.JsxOpeningElement,
.JsxClosingElement {
  color: #888811;
}
.JsxSelfClosingElement,
.tagName-of-JsxOpeningElement,
.tagName-of-JsxClosingElement,
.tagName-of-JsxSelfClosingElement {
  color: #41a6d9;
}
.name-of-JsxAttribute {
  color: #f08c36;
}
`

  const darkStyles = `
.JsxText {
  color: #8a97b3;
}
.JsxExpression {  /* the braces {} in an jsx expression */
  color:  #00bb00
}
.JsxAttribute.JsxText { /* the = in an attribute decl */
  pink
}
.JsxOpeningElement,
.JsxClosingElement {
  color: #cccc88;
}
.JsxSelfClosingElement,
.tagName-of-JsxOpeningElement,
.tagName-of-JsxClosingElement,
.tagName-of-JsxSelfClosingElement {
  color: #8dc5d5;
}
.name-of-JsxAttribute {
  color: #f08c36;
}
`
  registerStyle(lightStyles.split('\n').map(l => l.trim().startsWith('.') ? '.vs ' + l : l).join('\n'))

  registerStyle(darkStyles.split('\n').map(l => l.trim().startsWith('.') ? '.vs-dark ' + l : l).join('\n'))

}
