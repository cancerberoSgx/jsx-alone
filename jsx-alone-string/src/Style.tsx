import {indent as indentImpl} from 'jsx-alone-core'

import { JSXAlone } from './createElement'
import { ElementLikeImplRenderConfig } from './config';


/** Render the <style> tag with all classes and styles inside. Usage example: 
```
const fieldTable: ClassRule = {
  selectorPostfix: ' td',
  border: '1px solid #aaaaaa',
  padding: '2px'
}
const sublistFieldTable: ClassRule = {
  ...fieldTable,
  fontSize: '0.95em',
  border: '1px solid #ededed'
}
const messageFromRedirect: ClassRule = {
  border: '2px solid green'
}
const { styles, classes } = Styles({ fieldTable, sublistFieldTable, messageFromRedirect})
return <div>
  <Style classes={styles}></Style>
  <p className={classes.messageFromRedirect}>{props.msg}</p>
    ```
*/
export const Style = (props: StyleProps) => {
  function indent(n: number): string {
    return props.renderConfig && props.renderConfig.indent ? indentImpl(n) : ''
  }
  function fixProperty(s:string):string{
    var t
    while (t =  /([A-Z])/.exec(s)) {
        s= s.substring(0, t.index)+'-'+t[1].toLowerCase()+s.substring(t.index+1, s.length)
    }
    return s;
  }
  return <style>{Object.keys(props.classes).map(c =>
    `${indent(1)}.${c}${(props.classes[c] && props.classes[c].selectorPostfix ? props.classes[c].selectorPostfix : '')} {${Object.keys(props.classes[c]).filter(p=>p!=='selectorPostfix').map(p =>`
${indent(2)}${fixProperty(p)}: ${props.classes[c][p as any]};`
).join(``)}
}`).join('\n')}
  </style>
}


/** build a styles and classnames from a class styles mapped object so is easy to type-check classnames and use them . See `Style` for usage example */
export function Styles<T extends { [k: string]: ClassRule }>(styles: T): { styles: T, classes: { [k in keyof T]: k } } {
  const classes: any = {}
  Object.keys(styles).forEach(k => {
    classes[k] = k
  })
  return {
    styles, classes
  }
}

export type ClassRule = Partial<CSSStyleDeclaration> & { selectorPostfix?: string }
interface StyleProps {
  classes: { [name: string]: ClassRule },
  renderConfig?: ElementLikeImplRenderConfig
}