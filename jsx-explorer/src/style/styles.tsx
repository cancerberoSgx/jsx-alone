import { ClassRule, Style, Styles as S } from 'jsx-alone-core';
import { JSXAlone } from 'jsx-alone-dom';
import { Theme } from '../store/types';
import { Component } from '../ui/util/component';
import { darkCss } from './darkCss';
import { globalStyles } from './globals';
import { lightCss } from './lightCss';
import { mintyCss } from './mintyCss';

let _styles: { [k: string]: ClassRule} = {}

let stringStyle = ``

export function registerStyle(s: { [k: string]: ClassRule}|string) {
  if(typeof s === 'string'){
    stringStyle+=`\n${s
      .split('\n').filter(l=>!l.trim().startsWith('//')).join('\n')
    }`
  }
  else {
    Object.keys(s).forEach(k=>_styles[k]={..._styles[k], ...s[k]})
  }
}

export class Styles extends Component<{theme: Theme}> {
  render() {
    const { styles, classes } = S(_styles)
    registerStyle(globalStyles)
    return  <div>
      {this.props.theme.name==='dark' && <style dangerouslySetInnerHTML={{__html: darkCss}}></style>}
      {this.props.theme.name==='light' && <style dangerouslySetInnerHTML={{__html: lightCss}}></style>}
      {this.props.theme.name==='minty' && <style dangerouslySetInnerHTML={{__html: mintyCss}}></style>}

      <Style classes={styles}/>
      <style dangerouslySetInnerHTML={{__html: stringStyle}}></style>
    </div>
  }
}

