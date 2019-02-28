import { JSXAlone } from '..'
import { test } from './testUtil'

describe('attributes', () => {
  test({
    label: 'style',
    e: <p style={{border: '1 px solid pink'}}>hs you</p>,
    expected: "<p style=\"border: 1 px solid pink\">hs you</p>"
  })

  test({
    label: 'className',
    e: <p className="foo">g<span className={['s','d'].join(' ')}>s</span>g</p>,
    expected: "<p class=\"foo\">g<span class=\"s d\">s</span>g</p>"
  })
})
