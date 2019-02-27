import { JSXAlone } from '..';
import { removeWhites } from 'jsx-alone-core';
export function test({ e, expected, label, expectedTabSize2, asCodeEquals, asCodeContains }: {
  e: JSX.Element;
  expected: string;
  label: string;
  expectedTabSize2?: string;
  asCodeEquals?: boolean
  asCodeContains?: boolean
}) {
  it(label + ' without indent', () => {
    const output = JSXAlone.render(e, { indent: false, indentTabSize: 0 });
    if(asCodeEquals){
      expectTextEquals(output, expected)
    }
    else if(asCodeContains){
      expectTextToContain(output, expected)
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

export function expectTextEquals(a?: string, b?: string, debug = false) {
  debug && console.log(a, b)
  if (!a || !b) return false
  expect(removeWhites(a)).toEqual(removeWhites(b))
}
export function expectTextToContain(a?: string, b?: string, debug = false) {
  debug && console.log(a, b)
  if (!a || !b) return false
  expect(removeWhites(a)).toContain(removeWhites(b))
}
export function expectTextNotToContain(a?: string, b?: string, debug = false) {
  debug && console.log(a, b)
  if (!a || !b) return false
  expect(removeWhites(a)).not.toContain(removeWhites(b))
}
