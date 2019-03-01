import { lotsOfPeople, LotsOfPeopleRendererConfig, Renderer } from 'jsx-alone-sample-project-code'
import { JSXAlone } from 'jsx-alone-string'

let s = ''

const renderer: Renderer = (app: JSX.Element, config: LotsOfPeopleRendererConfig) => {
  console.time('JSXAlone.render()')
  s = JSXAlone.render(app, _indent ? {indent: true, indentTabSize: 2} : {indent: false, indentTabSize: 0})
  console.timeEnd('JSXAlone.render()')
}
let _indent: boolean
export function renderLotsOfPeople(indent= false) {
  _indent = indent
  lotsOfPeople(renderer,  {peopleCount: 10, friendsCount: 2}, JSXAlone)
  return s
}
