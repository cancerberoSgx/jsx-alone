import { buildModel } from './model';
import { App } from './App';
import { MODEL_CONFIG } from './model'
import { Renderer } from '..';
import { LotsOfPeopleConfig, LotsOfPeopleRendererConfig } from './types';
import { getJSXAlone } from '../impl';
const JSXAlone = getJSXAlone()

export function renderApp(renderer: Renderer<LotsOfPeopleRendererConfig>,  config: LotsOfPeopleConfig = MODEL_CONFIG) {

  // buildModel
  const buildModelT0 = Date.now();
  console.time('buildModel');
  const model = buildModel(config);
  const buildModelT = Date.now() - buildModelT0;
  console.timeEnd('buildModel');

  // createElement - declaring the JSX element here will end up in code calling JSXAlone.createElement
  const JSXAloneCreateElementT0 = Date.now();
  console.time('JSXAlone.createElement');
  const app = <div id="jsx-alone-sample-project-code">
    <App {...model} {...config} />;
  </div>
  const JSXAloneCreateElementT = Date.now() - JSXAloneCreateElementT0;
  console.timeEnd('JSXAlone.createElement');

  renderer(app, {buildModelT, JSXAloneCreateElementT});
}


// (window as any).renderAppLotsOfPeople = renderApp
