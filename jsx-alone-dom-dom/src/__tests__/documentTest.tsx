import { MDocument } from '../document'
import { install } from '../install';
import { testNoDom, expectNoDom } from './testUtil';

describe('jsx-alone-dom', () => {
  beforeAll(() => {
    expectNoDom()
    install()
  })
  it('watermark', () => {
    expect(MDocument._WATERMARK).toBe('jsx-alone-dom-dom')
  })
  it('should render', () => {
    const d = new MDocument()
    expect(d.head.tagName).toBe('head')
  })
})
