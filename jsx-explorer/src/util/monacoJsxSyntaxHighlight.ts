import { registerStyle } from '../style/styles';
import * as monaco from 'monaco-editor'

let worker: Worker
let listenerAdded = false
let lastJsxDecorations: string[]=[]
let jsxSyntaxHighlightEventListenerCalled = false
export function jsxSyntaxHighlight(editor: monaco.editor.IStandaloneCodeEditor) {
  if (!listenerAdded) {

    listenerAdded = true

    worker.addEventListener('message', ({ data }) => {
      const model = editor.getModel();
      if (model && model.getVersionId() !== data.version) {
        return;
      }
      const decorations: monaco.editor.IModelDeltaDecoration[] = data.classifications.map((classification: any) => ({
        range: new monaco.Range(classification.startLine, classification.start, classification.endLine, classification.end),
        options: {
          // Some class names to help us add some color to the JSX code
          inlineClassName: classification.type
            ? `${classification.kind} ${classification.type}-of-${classification.parentKind}`
            : classification.kind,
        },
        
      }));
      lastJsxDecorations = editor.deltaDecorations(lastJsxDecorations, decorations)
      
      if (!jsxSyntaxHighlightEventListenerCalled) {
        editor.getModel()!.setValue(editor.getModel()!.getValue())
        jsxSyntaxHighlightEventListenerCalled = true
      }
    });


    registerStyle(`
.JsxText {
  color: #5c6773;
}
.JsxSelfClosingElement,
.JsxOpeningElement,
.JsxClosingElement,
.tagName-of-JsxOpeningElement,
.tagName-of-JsxClosingElement,
.tagName-of-JsxSelfClosingElement {
  color: #41a6d9;
}
.name-of-JsxAttribute {
  color: #f08c36;
}
`)

  }

  worker.postMessage({
    title: 'main.tsx',
    code: editor.getModel()!.getValue(),
    // Unique identifier to avoid displaying outdated validation
    version: editor!.getModel()!.getVersionId(),
  });
}

export function installJsxSyntaxHighlight() {
  worker = new Worker('./jsxh.js');
}
