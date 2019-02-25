import {lotsOfPeople, Renderer, printMs, LotsOfPeopleRendererConfig} from 'jsx-alone-sample-project-code'
// import { LotsOfPeopleRendererConfig } from 'jsx-alone-sample-project-code/dist/src/lotsOfPeople/types';
import { JSXAlone } from 'jsx-alone-string';

//@ts-ignore
global.JSXAloneImplName__ === 'string'

let s=''
const renderer: Renderer = (app: JSX.Element, config: LotsOfPeopleRendererConfig) => {

  // measures onload
  

  // measures render
  console.time('JSXAlone.render()');
  const JSXAloneRenderT0 = Date.now();
  s= JSXAlone.render(app);
  console.timeEnd('JSXAlone.render()');
  const JSXAloneRenderT = Date.now() - JSXAloneRenderT0;


  console.log(`
buildModel: ${(config.buildModelT)}
JSXAloneCreateElement: ${(config.JSXAloneCreateElementT)}
JSXAloneRender: ${(JSXAloneRenderT)}
  `);
//   console.log(`
// buildModel: ${printMs(config.buildModelT)}
// JSXAloneCreateElement: ${printMs(config.JSXAloneCreateElementT)}
// JSXAloneRender: ${printMs(JSXAloneRenderT)}
//   `);
}

export function renderLotsOfPeople(){
  lotsOfPeople(renderer)
  return s
}

