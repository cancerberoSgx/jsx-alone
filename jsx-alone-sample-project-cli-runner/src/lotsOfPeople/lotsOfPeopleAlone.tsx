import { lotsOfPeople, LotsOfPeopleRendererConfig, LotsOfPeopleConfig } from 'jsx-alone-sample-project-code'
import { lotsOfPeopleRenderer } from "jsx-alone-dom-sample-project";
import { JSXAlone } from 'jsx-alone-dom';

export function lotsOfPeopleAloneTest(config: LotsOfPeopleConfig) {

  return lotsOfPeople((app: JSX.Element, rendererConfig?: LotsOfPeopleRendererConfig) => {

    const { JSXAloneRenderT } = lotsOfPeopleRenderer(app, rendererConfig!)

    return { renderTime: JSXAloneRenderT, createElementTime: rendererConfig && rendererConfig.JSXAloneCreateElementT || 0 }

  }, config, JSXAlone)
}
