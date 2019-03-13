import { clearText, expectElement, enter, wait, expectNotExist } from './testUtil';

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
 
  it('should wait until explorer renders', async () => {
    await page.screenshot({ path: './tmp/01-explorer1.png' })
    await page.waitForSelector('.explorer .media-content em')
    await expectElement(page, '.explorer .media-content em', 'className')
    await page.screenshot({ path: './tmp/01-explorer2.png' })
  })
    
  it('should clear text', async () => {
    await clearText(page, '#editorContainer')
    await wait(500)
    await page.screenshot({ path: './tmp/02-clear.png' }) 
    await expectNotExist(page, '.explorer .media-content em')
  })

  it('should enter new code', async () => {
    await enter(page,  '#editorContainer', `
import {JSXAlone} from './index'
function test() {
  return <p>Hello</p>
}
    `, true )
    await wait(3500)
    await page.screenshot({ path: './tmp/03-newCode1.png' }) 
    await page.waitForSelector('.explorer .media-content .textNodeContent')
    await expectElement(page, '.explorer .media-content .textNodeContent', '"Hello"')
    await page.screenshot({ path: './tmp/03-newCode2.png' }) 


  })


  it('should should show editor on one side', async () => {
    await expectElement(page, '#editorContainer', 'function')
  })
})

