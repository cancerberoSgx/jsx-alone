import { Page } from 'puppeteer';


export async function expectElement(page: Page, selector: string, text?: string, negate=false) {
  const r = await page.evaluate((selector) => {
    const e = document.querySelector(selector);
    return e ? e.outerHTML : undefined;
  }, selector);
  negate ? expect(r).not.toBeDefined() : expect(r).toBeDefined();
  if (r && text && !negate) {
    expect(r.toLowerCase()).toContain(text.toLowerCase());
  }
  if(negate){
    expect(!r ||!text||!r.toLowerCase().includes(text.toLowerCase())).toBe(true)

  }
}

export function expectNotExist(page: Page, selector: string, text?: string) {
return expectElement(page, selector, text, true)
}

// export async function expectSelect(page: Page, selector: string) {
//   const r = await page.evaluate((selector) => {
//     const e = document.querySelector(selector)
//     return  e&&e.select ?e.select() : undefined
//   }, selector);
//   if(!r){
//     return fail('Expected element '+selector+' to be defined or selectable')
//   }
// }



export async function clearText(page: Page, selector: string) {
  await selectAll(page, selector)
  await page.keyboard.press('Backspace');
}

export async function selectAll(page: Page, selector: string) {
  await expect(page).toClick(selector);
  await page.keyboard.down('Control');
  await page.keyboard.press('a');
  await page.keyboard.up('Control');
}
 

export async function enter(page: Page, selector: string, text: string,ignoreExceptions=false) {
    await expect(page).toClick(selector);
     await Promise.all(text.split('').map(async c=>{
       return await page.keyboard.press(c, { delay: 100 })}))
}

export function wait(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}