import { JsxColorSkins } from './JsxColorSkins';
import { JsxSyntaxSkin } from './jsxColorsTypes';

export const jsxColorSkins: JsxSyntaxSkin[] = [
  {
    name: 'crazy',
    description: 'first toy',
    JsxTagName: {
      backgroundColor: '#00ff00',
      color: '#2233ff',
      fontSize: '1.4em',
      fontWeight: 'bolder'
    },

    JsxText: {
      opacity: 0.6,
      fontSize: '1.1em',
      color: '#ee9911'
    }
  },
  
  {
    name: 'Mojigata', 
    description: 'second one just for have a second',
    JsxTagName: {
      backgroundColor: '#0000ff',
      color: '#44ff11',

      fontSize: '1em',
    },
    JsxText: {
      color: '#9911aa',
      fontFamily: 'courier monospace',
      backgroundColor: 'yellow'
    },
    // attributeName: {

    //   color: '#f08c36'
    // }
  }
]