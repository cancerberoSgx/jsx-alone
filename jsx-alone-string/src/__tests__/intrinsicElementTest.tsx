import { ReactLike } from '..'
import { test } from './testUtil'

describe('intrinsic elements', () => {
  test({
    label: 'should render element without children',
    e: <div />,
    expected: '<div></div>',
    expectedTabSize2: `<div>
  
</div>`
  })
  test({
    label: 'should render text child',
    e: <p>hello1</p>,
    expected: `<p>hello1</p>`,
    expectedTabSize2: `<p>
  hello1
</p>`
  })
  test({
    label: 'should render text children',
    e: <p>hello world how are you</p>,
    expected: `<p>hello world how are you</p>`,
    expectedTabSize2: `<p>
  hello world how are you
</p>`
  })
  test({
    label: 'should render element children on any depth',
    e: (
      <div>
        <ul>
          <li>one</li>
          <li>
            two: <span>hi</span>
          </li>
        </ul>
      </div>
    ),
    expected: `<div><ul><li>one</li><li>two: <span>hi</span></li></ul></div>`,
    expectedTabSize2: `<div>
  <ul>
    <li>
      one
    </li><li>
      two: <span>
        hi
      </span>
    </li>
  </ul>
</div>`
  })
})

describe('functions', () => {
  let f = (props: { people: { name: string; age: number }[] }) => (
    <ul>
      {props.people.map(p => (
        <li>
          {p.name} has half of {Math.trunc(p.age / 2)} years old
        </li>
      ))}
    </ul>
  )
  test({
    label: 'should render element children on any depth',
    e: f({ people: [{ name: 'seba', age: 18 }, { name: 'laura', age: 33 }] }),
    expected: `<ul><li>seba has half of 9 years old</li><li>laura has half of 16 years old</li></ul>`
  })
})
