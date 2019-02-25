import { lotsOfPeople, Renderer, printMs, LotsOfPeopleRendererConfig } from 'jsx-alone-sample-project-code'
import { JSXAlone } from 'jsx-alone-dom'

// let el_ : JSX.Element
// let JSXAloneRenderT:number
const renderer: Renderer = (app: JSX.Element, config: LotsOfPeopleRendererConfig) => {
  // el_ = app
  // measures onload
  const onloadT0 = Date.now()
  console.time('onload')
  window.onload = () => {
    console.timeEnd('onload')
    const onloadT = Date.now() - onloadT0
    document.getElementById('timings_onload')!.innerHTML = printMs(onloadT)
    document.getElementById('timings_buildModel')!.innerHTML = printMs(config.buildModelT)
    document.getElementById('timings_JSXAloneCreateElement')!.innerHTML = printMs(config.JSXAloneCreateElementT)
    document.getElementById('timings_JSXAloneRender')!.innerHTML = printMs(JSXAloneRenderT)
  }

  // measures render
  const JSXAloneRenderT0 = Date.now()
  console.time('JSXAlone.render()')
  const el = JSXAlone.render(app)
  console.timeEnd('JSXAlone.render()')
  const JSXAloneRenderT = Date.now() - JSXAloneRenderT0

  // measures appendChild TODO: timing
  let root = document.getElementById('jsx-alone-sample-project-code')
  if (root) {
    root.remove()
  }
  root = document.createElement('dir')
  root.setAttribute('id', 'jsx-alone-sample-project-code')
  document.body.appendChild(el)

  document.getElementById('timings_onload')!.innerHTML = 'N/E'
  document.getElementById('timings_buildModel')!.innerHTML = printMs(config.buildModelT)
  document.getElementById('timings_JSXAloneCreateElement')!.innerHTML = printMs(config.JSXAloneCreateElementT)
  document.getElementById('timings_JSXAloneRender')!.innerHTML = printMs(JSXAloneRenderT)

  // var app = <div>{new Date().toDateString()}</div>
  // const e = JSXAlone.render(app)
  // console.log(e)
}

// lotsOfPeople(renderer.bind(null, el_!, {JSXAloneRenderT: JSXAloneRenderT!}))
lotsOfPeople(renderer)