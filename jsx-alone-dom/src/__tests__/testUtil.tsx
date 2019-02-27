import { JSXAlone } from '..'
import { removeWhites } from 'jsx-alone-core'

export function test({
  e,
  expected,
  label,
  asCodeEquals,
  caseInsensitive
}: {
  e: JSX.Element
  expected: string
  label: string
  asCodeEquals?: boolean
  caseInsensitive?: boolean
}) {
  it(label + ' without indent', () => {
    const output: HTMLElement = render(e)
    expected = caseInsensitive ? expected.toLowerCase() : expected
    const result = caseInsensitive ? output.outerHTML.toLowerCase() : output.outerHTML
    if (asCodeEquals) {
      expectTextEquals(result, expected)
    } else {
      expect(result).toBe(expected)
    }
  })
}

export function render(e: JSX.Element) {
  let parent = document.getElementById('test-root')
  if (parent) {
    parent.remove()
  }
  parent = document.createElement('div')
  parent.setAttribute('id', 'test-root')
  document.body.appendChild(parent)
  return JSXAlone.render(e, { parent }) as HTMLElement
}


export function expectTextEquals(a?: string, b?: string, debug = false) {
  debug && console.log(a, b)
  if (!a || !b) return false
  expect(removeWhites(a)).toEqual(removeWhites(b))
}
export function expectTextToContain(a?: string, b?: string, debug = false) {
  debug && console.log(a, b)
  if (!a || !b) return false
  expect(removeWhites(a)).toContain(removeWhites(b))
}
export function expectTextNotToContain(a?: string, b?: string, debug = false) {
  debug && console.log(a, b)
  if (!a || !b) return false
  expect(removeWhites(a)).not.toContain(removeWhites(b))
}



let _unique: number = 0
export function unique(prefix: string='_'): string {
  return prefix+_unique++
}
export function window(): typeof window &any{
  return window
}
export function query<T extends HTMLElement=HTMLElement>(s: string): T {
  return document.querySelector<T>(s)!
}
