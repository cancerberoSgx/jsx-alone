# How to setup JSX in monaco

Implemented in `installEditor()` at [src/util/monaco.ts](src/util/monaco.ts). 

## Steps

 * call `setCompilerOptions` with jsx flags
 * create editor model with .jsx extension
 * add JSX definitions as a monaco model so they can be imported from the code. In my case these are in [src/util/toPack/jsx-alone-core.d.ts](src/util/toPack/jsx-alone-core.d.ts)
 * If you work with React then you want to copy these from react typings or just replace JSXAlone with React at the end of that file. 

## Code

```ts
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
})

monaco.editor.createModel(jsxDefinitionsCode, "typescript", monaco.Uri.parse("file:///index.d.ts"))
```

Notice that the model with JSX typings is index.d.ts, code in main.tsx can import React/JSXAlone like this:

```tsx
import { JSXAlone } from '.'

const name = 'Rambo', suffix = 'Mister'
const c= <div className="simple2">Hello
  <span dangerouslySetInnerHTML={{__html: `\n<strong>${suffix}</strong>\n<em className="name">${name}</em>\n`}}>
  </span>
</div>
```

See it working: https://cancerberosgx.github.io/jsx-alone/jsx-explorer/