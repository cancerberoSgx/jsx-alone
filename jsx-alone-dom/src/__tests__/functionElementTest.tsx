import { JSXAloneElement } from 'jsx-alone-core'
import { test } from './testUtil';
import { JSXAlone } from '..';

describe('functions', () => {
  let f1 = (props: { people: { name: string; age: number }[] }) => (
    <ul>
      {props.people.map(p => (
        <li>
          {p.name} has half of {Math.trunc(p.age / 2)} years old
        </li>
      ))}
    </ul>
  )

  // const a =  f1({ people: [{ name: 'seba', age: 18 }, { name: 'laura', age: 33 }] });
  test({
    label: 'should render element children on any depth',
    e: f1({ people: [{ name: 'seba', age: 18 }, { name: 'laura', age: 33 }] }),
    expected: `<ul><li>seba has half of 9 years old</li><li>laura has half of 16 years old</li></ul>`
  })

  let F2 = (props: { age: number; children: JSXAloneElement }) => (
    <div className="wrapper">
      {props.age}
      {props.children}
    </div>
  )
  test({
    label: 'render children programatically',
    e: (
      <F2 age={88}>
        <div>years old</div> text <span>hello</span>
      </F2>
    ),
    expected: `<div class=\"wrapper\">88<div>years old</div> text <span>hello</span></div>`
  })
})
