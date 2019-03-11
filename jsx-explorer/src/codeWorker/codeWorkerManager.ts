import { dispatch } from '../store/store'
import { COMPILED_ACTION } from '../store/compiled'
import { CodeWorkerListener, CodeWorkerRequest, CodeWorkerResponse } from '../store/types'

const listeners: CodeWorkerListener[] = []

export function registerWorkerListener(l: CodeWorkerListener) {
  listeners.push(l)
}

export function getWorkerListeners() {
  return listeners
}

let codeWorker: Worker

export function installCodeWWorker() {
  codeWorker = new Worker('./codeWorker.ts')
  getWorkerListeners().forEach(l => codeWorker.addEventListener('message', l))
}

export function postMessage(m: CodeWorkerRequest) {
  codeWorker.postMessage(m)
}

function codeWorkerListener({ data }: { data: CodeWorkerResponse }) {
  dispatch({type: COMPILED_ACTION.RENDER_COMPILED, payload: {response: data}})
}

registerWorkerListener(codeWorkerListener)
