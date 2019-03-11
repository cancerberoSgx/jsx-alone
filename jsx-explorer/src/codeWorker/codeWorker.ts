import { CodeWorkerRequest, CodeWorkerResponse } from '../store/types'
import { evaluate } from './evaluate'
import { extractCodeDecorations } from './extractCodeDecorations'
import { doJSXAst } from './jsxAstCompilation'

self.addEventListener('message', ({ data }: { data: CodeWorkerRequest }) => {
  const t0 = Date.now()
  const m: CodeWorkerResponse = {
    ...{
      version: data.version,
      jsxSyntaxHighLight: {
        classifications: extractCodeDecorations(data.code, data.title)
      },
      evaluate: evaluate(data.code),
      jsxAst: doJSXAst(data)
    },
    totalTime: Date.now() - t0
  }
  // @ts-ignore
  self.postMessage(m)
})
