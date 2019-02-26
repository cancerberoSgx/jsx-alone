import { RenderConfig } from 'jsx-alone-core';

export interface ElementLikeImplRenderConfig extends RenderConfig {
  parent?: HTMLElement,
  dontAddEventListeners?: boolean
  initialContext?: any
}

// export const defaultRenderConfig: ElementLikeImplRenderConfig = { 
// };
