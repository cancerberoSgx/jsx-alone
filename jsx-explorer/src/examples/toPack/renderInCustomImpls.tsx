/*DONT CHANGE THIS FIRST LINE*/import { JSXAloneJsonImpl as JSXAloneJson } from 'jsx-alone-core'; import { JSXAlone as JSXAloneDom } from 'jsx-alone-dom'; import { JSXAlone as JSXAloneString } from 'jsx-alone-string'; const WORD_COUNT = 4, PEOPLE_COUNT = 5

                               function test() {
  // This test renders JS using different implementations altogether. This is
  // mostly a hack and you don't do this in the real world, it's just a demo.

  // The way of forcing a custom implementation in this context is creating the
  // JSXAlone variable and then declare JSX inside an inner function. Returning a
  // string instead of JSX will result in an element with the string as innerHTML

  let JSXAlone = JSXAloneJson as any

  function render<T= any>(impl: 'json' | 'string' | 'dom', f: () => JSX.Element): T {
    JSXAlone = impl === 'dom' ? JSXAloneDom : impl === 'string' ? JSXAloneString : JSXAloneJson
    const jsx = f()
    const result = JSXAlone.render(jsx)
    return result as any
  }

  const arr = (a: number = number(10, 20), b = a) => new Array(Math.trunc(number(a, b) || 1)).fill(0)
  const string = (length: number = number(10, 20)) => arr(length / 5 + 1).map(i => Math.random().toString(36).substr(2, 5)).reduce((a, b) => a.concat(b))
  const words = (wordCount = number(10, 20), wordLength = number(5, 10), wordCountB = wordCount, wordLengthB = wordLength) => arr(wordCount, wordCountB).map(i => string(number(wordLength, wordLengthB)))
  const number = (a = 10, b = a) => Math.floor(Math.random() * b) + (a === b ? 0 : a)

  const C = (props: { label: string }) => <div className="content"><h2>{props.label}</h2>
    <div>test {string(3)} "{words(2, 5, 4, 10)}"</div>
    <ul>{arr(PEOPLE_COUNT, PEOPLE_COUNT * 2).map(i =>
      <li>Name: <strong> "{words(2, 2, 4, 10).join(' ')}"</strong>. Age: "{number(100)}". Answer: <i>"{words(WORD_COUNT, 2, WORD_COUNT * 2, 14).join('   ')}"</i></li>)}
    </ul>

  </div>

  let t0 = Date.now()
  const s = render('string', () => <C label="I once was a string, because JSXAlone string impl was used" />)
  const stringTime = Date.now() - t0
  t0 = Date.now()
  const json = render('json', () => <C label="I wasn't a string nor a DOM element since they used the json impl" />)
  const jsonTime = Date.now() - t0
  t0 = Date.now()
  const el = render<HTMLElement>('dom', () => <C label={'I was born being a DOM element, this is the proof: ' + JSON.stringify(self.performance.toJSON())} />)
  const domTime = Date.now() - t0

  // At this point we need to restore the original implementation in order to
  // declare Elements that the test environment expect (which is the json one)
  JSXAlone = JSXAloneJson as any

  return <div className="content">
    <h1>Rendering different implementations</h1>
    <p>Well, here we have three components that were rendered using the three implementations, in this same page. Timings:  </p>
    <ul>
      <li>String: {stringTime}ms.</li>
      <li>DOM: {domTime}ms.</li>
      <li>JSON: {jsonTime}ms.</li>
    </ul>
    <ul>
      <li style={{ height: '400px', overflow: 'scroll' }}><h3>String</h3> {s.length + 'bytes'} - we use dangerouslySetInnerHTML to render the string output here.
        <div>{s}</div>
      </li>
      <li style={{ height: '400px', overflow: 'scroll' }}><h3>DOM</h3> {el.outerHTML.length + 'bytes'} -DOM impl currently don't work because examples run in a webworker with has no DOM:
        <div>{el.outerHTML}</div>
      </li>
      <li style={{ height: '400px', overflow: 'scroll' }}><h3>JSON</h3>: we use JSON.stringify() to print the JSON output:
        <pre>{JSON.stringify(json)}</pre>w
      </li>
    </ul>
  </div>
}
