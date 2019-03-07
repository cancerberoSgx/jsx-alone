
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

export function emptyAllChildren(e: Element) {
  Array.from(e.children).forEach(c => { emptyAllChildren(c); e.removeChild(c) })
  e.innerHTML = ''
}
