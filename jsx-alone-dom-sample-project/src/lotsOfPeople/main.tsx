import { JSXAlone } from 'jsx-alone-dom'
import {  buildModel } from './model'
import { App } from './App'

export function renderApp() {
  console.time('onload')
  window.onload=()=>{console.timeEnd('onload')}

  console.time('buildModel')
  const model = buildModel({ peopleCount: 100, friendsCount: 20 })
  console.timeEnd('buildModel')

  console.time('JSXAlone.createElement')
  const app = <App {...model} />
  console.timeEnd('JSXAlone.createElement')

  console.time('JSXAlone.render')
  JSXAlone.render(app, { parent: document.body })
  console.timeEnd('render')
}

renderApp()