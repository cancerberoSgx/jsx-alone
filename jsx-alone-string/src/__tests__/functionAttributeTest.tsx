import { JSXAlone } from '..';
import { test } from './testUtil';
import { renderInDom, query, elSpyTimes, elSpy } from "./testUtilDom";

describe('function attributes', () => {

  describe('output', () => {
  test({
    label: 'intrinsic element',
    e: <button onClick={e => { alert('click') }}>click</button>,
    expected: `<button onClick="(function (e) { alert('click'); }).apply(_this=this,arguments)">click</button>`,
    asCodeEquals: true,
  })


  const f1 = (props: { name: string }) => <button onClick={e => {
    alert(props.name)
  }}>gg</button>

  test({
    label: 'function element accessing this',
    e: f1({ name: 'hello' }),
    expected: `<button onClick="(function (e) { alert(props.name); }).apply(_this=this,arguments)">gg</button>`,
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


describe('should work in the browser', () => {
  
  renderInDom(<button id="b1" onClick={elSpy}>click</button>)
  const b = query('#b1')
  expect(elSpyTimes(b)).toBe(0)
  b.click()  
  expect(elSpyTimes(b)).toBe(1)
})

})
