import { CodeWorkerRequest, CodeWorkerResponse } from '../store/types'
import { evaluate } from './evaluate'
import { extractCodeDecorations } from './extractCodeDecorations'
import { doJSXAst } from './jsxAstCompilation'
import { install } from 'jsx-alone-dom-dom'
import { getGlobal } from 'jsx-alone-core';

export let lastRequest: CodeWorkerRequest | undefined

if (typeof self !== 'undefined' && typeof self.onmessage === 'object') {

  install()

  getGlobal().addEventListener('message', ({ data }: { data: CodeWorkerRequest }) => {

    if (!lastRequest) {
      lastRequest = { ...data, code: '' }
    }

    const t0 = Date.now()

    const {jsxAst, sourceFile, project} = doJSXAst(data) // do it first so extractCodeDecorations can reuse generated sourceFile
    const m: CodeWorkerResponse = {
      ...{
        version: data.version,
        jsxSyntaxHighLight: {
          classifications: extractCodeDecorations(data, sourceFile, project)
        },
        evaluate: evaluate(data.code),
        jsxAst
      },
      totalTime: Date.now() - t0
    }
    lastRequest = data

    // @ts-ignore
    getGlobal().postMessage(m)
  })
}
