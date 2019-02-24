import { JSXAlone } from 'jsx-alone-dom'
import { buildModel, MODEL_CONFIG } from './model'
import { App } from './App'
import { printMs } from './util';


function renderApp(config: {peopleCount:number, friendsCount: number}) {
  const onloadT0=Date.now()
  console.time('onload');
  window.onload = () => {
    console.timeEnd('onload');
    const onloadT = Date.now() - onloadT0
    document.getElementById('timings_onload')!.innerHTML=printMs(onloadT)
    document.getElementById('timings_buildModel')!.innerHTML=printMs(buildModelT)
    document.getElementById('timings_JSXAloneCreateElement')!.innerHTML=printMs(JSXAloneCreateElementT)
    document.getElementById('timings_JSXAloneRender')!.innerHTML=printMs(JSXAloneRenderT)
  };

  const buildModelT0=Date.now()
  console.time('buildModel');
  const model = buildModel(config);
  const buildModelT=Date.now()-buildModelT0
  console.timeEnd('buildModel');

  const JSXAloneCreateElementT0=Date.now()
  console.time('JSXAlone.createElement');
  const app = <App {...model} {...config} />;
  const JSXAloneCreateElementT=Date.now()-JSXAloneCreateElementT0
  console.timeEnd('JSXAlone.createElement');

  const JSXAloneRenderT0=Date.now()
  console.time('JSXAlone.render');
  let root = document.getElementById('lotsOfPeopleRoot')
  if(root){
    root.remove()
  }
  const el = JSXAlone.render(app)
  const JSXAloneRenderT=Date.now()-JSXAloneRenderT0
  console.timeEnd('JSXAlone.render');

  document.body.appendChild(el)

  document.getElementById('timings_onload')!.innerHTML='N/E'
    document.getElementById('timings_buildModel')!.innerHTML=printMs(buildModelT)
    document.getElementById('timings_JSXAloneCreateElement')!.innerHTML=printMs(JSXAloneCreateElementT)
    document.getElementById('timings_JSXAloneRender')!.innerHTML=printMs(JSXAloneRenderT)
    
}

(window as any).renderAppLotsOfPeople = renderApp
renderApp(MODEL_CONFIG);