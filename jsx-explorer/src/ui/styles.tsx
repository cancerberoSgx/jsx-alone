import { ClassRule, Style, Styles as S } from 'jsx-alone-core';
import { ElementClass, JSXAlone } from 'jsx-alone-dom';
import { Theme } from '../store/types';
import { registerThemeOverrideStyles } from '../theme';
import { darkCss } from './darkCss';
import { lightCss } from './lightCss';

let _styles: { [k: string]: ClassRule} = {}

export function registerStyle(s: { [k: string]: ClassRule}) {
  Object.keys(s).forEach(k=>_styles[k]={..._styles[k], ...s[k]})
}
export class Styles extends ElementClass<{theme: Theme}> {
  render() {
    registerThemeOverrideStyles(this.props.theme)
    const { styles, classes } = S(_styles)

    return  <div>
      {this.props.theme.name==='dark' && <style dangerouslySetInnerHTML={{__html: darkCss}}></style>}
      {this.props.theme.name==='light' && <style dangerouslySetInnerHTML={{__html: lightCss}}></style>}
      <Style classes={styles}/>
    </div>
  }
}
