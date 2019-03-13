
export function width() {
  return document.body.clientWidth
}

export function height() {
  return window.screen.height
}

export function isMobile() {
  return width() < 768
}

export function isTablet() {
  return width() >= 768 && width() < 1023
}

export function isDesktop() {
  return width() >= 1023
}

export function onDesktop(s: string) {
  return `
@media (min-width: 1023px) {
  ${s.trim()}
}`.trim()
}

export function css(sel: string, s: string, ds?: string) {
  return `
${sel.trim()} {
  ${s.trim()}
}
${ds ? `
@media (min-width: 768px) {
  ${sel.trim()} {
    ${ds.trim()}
  }
}`.trim() : ''}
  `.trim()
}
