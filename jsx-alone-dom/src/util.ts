
export function emptyAllChildren(e: Element) {
  Array.from(e.children).forEach(c => { emptyAllChildren(c); e.removeChild(c) })
  e.innerHTML = ''
}

export function isSvgTag(t: string) {
  const r = new RegExp(`^${t}$`, 'i')
  return SvgTags.some(name => r.test(name))
}
const SvgTags = ['path', 'svg', 'use', 'g']

export function printStyleHtmlAttribute(value: any): any {
  return `${Object.keys(value)
    .map(p => `${p}: ${value[p]}`)
    .join('; ')}`
}
