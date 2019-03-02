import { ClassRule, Style, Styles as S } from 'jsx-alone-core';
import { ElementClass, JSXAlone } from 'jsx-alone-dom';
import { Theme } from '../store/types';
import { darkCss } from './darkCss';
import { lightCss } from './lightCss';
import { Component } from '../component';

let _styles: { [k: string]: ClassRule} = {}

export function registerStyle(s: { [k: string]: ClassRule}) {
  Object.keys(s).forEach(k=>_styles[k]={..._styles[k], ...s[k]})
}

export class Styles extends Component<{theme: Theme}> {
  render() {
    const { styles, classes } = S(_styles)

    return  <div>
      {this.props.theme.name==='dark' && <style dangerouslySetInnerHTML={{__html: darkCss}}></style>}
      {this.props.theme.name==='light' && <style dangerouslySetInnerHTML={{__html: lightCss}}></style>}
      <Style classes={styles}/>
    </div>
  }
}
