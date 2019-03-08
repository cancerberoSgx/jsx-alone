import { evaluate } from '../util/evaluate'
import { readFileSync } from 'fs'
import { JsonImplOutputEl, isJsonImplOutputEl } from 'jsx-alone-core'
describe('samples', () => {

  describe('compileAndEvaluateJsxTest', () => {
    it('test', () => {
      const code = `
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
      const lines = readFileSync(file).toString().split('\n')
      const code = [`function test() {
${Object.keys(globals).map(g => `
var ${g} = ${globals[g]};
`).join('\n')}
`, ...lines.slice(1, lines.length)].join('\n')
      const times = {}
      const result = evaluate<T>(code, impl, times)
      if (impl === 'json') {
        expect(() => JSON.stringify(result)).not.toThrow()
      }
      return { result, times }
    }

    it('should generate correct amount of nodes', () => {
      const PERSON_COUNT = 4, CONTACT_COUNT = 3, ADDRESS_COUNT = 2
      const { result, times } = render(
        'src/examples/toPack/exampleLotsOfComponents.tsx',
        { PERSON_COUNT, CONTACT_COUNT, ADDRESS_COUNT },
        'json'
      )

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

    describe('<If>', () => {

      function test(s: string, PERSON_COUNT: number) {
        const noS = s.replace(/\s+/g, '')
        expect(noS).not.toContain(`data-test="name">Seba`)
        expect(noS.includes(`data-test="name">Laura`) || noS.includes(`data-test="name">Andres`)).toBe(true)
        expect(noS).not.toContain(`data-test="age">5`)
        expect(noS.includes(`data-test="age">4`) || noS.includes(`data-test="age">3`) || noS.includes(`data-test="age">2`)).toBe(true)
        expect(noS.split('data-test="name"').length).toBeGreaterThan(PERSON_COUNT / 3)
        expect(noS.split('data-test="age"').length).toBeGreaterThan(PERSON_COUNT / 3)

      }

      it('<If> should work (string implementation)', () => {
        const PERSON_COUNT = 44, CONTACT_COUNT = 1, ADDRESS_COUNT = 1
        const { result, times } = render<string>(
          'src/examples/toPack/exampleLotsOfComponents.tsx',
          { PERSON_COUNT, CONTACT_COUNT, ADDRESS_COUNT },
          'string'
        )
        test(result, PERSON_COUNT)
      })

      it('<If> should work (dom implementation)', () => {
        const PERSON_COUNT = 44, CONTACT_COUNT = 1, ADDRESS_COUNT = 1
        const { result, times } = render<HTMLElement>(
          'src/examples/toPack/exampleLotsOfComponents.tsx',
          { PERSON_COUNT, CONTACT_COUNT, ADDRESS_COUNT },
          'dom'
        )
        test(result.outerHTML, PERSON_COUNT)
      })

    })

  })

})
