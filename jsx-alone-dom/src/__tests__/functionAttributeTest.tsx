import { ReactLike } from '..'
import { ElementClass } from '../elementImpl'
import { test } from './testUtil'

describe('function attributes', () => {

  test({
    label: 'intrinsic element',
    e: <button onClick={e=>{alert('click')}}>click</button>,
    expected: `<button onClick=\"_this = __this__ = this; (e => { alert('click'); }).apply(_this, arguments)\">click</button>`,
    asCodeEquals: true,
    caseInsensitive: true
  })

  
  const f1 = (props: {name: string}) => <button onClick={e=>{
    alert(this.name)
  }}></button>
  test({
    label: 'function element accessing this',
    e: f1({name: 'hello'}),
    expected: `<button onClick=\"_this = __this__ = this; (e => {
      alert(this.name);
    }).apply(_this, arguments)\"></button>`,
    asCodeEquals: true,
    caseInsensitive: true
  })

})
