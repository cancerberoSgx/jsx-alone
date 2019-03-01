import { JSXAlone  } from '..'
import {ClassRule , Styles, Style, installJSXAloneAsGlobal} from 'jsx-alone-core'
import { expectTextToContain } from './testUtil'

installJSXAloneAsGlobal(JSXAlone)

describe('style', () => {
  it('simple', () => {
    expect(1).toBe(1)

    const field: ClassRule = {
      selectorPostfix: ' td',
      border: '1px solid #aaaaaa',
      padding: '2px'
    }
    const primaryField: ClassRule = {
      ...field,
      fontSize: '0.95em',
      border: '1px solid #ededed'
    }
    const messageFromRedirect: ClassRule = {
      border: '2px solid green'
    }
    const { styles, classes } = Styles({  field,   primaryField, messageFromRedirect})

    const App = (props: {msg: string}) => <div>
      <Style classes={styles}></Style>
      <p className={classes.messageFromRedirect}>{props.msg}</p>
      <div className={classes.field}>field</div>
      <div className={classes.primaryField}>primaryField</div>
      </div>

    const s = JSXAlone.render(<App msg="hello"></App>)
    expectTextToContain(s, `
      <div>
      <style>
        .field td {
    border: 1px solid #aaaaaa;
    padding: 2px;
    }
    .primaryField td {
    border: 1px solid #ededed;
    padding: 2px;
    font-size: 0.95em;
    }
    .messageFromRedirect {
    border: 2px solid green;
    }
      </style><p class="messageFromRedirect">
        hello
      </p><div class="field">
        field
      </div><div class="primaryField">
        primaryField
      </div>
    </div>
      `)

  })
})
