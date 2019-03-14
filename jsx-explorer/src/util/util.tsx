export function query<T extends HTMLElement= HTMLElement>(s: string): T {
  return document.querySelector<T>(s)!
}
export function queryAll<T extends HTMLElement= HTMLElement>(s: string): T[] {
  return Array.from(document.querySelectorAll<T>(s))
}

export function escapeHtml(html: string) {
  return html.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').trim()
}

export function shorter(s: string, l = 20) {
  s = typeof s !== 'string' ? (s + '') : s
  const postFix = s.length > l ? '...' : ''
  return `"${s.trim().substring(0, Math.min(s.length, l))}${postFix}"`
}

export function tryTo<F extends (...args: any[]) => any>(f: F): ReturnType<F> | undefined {
  try {
    return f()
  } catch (error) {
  }
}


export function getEnumKey(anEnum: any, value: any): string {
  for (const key in anEnum) {
    if (value === anEnum[key]) {
      return key
    }
  }
  return ''
}


export function enumKeys<T=string>(anEnum: any): T[] {
  const a = []
  for (let i in anEnum) {
    a.push(i)
  }
  return a as any
}

export function keys<T extends string>(o: Partial<{[k in T]: any}>): T[] {
  return Object.keys(o) as T[]
}
// // TODO: import misc

// export type ValueOfStringKey<T extends {
// 	[k: string]: any
	
// }, K extends string> = T[K]
// export type StringKeyOf<T extends any> = Extract<keyof T, string>;

// /** NameOfStringKeyInArray<[{f: 1}, {f: 2}], 'f'>  will be 1|2 */
// export type ValueOfStringKeyInArray<a extends any[], k extends string> = ValueOfStringKey<UnionOf<a>, k>;

// /** NameOfStringKeyInArray<[{f: 1}, {f: 2}], 'f'>  will be 1|2 */
// export type StringKeyInArray<a extends any[]> = StringKeyOf<UnionOf<a>>;

// /**
//  * Creates a union from the types of an Array or tuple
//  */
// export type UnionOf<T extends any[]> = T[number];

// export type arrayItemKeyUnion<T extends any[]> = keyof T[arrayIndexUnion<T>];

// export type arrayIndexUnion<T extends any[], K extends Exclude<keyof T, keyof []> = Exclude<keyof T, keyof []>> = T extends {
// 	[k in K]: any;
// } ? K : never;
