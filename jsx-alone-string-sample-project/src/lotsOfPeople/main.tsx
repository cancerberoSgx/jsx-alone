import { lotsOfPeople, LotsOfPeopleRendererConfig, Renderer } from 'jsx-alone-sample-project-code';
import { JSXAlone } from 'jsx-alone-string';

let s=''

const renderer: Renderer = (app: JSX.Element, config: LotsOfPeopleRendererConfig) => {
  console.time('JSXAlone.render()');
  s= JSXAlone.render(app);
  console.timeEnd('JSXAlone.render()');
}

export function renderLotsOfPeople(){
  lotsOfPeople(renderer,  {peopleCount: 10, friendsCount: 2})
  return s
}

