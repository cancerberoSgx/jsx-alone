/*DONT CHANGE THIS FIRST LINE*/import { JSXAloneJsonImpl as JSXAlone, JSXAloneJsonImpl as JSXAloneJson, jsonImplOutputElAsHtml, JsonImplOutputEl } from 'jsx-alone-core'; import { JSXAlone as JSXAloneDom } from 'jsx-alone-dom'; import { JSXAlone as JSXAloneString } from 'jsx-alone-string'

// This test renders JS using different implementations altogether. This is
// mostly a hack and you don't do this in the real world, it's just a demo.

// The way of forcing a custom implementation in this context is creating the
// JSXAlone variable and then declare JSX inside an inner function.

function test() {
  let JSXAlone = JSXAloneString
  const s: string = (() => {
    const el = <div className="string">Hello</div>
    return JSXAloneString.render(el)
  })()

  // At this point we need to restore the original implementation in order to
  // declare Elements that the test environment expect (which is the json one)
  JSXAlone = JSXAloneJson as any
  return <pre>{s}</pre>
}
