import { evaluate } from '../util/util'
import { readFileSync } from 'fs';

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

    it('exampleLotsOfComponents', () => {
      const lines = readFileSync('src/__tests__/exampleLotsOfComponents.tsx').toString().split('\n')
      const code = lines.slice(1, lines.length).join('\n')
      console.log(code);
      
  })
})
