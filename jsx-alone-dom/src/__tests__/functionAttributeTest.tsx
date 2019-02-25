import { JSXAlone } from '..'
import { test } from './testUtil'
//TODO: test function attributes scope in jsdom like dom-sample-project/eventHandlers
describe('function attributes', () => {

  test({
    label: 'intrinsic element',
    e: <button onClick={e=>{alert('click')}}>click</button>,
    expected: `<button>click</button>`,
    asCodeEquals: true,
    caseInsensitive: true
  })

  
  const f1 = (props: {name: string}) => <button onClick={e=>{
    alert(props.name)
  }}></button>
  test({
    label: 'function element accessing this',
    e: f1({name: 'hello'}),
    expected: `<button></button>`,
    asCodeEquals: true,
    caseInsensitive: true
  })

})
