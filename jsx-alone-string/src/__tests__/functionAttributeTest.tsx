import { JSXAlone } from '..';
import { test } from './testUtil';

describe('function attributes', () => {

  test({
    label: 'intrinsic element',
    e: <button onClick={e=>{alert('click')}}>click</button>,
    expected: `<button onClick="function (e) { alert('click'); }">click</button>`,
    asCodeEquals: true,
  })

  
  const f1 = (props: {name: string}) => <button onClick={e=>{
    alert(props.name)
  }}>gg</button>

  test({
    label: 'function element accessing this',
    e: f1({name: 'hello'}),
    expected: `<button onClick="function (e) { alert(props.name); }">gg</button>`,
    asCodeEquals: true
  })

})
