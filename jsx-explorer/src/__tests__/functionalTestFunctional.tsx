import { clearText, expectElement, enter, wait } from './testUtil';

describe('basic - jest-puppeteer', () => {

  beforeAll(async () => {
    page.setDefaultNavigationTimeout(10000)
    jest.setTimeout(10000)
    await page.goto('http://localhost:8080/');
  });

  it('should show Elements explorer by default', async () => {
    await expectElement(page, '.elements.is-active', 'Elements')
    await expectElement(page, '.elements.is-active', 'Elements')
  })

  it('should should show editor on one side', async () => {
    await expectElement(page, '#editorContainer', 'function')
  })
 
  it('should clear text text', async () => {
    
    try {
      await page.screenshot({ path: './tmp/test1.png' })
      await wait(2000) 
    await clearText(page, '#editorContainer')
    await page.screenshot({ path: './tmp/test2.png' }) 
  } catch (error) {
    console.log(error  ); 
  }
  })

  it('should wait until explorer renders', async () => {
    
    // await page.waitFor('.editorExplorerBodyMember.elements .explorer .button')
    
    try { 
      await wait(2000) 
      await enter(page,  '#editorContainer', 'a', true )
      await wait(2000)
      await page.screenshot({ path: './tmp/test3.png' })
    } catch (error) {
      console.log(error  );
      
    }
      // await page.keyboard.type('#editorContainer', 'function test(){ return <p>hello</p>; }')
  
   

    // await clearText(page, '#editorContainer')
    // await page.screenshot({path: './tmp/test2.png'})

  })
})

