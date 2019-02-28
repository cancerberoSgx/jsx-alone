import { buildModel } from './model';
import { MODEL_CONFIG } from './model'
import { Renderer } from '..';
import { AbstractJSXAlone, getGlobal } from 'jsx-alone-core';
import { LotsOfPeopleConfig, LotsOfPeopleRendererConfig } from './types';
import { getApp } from './App';

export function renderApp(renderer: Renderer<LotsOfPeopleRendererConfig>, config: LotsOfPeopleConfig = MODEL_CONFIG, JSXAlone: typeof AbstractJSXAlone) {
  renderer_ = renderer

  if (typeof window !== 'undefined') {
    getGlobal().renderAppLotsOfPeople = (config: LotsOfPeopleConfig) => renderApp(renderer_, config, JSXAlone)
  }

  const buildModelT0 = Date.now();
  console.time('buildModel');
  const model = buildModel(config);
  const buildModelT = Date.now() - buildModelT0;
  console.timeEnd('buildModel');

  // createElement - declaring the JSX element here will end up in code calling JSXAlone.createElement
  const JSXAloneCreateElementT0 = Date.now();
  console.time('JSXAlone.createElement');
  const App = getApp(JSXAlone)
  const app = <div id="jsx-alone-sample-project-code">
    <App {...model} {...config} />;
  </div>
  const JSXAloneCreateElementT = Date.now() - JSXAloneCreateElementT0;
  console.timeEnd('JSXAlone.createElement');

  renderer(app, { buildModelT, JSXAloneCreateElementT });
  return app
}
let renderer_: Renderer<LotsOfPeopleRendererConfig>
