import { JSXAlone } from 'jsx-alone-dom'
import {  buildModel } from './model'
import { App } from './App'

export function renderApp() {
  console.time('onload')
  window.onload=()=>{console.timeEnd('onload')}

  console.time('onloadend')
  window.onloadend=()=>{console.timeEnd('onloadend')}

  console.time('buildModel')
  const model = buildModel({ peopleCount: 1000, friendsCount: 200 })
  console.timeEnd('buildModel')

  console.time('JSXAlone.createElement')
  const app = <App {...model} />
  console.timeEnd('JSXAlone.createElement')

  console.time('JSXAlone.render')
  JSXAlone.render(app, { parent: document.body })
  console.timeEnd('render')
}
