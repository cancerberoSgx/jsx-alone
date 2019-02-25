import { RenderConfig } from 'jsx-alone-core';

export interface ElementLikeImplRenderConfig extends RenderConfig {
  indent?: boolean;
  indentLevel?: number;
  indentTabSize?: number;
}

export const defaultRenderConfig: ElementLikeImplRenderConfig = { indentLevel: 0, indentTabSize: 2, indent: true };
