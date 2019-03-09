export function getGlobal(): any {
  // @ts-ignore
  return typeof self !== 'undefined' && typeof self.onmessage === 'object' ? self : global
}