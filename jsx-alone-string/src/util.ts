import { ElementLikeImplRenderConfig } from './config';

  export function indent(config: ElementLikeImplRenderConfig) {
    const L = (config.indentLevel || 0) * (config.indentTabSize || 0);
    const a = [];
    for (let i = 0; i < L; i++) {
      a.push(' ');
    }
    return a.join('');
  }