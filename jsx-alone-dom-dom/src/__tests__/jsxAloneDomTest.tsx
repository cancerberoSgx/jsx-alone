import {Document} from '../document'
import { checkNoDom } from './testUtil'
import {JSXAlone} from 'jsx-alone-dom'
import { install } from '../install';

describe('jsx-alone-dom', () => {
  checkNoDom()

  it('should render', () => {
    install()
    const c = <p>1</p>
    const r = JSXAlone.render(c)
  })
})
