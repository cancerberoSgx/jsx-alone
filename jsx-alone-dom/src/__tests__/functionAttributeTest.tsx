import { JSXAlone } from '..'
import { test } from './testUtil'

describe('function attributes', () => {

  test({
    label: 'intrinsic element',
    e: <button onClick={e=>{alert('click')}}>click</button>,
    expected: `<button onclick="_this = __this__ = this; (function (e) { alert('click'); }).apply(_this, arguments)">click</button>`,
    asCodeEquals: true,
    caseInsensitive: true
  })

  
  const f1 = (props: {name: string}) => <button onClick={e=>{
    alert(props.name)
  }}></button>
  test({
    label: 'function element accessing this',
    e: f1({name: 'hello'}),
    expected: `<button onclick="_this = __this__ = this; (function (e) { alert(props.name); }).apply(_this, arguments)"></button>`,
    asCodeEquals: true,
    caseInsensitive: true
  })

})
