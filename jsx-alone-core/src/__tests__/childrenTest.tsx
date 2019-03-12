import { JSXAloneJsonImpl as JSXAlone, jsonImplOutputElAsHtml } from '../JsonImpl'

describe('childrenTest', () => {

  it('boolean true and non zero values should', () => {
    expect(jsonImplOutputElAsHtml(JSXAlone.render(<p>foo "{2}" bar "{true}" end</p>), -1)).toBe('<p>foo "2" bar "true" end</p>')
  })

  it('falsy values should not be printed', () => {
    expect(jsonImplOutputElAsHtml(JSXAlone.render(<p>Person "{null}" has "{undefined}" years "{0}" old "{''}" did you "{false}" know?</p>), -1)).toBe('<p>Person "" has "" years "" old "" did you "" know?</p>')
  })

})
