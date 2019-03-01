import { RenderConfig } from 'jsx-alone-core'
import { ElementLikeImpl } from './elementImpl'

export interface ElementLikeImplRenderConfig extends RenderConfig<string, ElementLikeImpl > {
  indent?: boolean
  indentLevel?: number
  indentTabSize?: number
}

export const defaultRenderConfig: ElementLikeImplRenderConfig = { indentLevel: 0, indentTabSize: 2, indent: true }
