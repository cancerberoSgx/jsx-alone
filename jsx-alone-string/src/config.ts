import { RenderConfig } from 'jsx-alone-core';

export interface ElementLikeImplRenderConfig extends RenderConfig {
  indent?: boolean;
  indentLevel?: number;
  indentTabSize?: number;
  /** render also the required utilities ClientCode registered by custom utilities. It will be rendered once, before the given root element */
  renderClientCode?: boolean;
  /** render() and createElement(), by default will set ids to DOM elements and build a association between ids and ElementLike nodes so function attributes (event handlers) can easily find the context node from the js code. This happens only on the client-side, should not have significant impact on performance or size but it can be disabled setting it to false. Event handlers won't have access to its Node, or Component instance.*/
  disableDomIdsAssociation?: boolean;
}

export const defaultRenderConfig: ElementLikeImplRenderConfig = { indentLevel: 0, indentTabSize: 2 };
