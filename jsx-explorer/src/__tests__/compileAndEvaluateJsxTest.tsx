import { evaluate } from "../util/evaluate";
import { readFileSync } from 'fs';
import { JsonImplOutputEl, isJsonImplOutputEl } from 'jsx-alone-core';
describe('samples', () => {

describe('compileAndEvaluateJsxTest', () => {
  it('test', () => {
    let code = `
    function (){
      var a = Math.random()
      return <article>
        <div>{a}</div>
      </article>
    }`
    const result = evaluate(code)
    expect(result.tag).toBe('article')
    expect(() => JSON.stringify(result)).not.toThrow()
  })
})

  describe('exampleLotsOfComponents', () => {

    function render<T = JsonImplOutputEl>(file: string, globals: { [k: string]: number }, impl: 'json' | 'dom' | 'string' = 'json') {
      const lines = readFileSync(file).toString().split('\n');
      const code = [`function test() {
${Object.keys(globals).map(g => `
var ${g} = ${globals[g]}; 
`).join('\n')}
`, ...lines.slice(1, lines.length)].join('\n');
      const times = {};
      const result = evaluate<T>(code, impl, times)
      if (impl === 'json') {
        expect(() => JSON.stringify(result)).not.toThrow()
      }
      return { result, times };
    }

    it('should generate correct amount of nodes', () => {
      const PERSON_COUNT = 4, CONTACT_COUNT = 3, ADDRESS_COUNT = 2
      const { result, times } = render(
        'src/__tests__/exampleLotsOfComponents.tsx',
        { PERSON_COUNT, CONTACT_COUNT, ADDRESS_COUNT },
        'json'
      );

      expect(result.children).toHaveLength(PERSON_COUNT)

      expect(result.children.filter(isJsonImplOutputEl)
        .filter(c => c.attrs['data-test'] === 'person'))
        .toHaveLength(PERSON_COUNT)

      expect(result.children.filter(isJsonImplOutputEl)
      [0].children.filter(isJsonImplOutputEl)
        .filter(c => c.attrs['data-test'] === 'contact'))
        .toHaveLength(CONTACT_COUNT)

      expect(result.children.filter(isJsonImplOutputEl)
      [0].children.filter(isJsonImplOutputEl)
        .filter(c => c.attrs['data-test'] === 'contact')[0].children.filter(isJsonImplOutputEl)
        .filter(c => c.attrs['data-test'] === 'address'))
        .toHaveLength(ADDRESS_COUNT)


    })
  })

})
