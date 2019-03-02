import { Theme } from './store/types'
import { ClassRule } from 'jsx-alone-core'
import { registerStyle } from './ui/styles';

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    bg: '#1e1e1e',
    fg: '#d4d4d4'
  }
}

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    bg: 'white',
    fg: 'black'
  }
}

/** return css to override default bulma's values to match with current theme */
export function registerThemeOverrideStyles(theme_: Theme) {
  // const theme: ClassRule = {
  //   // color: `${theme_.colors.fg} !important`,
  //   // backgroundColor: `${theme_.colors.bg} !important`,
  //   // borderColor: `${theme_.colors.fg} !important`,
  //   color: `${theme_.colors.fg}`,
  //   backgroundColor: `${theme_.colors.bg}`,
  //   borderColor: `${theme_.colors.fg}`,
  // }
  // const themeImportant: typeof theme ={}
  // Object.keys(theme).forEach(p=>themeImportant[p as any]=theme[p as any]+'!important')

//   const classStyles = {
//     'section': theme,
//     'container': theme,
//     'subtitle': theme,
//     'column': theme,
//     'title': theme,
//     'columns': theme,
//     'navbar': theme,
//     'navbar-brand': theme,
//     'navbar-item': theme,
//     'navbar-burger': theme ,
//     'navbar-start': theme ,
//     'navbar-link': theme ,
//     'navbar-menu': theme ,
//     'navbar-dropdown': themeImportant ,
//     'navbar-divider': theme ,
//     'navbar-end': theme ,
//     'burger': theme
// }
// registerStyle(classStyles)
  // return classStyles

}

// registerStyle(getThemeOverrideStyles(getThemeOverrideStyles())