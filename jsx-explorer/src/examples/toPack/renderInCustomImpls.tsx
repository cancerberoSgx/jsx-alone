/*DONT CHANGE THIS FIRST LINE*/import {JSXAloneJsonImpl as JSXAlone, JSXAloneJsonImpl as JSXAloneJson, JsonImplOutputElAsHtml, JsonImplOutputEl} from 'jsx-alone-core'; import {JSXAlone as JSXAloneDom} from 'jsx-alone-dom'; import {JSXAlone as JSXAloneString} from 'jsx-alone-string'

function test() { 
  // This test renders JS using different implementations altogether. This is
  // mostly a hack and you don't do this in the real world, it's just a demo.
  
  // The way of forcing a custom implementation in this context is creating the 
  // JSXAlone variable and then declare JSX inside an inner function. Returning a 
  // string instead of JSX will result in an element with the string as innerHTML

var JSXAlone = JSXAloneJson as any

  function render<T=any>(impl: 'json'|'string'|'dom', f: ()=>JSX.Element ):T {
    JSXAlone = impl === 'dom' ? JSXAloneDom : impl === 'string' ? JSXAloneString : JSXAloneJson
    console.log(impl, JSXAlone._Impl) 
    const jsx = f()
    const result = JSXAlone.render(jsx) 
    return result as any
  }
  
  // (length=>new Array(Math.trunc(length/5)||1).fill(0).map(i=>Math.random().toString(36).substr(2, 5)).reduce((a, b) => a.concat(b)))(1145)

  const arr = (l:number=number(10)+10) => new Array(Math.trunc(l)+1).fill(0)
  const string=(l: number=number(number(10)+10))=>arr(l/5+1).map(i=>Math.random().toString(36).substr(2, 5)).reduce((a, b) => a.concat(b))
  const number=(b:number=100) => Math.floor(Math.random() * b)
  
  const C = (props: {label:string})=><div className="content"><strong>{props.label}</strong><ul>{arr().map(i=><li>Name: {string()}, age: {number()}</li>)}</ul></div>

  const s = render('string', ()=><C label="I once was a string, because JSXAlone string impl was used"/>)
  const json = render<JsonImplOutputEl>('json', ()=><C label="I wasn't a string nor a DOM element since they used the json impl"/>)
  const el = render<HTMLElement>('dom', ()=><C label={"I was born being a DOM element, this is the proof: "+JSON.stringify(self.performance.toJSON())}/>)


  // At this point we need to restore the original implementation in order to 
  // declare Elements that the test environment expect (which is the json one)
  var JSXAlone = JSXAloneJson as any
  return <div>
    <p>Well, here we have three components that were rendered each using a different implementation: </p>
    <ul>
      <li>string {s.length+'bytes'} - we use dangerouslySetInnerHTML to render the string output here. 
        {/* <div dangerouslySetInnerHTML={{__html: s}}></div> */}
        <pre>{s}</pre>
      </li>
      <li>dom {el.outerHTML.length+'bytes'} -DOM impl currently don't work because examples run in a webworker with has no DOM: 
        {/* <pre dangerouslySetInnerHTML={{__html: el.outerHTML}}></pre> */}
        <pre>{el.outerHTML}</pre>

      </li>
      <li>JSON: we use the tool JsonImplOutputElAsHtml that prints a dummy html string from the json object output:
        {/* <div dangerouslySetInnerHTML={{__html: JsonImplOutputElAsHtml(json)}}></div> */}
        <pre>{JSON.stringify(json, null, 2)}</pre>

        {json}
      </li>
    </ul>
  </div>
} 