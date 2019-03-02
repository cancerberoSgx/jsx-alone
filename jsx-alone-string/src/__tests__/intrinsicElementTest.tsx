import { JSXAlone } from '..'
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
    label: 'className attribute is class and should escape attributes "',
    e: <p className={'wr"on"g'}>"sd"</p>,
    expected: `<p class=\"wr&quot;on&quot;g\">\"sd\"</p>`
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
