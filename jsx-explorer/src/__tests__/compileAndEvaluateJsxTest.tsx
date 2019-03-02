import { evaluate } from '../util'

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
