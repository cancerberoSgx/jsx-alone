import { JSXAlone } from '..';
const testUtilDom = 1;
////  TOOLS for testing the html string in the dom
// Example:
//   renderInDom(<button id="b1" onClick={elSpy}>click</button>)
//   const b = query('#b1')
//   expect(elSpyTimes(b)).toBe(0)
//   b.click()  
//   expect(elSpyTimes(b)).toBe(1)
export function query<T extends HTMLElement = HTMLElement>(s: string): T {
  return document.querySelector<T>(s)!;
}
export function renderInDom(e: JSX.Element) {
  let parent = document.getElementById('test-root');
  if (parent) {
    parent.remove();
  }
  parent = document.createElement('div');
  parent.setAttribute('id', 'test-root');
  document.body.appendChild(parent);
  const s = JSXAlone.render(e);
  parent.innerHTML = s;
  return parent;
}
export function elSpy<T extends HTMLElement = HTMLElement>(this: T, s: any) {
  const v = parseInt(this.getAttribute('data-dataIncremental') || '0');
  this.setAttribute('data-dataIncremental', (v + 1) + '');
}
export function elSpyTimes(el: HTMLElement): number {
  return parseInt(el.getAttribute('data-dataIncremental') || '0');
}
