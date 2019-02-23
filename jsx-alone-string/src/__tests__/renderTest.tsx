import { ReactLike } from '..'

describe('render', () => {
  function test({ e, expected, label }: { e: JSX.Element; expected: string; label: string }) {
    it(label, () => {
      const output = ReactLike.render(e)
      expect(output).toBe(expected)
    })
  }
  test({
    label: 'should render element without children',
    e: <div></div>,
    expected: '<div></div>',
  })

  test({
    label: 'should render text child',
    e: <p>hello1</p>,
    expected: `<p>hello1</p>`,
  })

  test({
    label: 'should render text children',
    e: <p>hello world</p>,
    expected: `<p>hello world</p>`,
  })
})
