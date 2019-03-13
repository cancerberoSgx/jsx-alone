import { Page } from 'puppeteer';

export async function expectElement(page: Page, selector: string, text?: string, negate = false, mode: 'asCodeIncludes' | undefined = undefined) {
  const r = await page.evaluate((selector) => {
    const e = document.querySelector(selector)
    return e ? e.outerHTML : undefined
  }, selector)
  if (negate && r) {
    throw new Error(`Expected ${r} to be undefined`)
  }
  if (!negate && !r) {
    throw new Error(`Expected ${r} to be defined`)

  }
  // negate ? expect(r).not.toBeDefined() : expect(r).toBeDefined()
  if (text) {
    const a = mode === 'asCodeIncludes' ? r.toLowerCase().replace(/\s+/g, ' ') : r.toLowerCase()
    const b = mode === 'asCodeIncludes' ? text.toLowerCase().replace(/\s+/g, ' ') : text.toLowerCase()
    if (r && text && !negate) {
      expect(a).toContain(b)
    }
    if (negate) {
      expect(!r || !text || !a.includes(b)).toBe(true)
    }
  }
}

export async function expectNotExist(page: Page, selector: string, text?: string) {
  return await expectElement(page, selector, text, true)
}

export async function expectClick(page: Page, selector: string, text?: string) {
  await expectElement(page, selector, text)
  await page.click(selector)
}

export async function clearText(page: Page, selector: string) {
  await selectAll(page, selector)
  await page.keyboard.press('Backspace')
}

export async function selectAll(page: Page, selector: string) {
  await expect(page).toClick(selector)
  await page.keyboard.down('Control')
  await page.keyboard.press('a')
  await page.keyboard.up('Control')
}


export async function enter(page: Page, selector: string, text: string, ignoreExceptions = false) {
  await expect(page).toClick(selector)
  await Promise.all(text.split('').map(async c => {
    return await page.keyboard.press(c, { delay: 100 })
  }))
}

export function wait(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms);
  });
}