import { ReactLike } from '..'
import { test } from './testUtil'

describe('intrinsic elements', () => {
  test({
    label: 'element without children',
    e: <div />,
    expected: '<div></div>'
  })
  test({
    label: 'text child',
    e: <p>hello1</p>,
    expected: `<p>hello1</p>`
  })
  test({
    label: 'text children',
    e: <p>hello world how are you</p>,
    expected: `<p>hello world how are you</p>`
  })
  test({
    label: 'element children on any depth',
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
    expected: `<div><ul><li>one</li><li>two: <span>hi</span></li></ul></div>`
  })
})
