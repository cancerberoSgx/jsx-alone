import { writeFileSync } from 'fs';
import { JSXAlone } from 'jsx-alone-string';

export function run(fn: ()=>JSX.Element, exampleName: string): string {
  console.time('createElement')
  const el = fn()
  console.timeEnd('createElement')
  
  console.time('render')
  const s = JSXAlone.render(el)
  console.timeEnd('render')

  return s
  // console.log(s);
  
  // writeFileSync()
}