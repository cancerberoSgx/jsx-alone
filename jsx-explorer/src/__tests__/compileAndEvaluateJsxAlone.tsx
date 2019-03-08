import { evaluate } from '../codeWorker/evaluate'

export function compileAndEvaluateJsxTest() {
  const code = `
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
