import { Page } from 'puppeteer';
export async function expectElement(page: Page, selector: string, text?: string) {
  const r = await page.evaluate((selector) => {
    const e = document.querySelector(selector);
    return e ? e.outerHTML : undefined;
  }, selector);
  expect(r).toBeDefined();
  if (r && text) {
    expect(r.toLowerCase()).toContain(text.toLowerCase());
  }
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
  // await page.keyboard.press('a', {text})
  try {
    
    await expect(page).toClick(selector);
      const PQueue = require('p-queue');
      const queue = new PQueue({ concurrency: 1 });
    await queue.addAll(text.split('').map(async c => async () => {
     await page.keyboard.press(c, { delay: 100 })
     await queue.onEmpty()
    }))
   } catch (ex) {
     if(ignoreExceptions){
       console.log(ex);
       
     }
     else {
      //  throw ex
     }
   }

  // s.split('').forEach(async c=>await page.keyboard.press(c))
}
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}