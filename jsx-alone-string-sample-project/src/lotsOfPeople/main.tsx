import {lotsOfPeople, Renderer, printMs, LotsOfPeopleRendererConfig} from 'jsx-alone-sample-project-code'
// import { LotsOfPeopleRendererConfig } from 'jsx-alone-sample-project-code/dist/src/lotsOfPeople/types';
import { JSXAlone } from 'jsx-alone-dom';


const renderer: Renderer = (app: JSX.Element, config: LotsOfPeopleRendererConfig) => {

  // measures onload
  

  // measures render
  console.time('JSXAlone.render()');
  const s= JSXAlone.render(app);
  console.timeEnd('JSXAlone.render()');

  // measures appendChild TODO: timing
  const JSXAloneRenderT0 = Date.now();
  const JSXAloneRenderT = Date.now() - JSXAloneRenderT0;


  console.log(`
buildModel: ${printMs(config.buildModelT)}
JSXAloneCreateElement: ${printMs(config.JSXAloneCreateElementT)}
JSXAloneRender: ${printMs(JSXAloneRenderT)}

  `);
}

lotsOfPeople(renderer)

