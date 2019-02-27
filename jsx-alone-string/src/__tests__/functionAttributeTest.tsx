import { JSXAlone } from '..';
import { test } from './testUtil';

describe('function attributes', () => {

  test({
    label: 'intrinsic element',
    e: <button onClick={e => { alert('click') }}>click</button>,
    expected: `<button onClick="function (e) { alert('click'); }">click</button>`,
    asCodeEquals: true,
  })


  const f1 = (props: { name: string }) => <button onClick={e => {
    alert(props.name)
  }}>gg</button>

  test({
    label: 'function element accessing this',
    e: f1({ name: 'hello' }),
    expected: `<button onClick="function (e) { alert(props.name); }">gg</button>`,
    asCodeEquals: true
  })




  async function loginService(): Promise<boolean> { return true }
  const LoginButton = (props: { clicked: (success: boolean) => void, label: string }) =>
    <button onClick={async e => {
      const success = await loginService()
      props.clicked(success)
    }}>
      {props.label}</button>
  test({
    label: 'async function element',
    e: <LoginButton clicked={success => alert(success)} label="login"></LoginButton>,
    expected: `<button onClick="`,
    asCodeContains: true
  })

})
