import { BackgroundColorProperty, BackgroundImageProperty, FontWeightProperty, LineHeightProperty, TextDecorationColorProperty, TextDecorationStyleProperty, TextTransformProperty, CSSProperties } from 'jsx-alone-core';
import { Color, FontFamily, Size } from '../../../store/types';
import { ClassName } from './classesData';


export type JsxColorsTools = 'skins' | 'editor';

export interface JsxColorsState {
  predefined: JsxSyntaxSkin[];
  selected?: JsxSyntaxSkin;
  // tool: JsxColorsTools;
}

export interface Base<Name extends string = string> {
  name: Name;
  description?: string;
}

// TODO: replace these anames with classesData
// export type  JsxSyntaxSkin =  {[a in keyof typeof ClassName]:SyntaxSkinProperty}&Base
export type  JsxSyntaxSkin =  Partial<{[a in keyof typeof ClassName]:SyntaxSkinProperty}>&Base 

// export interface JsxSyntaxSkin extends Base {

//   [a keyof typeof ClassName]: SyntaxSkinProperty

//   // text?: SyntaxSkinProperty;
//   // tagName?: SyntaxSkinProperty
//   // attributeName?: SyntaxSkinProperty
//   // attrEquals?: SyntaxSkinProperty;
//   // expressionBraces?: SyntaxSkinProperty;
//   // openingElement?: SyntaxSkinProperty;
//   // closingElement?: SyntaxSkinProperty;
//   // selfClosingElement?: SyntaxSkinProperty;
// }


export interface SyntaxSkinProperty extends CSSProperties{
}






//  {
//   foreground?: Color;
//   fontFamily?: FontFamily;
//   fontSize?: Size;
//   lineHeight?: LineHeightProperty<number>
//   backgroundImage?: BackgroundImageProperty
//   backgroundColor?: BackgroundColorProperty
//   textDecorationStyle?: TextDecorationStyleProperty
//   textDecorationColor?: TextDecorationColorProperty
//   fontWeight?: FontWeightProperty
//   italic?: TextTransformProperty
// }




// enum TextDecorationStyle {
//   'blink' = 'blink',
//   'dotted' = 'dotted',
//   'double' = 'double',
//   'line-though' = 'line-though',
//   'overline' = 'overline',
//   'dashed' = 'dashed',
//   'underline' = 'underline'
//   //   text-decoration: double;
//   //   text-decoration-color: #ba1e8f;
//   //   text-decoration-style: solid;
//   //   text-decoration-line: overline;
// }


