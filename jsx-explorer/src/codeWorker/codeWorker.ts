import { CodeWorkerRequest, CodeWorkerResponse } from '../store/types'
import { evaluate } from './evaluate'
import { extractCodeDecorations } from './extractCodeDecorations'
import { doJSXAst } from './jsxAstCompilation'
import {install} from 'jsx-alone-dom-dom'

install()

export let lastRequest : CodeWorkerRequest|undefined

self.addEventListener('message', ({ data }: { data: CodeWorkerRequest }) => {

  if(!lastRequest){
    lastRequest={...data, code: ''}
  }
  
  const t0 = Date.now()

  const jsxAst = doJSXAst(data) // do it first so extractCodeDecorations can reuse generated sourceFile
  const m: CodeWorkerResponse = {
    ...{
      version: data.version,
      jsxSyntaxHighLight: {
        classifications: extractCodeDecorations(data)
      },
      evaluate: evaluate(data.code),
      jsxAst
    },
    totalTime: Date.now() - t0
  }
  lastRequest = data
  // @ts-ignore
  self.postMessage(m)
})
