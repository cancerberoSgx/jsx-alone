
export function getGlobal(): any {
  return typeof self !== 'undefined' && typeof self.onmessage === 'object' ? self : global
}

