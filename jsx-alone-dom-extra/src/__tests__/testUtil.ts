import { JSXAlone } from 'jsx-alone-dom';

export function render(e: JSX.Element) {
  let parent = document.getElementById('test-root')
  if (parent) {
    parent.remove()
  }
  parent = document.createElement('div')
  parent.setAttribute('id', 'test-root')
  document.body.appendChild(parent)
  return JSXAlone.render(e, { parent }) as HTMLElement
}