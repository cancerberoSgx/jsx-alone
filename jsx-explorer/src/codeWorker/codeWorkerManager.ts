import { COMPILED_ACTION } from '../store/compiled';
import { dispatch } from '../store/store';
import { CodeWorkerRequest, CodeWorkerResponse } from '../store/types';

let codeWorker: Worker

export function installCodeWWorker() {
  codeWorker = new Worker('./codeWorker.ts')
  codeWorker.addEventListener('message', ev => codeWorkerListener(ev))
  codeWorker.addEventListener('error', ev => codeWorkerErrorListener(ev))
}

export function requestCodeCompile(m: CodeWorkerRequest) {
  codeWorker.postMessage(m)
}

function codeWorkerListener({ data }: { data: CodeWorkerResponse }) {
  dispatch({ type: COMPILED_ACTION.RENDER_COMPILED, payload: { response: data } })
}

function codeWorkerErrorListener(ev: ErrorEvent) {
  dispatch({
    type: COMPILED_ACTION.ERROR_COMPILED,
    payload: {
      error: {
        message: ev.message || ev + '',
        name: ev + '',
        stack: ev + ''
      }
    }
  })
}