import { JSXAlone } from '..'
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
    label: 'style',
    e: <p style={{border: '1 px solid pink'}}>hs you</p>,
    expected: "<p class=\"border: 1 px solid pink\">hs you</p>"
  })

  test({
    label: 'className',
    e: <p className="foo">g<span className={['s','d'].join(' ')}>s</span>g</p>,
    expected: "<p class=\"foo\">g<span class=\"s d\">s</span>g</p>"
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
