import { CSSProperties } from 'jsx-alone-core';
import { ClassName } from './classesData';

export type JsxColorsTools = 'skins' | 'editor';

export interface JsxColorsState {
  predefined: JsxSyntaxSkin[];
  selected?: JsxSyntaxSkin;
  selectedSkinCurrentStyles?: JsxColorsSkinStyles
}

export interface JsxColorsSkinStyles {
  styles: string,
}

export interface Base<Name extends string = string> {
  name: Name;
  description?: string;
}

export type JsxSyntaxSkin = Partial<{ [a in keyof typeof ClassName]: SyntaxSkinProperty }> & Base

export interface SyntaxSkinProperty extends CSSProperties {
}
