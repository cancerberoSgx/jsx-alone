import { JsxColorSkins } from './JsxColorSkins';
import { JsxSyntaxSkin } from './jsxColorsTypes';

export const jsxColorSkins: JsxSyntaxSkin[] = [
  {
    name: 'crazy',
    description: 'first toy',

    tagName: {
      backgroundColor: '#0f0',
      fontSize: '3em',
      fontWeight: 'bolder'
    },

    text: {
      opacity: 0.6,
      fontSize: '1.1em',
      color: '#ee9911'
    }
  },
  {
    name: 'Mojigata',
    description: 'second one just for have a second',
    tagName: {
      backgroundColor: '#0000ff',
      fontSize: '1em',
    },
    text: {
      fontFamily: 'courier monospace',
      backgroundColor: 'yellow'
    },
    attributeName: {

      color: '#f08c36'
    }
  }
]