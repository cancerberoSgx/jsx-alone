import * as ts from 'typescript'
import {JSXAloneJsonImpl, JsonImplOutputEl, ElementLike, JsonImplTextNodeLikeImpl, JsonImplOutput} from 'jsx-alone-core'
describe('compileAndEvaluateJsxTest', () => {
  it('test', () => {
    var code = `
function (){
  var a = Math.random()
  return <article>
    <div>{a}</div>
  </article>
}
    `
    var res = ts.transpileModule(code, {
      compilerOptions: {
        module: ts.ModuleKind.None,
        "jsx": "react",
        "jsxFactory": "JSXAlone.createElement",
      },
    } as any);

    const result = evaluate(res.outputText)
    expect(result.tag).toBe('article')
    expect(()=>JSON.stringify(result)).not.toThrow()
  })
})

export function evaluate(jsx:string){
  const JSXAlone = JSXAloneJsonImpl // cannot put the name as named import because transpilation changes it
  let r: JsonImplOutputEl = null as any
  try {
    // const s = `(function(){return ${jsx.trim()}})()`
    const s = `(${jsx})()`
    const jsxLike = eval(s) 
    r=JSXAlone.render(jsxLike ) as any
    // console.log(r);
    
  } catch (e) {
    console.error(e);
  }
  return r
}
