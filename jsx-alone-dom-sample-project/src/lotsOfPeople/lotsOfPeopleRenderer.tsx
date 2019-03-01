import { LotsOfPeopleRendererConfig } from 'jsx-alone-sample-project-code'
import { JSXAlone } from 'jsx-alone-dom'
import { printMs } from 'jsx-alone-core'
export const lotsOfPeopleRenderer = (app: JSX.Element, config: LotsOfPeopleRendererConfig): {
  el: HTMLElement;
  JSXAloneRenderT: number;
} => {
  // measures onload
  const onloadT0 = Date.now()
  // console.time('onload');
  window.onload = () => {
    // console.timeEnd('onload');
    const onloadT = Date.now() - onloadT0
    document.getElementById('timings_onload')!.innerHTML = printMs(onloadT)
    document.getElementById('timings_buildModel')!.innerHTML = printMs(config.buildModelT)
    document.getElementById('timings_JSXAloneCreateElement')!.innerHTML = printMs(config.JSXAloneCreateElementT)
    document.getElementById('timings_JSXAloneRender')!.innerHTML = printMs(JSXAloneRenderT)
  }
  // measures render
  const JSXAloneRenderT0 = Date.now()
  // console.time('JSXAlone.render()');
  const el = JSXAlone.render(app)
  // console.timeEnd('JSXAlone.render()');
  const JSXAloneRenderT = Date.now() - JSXAloneRenderT0
  // measures appendChild TODO: timing
  let root = document.getElementById('jsx-alone-sample-project-code')
  if (root) {
    root.remove()
  }
  root = document.createElement('dir')
  root.setAttribute('id', 'jsx-alone-sample-project-code')
  root.appendChild(el)
  document.body.appendChild(root)
  document.getElementById('timings_onload')!.innerHTML = 'N/E'
  document.getElementById('timings_buildModel')!.innerHTML = printMs(config.buildModelT)
  document.getElementById('timings_JSXAloneCreateElement')!.innerHTML = printMs(config.JSXAloneCreateElementT)
  document.getElementById('timings_JSXAloneRender')!.innerHTML = printMs(JSXAloneRenderT)
  return { el: root, JSXAloneRenderT }
}
