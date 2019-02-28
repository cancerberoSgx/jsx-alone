import { JSXAloneJsonImpl as JSXAlone } from '../JsonImpl'
import { ClassRule, Styles, Style, installJSXAloneAsGlobal } from '..'

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
    const { styles, classes } = Styles({ field, primaryField, messageFromRedirect })

    const App = (props: { msg: string }) => <div>
      <Style classes={styles}></Style>
      <p className={classes.messageFromRedirect}>{props.msg}</p>
      <div className={classes.field}>field</div>
      <div className={classes.primaryField}>primaryField</div>
    </div>

    const s = JSXAlone.render(<App msg="hello"></App>)

    // console.log(JSON.stringify(s, null, 2))
    expect(s).toEqual({
      "tag": "div",
      "attrs": {},
      "children": [
        {
          "tag": "style",
          "attrs": {},
          "children": [{
            "content": ".field td {\nborder: 1px solid #aaaaaa;\npadding: 2px;\n}\n.primaryField td {\nborder: 1px solid #ededed;\npadding: 2px;\nfont-size: 0.95em;\n}\n.messageFromRedirect {\nborder: 2px solid green;\n}"
          }]
        },
        { "tag": "p", "attrs": { "className": "messageFromRedirect" }, "children": [{ "content": "hello" }] },
        { "tag": "div", "attrs": { "className": "field" }, "children": [{ "content": "field" }] },
        { "tag": "div", "attrs": { "className": "primaryField" }, "children": [{ "content": "primaryField" }] }]
    }
    )


  })
})
