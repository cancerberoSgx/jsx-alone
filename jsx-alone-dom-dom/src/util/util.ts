
export function getGlobal(): any {
  return (typeof self !== 'undefined' && typeof self.onmessage === 'object') ? self : (typeof document!=='undefined' && typeof window !== 'undefined') ? window : global
}

// export function array<T = number>(n: number, sample?: T): T[] {
//   const a: (T | number)[] = []
//   for (let i = 0; i < n; i++) {
//     a.push(typeof sample === 'undefined' ? i : sample)
//   }
//   return a as T[]
// }
// export function repeat(n: number, s: string): string {
//   return array(n, s).join('')
// }
// export function indent(i: number = 1, tabSize = 2): string {
//   return repeat(i * tabSize, ' ')
// }