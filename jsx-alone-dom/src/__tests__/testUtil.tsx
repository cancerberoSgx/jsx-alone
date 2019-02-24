import { JSXAlone } from '..';
import {expectTextEquals} from 'misc-utils-of-mine-describe-it-expect'
export function test({ e, expected, label,  asCodeEquals , caseInsensitive}: {
  e: JSX.Element;
  expected: string;
  label: string;
  asCodeEquals?: boolean
  caseInsensitive?: boolean
}) {
  it(label + ' without indent', () => {
    let parent = document.getElementById('test-root')
    if(!parent){
      parent = document.createElement('div')
      document.body.appendChild(parent)
    }
    const output: HTMLElement = JSXAlone.render(e, {parent}) as any
    expected = caseInsensitive ? expected.toLowerCase() : expected
    const result = caseInsensitive ? output.outerHTML.toLowerCase() : output.outerHTML
    if(asCodeEquals){
      expectTextEquals(result, expected)
    }
    else {
      expect(result).toBe(expected);
    }
  });
}


describe('fake', ()=>{ it('is needed', ()=>{})})