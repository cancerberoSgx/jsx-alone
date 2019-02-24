import { JSXAlone } from '..';
import {expectTextEquals} from 'misc-utils-of-mine-describe-it-expect'
export function test({ e, expected, label, expectedTabSize2, asCodeEquals }: {
  e: JSX.Element;
  expected: string;
  label: string;
  expectedTabSize2?: string;
  asCodeEquals?: boolean
}) {
  it(label + ' without indent', () => {
    const output = JSXAlone.render(e, { indent: false, indentTabSize: 0 });
    if(asCodeEquals){
      expectTextEquals(output, expected)
    }
    else {
      expect(output).toBe(expected);
    }
  });
  if (expectedTabSize2) {
    it(label + 'with indentTabSize: 2', () => {
      const output = JSXAlone.render(e, { indent: true, indentTabSize: 2 });
      expect(output).toBe(expectedTabSize2);
    });
  }
}


describe('fake', ()=>{ it('is needed', ()=>{})})