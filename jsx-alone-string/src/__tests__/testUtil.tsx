import { ReactLike } from '..';

export function test({ e, expected, label, expectedTabSize2 }: {
  e: JSX.Element;
  expected: string;
  label: string;
  expectedTabSize2?: string;
}) {
  it(label + ' without indent', () => {
    const output = ReactLike.render(e, { indent: false, indentTabSize: 0 });
    expect(output).toBe(expected);
  });
  if (expectedTabSize2) {
    it(label + 'with indentTabSize: 2', () => {
      const output = ReactLike.render(e, { indent: true, indentTabSize: 2 });
      expect(output).toBe(expectedTabSize2);
    });
  }
}


describe('fake', ()=>{ it('is needed', ()=>{})})