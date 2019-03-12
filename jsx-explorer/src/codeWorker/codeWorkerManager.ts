import { dispatch } from '../store/store'
import { COMPILED_ACTION } from '../store/compiled'
import { CodeWorkerListener, CodeWorkerRequest, CodeWorkerResponse } from '../store/types'

// const listeners: CodeWorkerListener[] = []

// export function registerWorkerListener(l: CodeWorkerListener) {
//   listeners.push(l)
// }

// function getWorkerListeners() {
//   return listeners
// }

let codeWorker: Worker

export function installCodeWWorker() {
  codeWorker = new Worker('./codeWorker.ts')
  codeWorker.addEventListener('message', ev => codeWorkerListener(ev))
  codeWorker.addEventListener('error', ev => codeWorkerErrorListener(ev))
}

export function requestCodeCompile(m: CodeWorkerRequest) {
  // setTimeout(() => {
    // console.log('requestCodeCompile', m.jsxAst.mode);
    
    codeWorker.postMessage(m)
  // }, 0);
}

// registerWorkerListener(
//   function codeWorkerListener({ data }: { data: CodeWorkerResponse }) {
//     dispatch({ type: COMPILED_ACTION.RENDER_COMPILED, payload: { response: data } })
//   }
// ) 
function codeWorkerListener({ data }: { data: CodeWorkerResponse }) {
    // console.log('codeWorkerListener', (data.jsxAst as any).config );
    dispatch({ type: COMPILED_ACTION.RENDER_COMPILED, payload: { response: data } })
  // dispatch({ type: COMPILED_ACTION.ERROR_COMPILED, payload: { response: data } })
}
function codeWorkerErrorListener(ev: ErrorEvent) {
  // debugger
  dispatch({ 
    type: COMPILED_ACTION.ERROR_COMPILED, 
    payload: {
       error: { 
      message: ev.message || ev + '', 
      name:  ev + '', 
      stack:ev+'' 
    } } 
  })

  // dispatch({ type: COMPILED_ACTION.RENDER_COMPILED, payload: { response: {error: {message: ev.error.message||ev.error+'' ,name: ev.error.name||ev.error+'', stack: ev.error!.stack||''}} }}
  // )
}