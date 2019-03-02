console.log('tests')

import { evaluate } from '../util'

export function compileAndEvaluateJsxTest() {
  let code = `
function (){
  var a = Math.random()
  return <article>
    <div>{a}</div>
  </article>
}
    `
  const result = evaluate(code)
  return result
}

const r = compileAndEvaluateJsxTest()
console.log(r)
