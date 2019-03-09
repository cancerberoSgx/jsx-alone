import {Document} from '../document'
import { checkNoDom } from './testUtil';

describe('jsx-alone-dom', () => {
  checkNoDom()
  it('watermark', () => {
    expect(Document._WATERMARK).toBe('jsx-alone-dom-dom')
  })
  it('should render', () => {
    const d = new Document()
    expect(d.head.tagName).toBe('head')
  })
})
