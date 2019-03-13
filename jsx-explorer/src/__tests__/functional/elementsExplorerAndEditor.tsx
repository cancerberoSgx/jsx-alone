import { clearText, expectElement, enter, wait, expectNotExist, expectClick } from '../testUtil';
import * as to from '../toHave/toHave'
export const c = to

describe('elements explorer', () => {

  beforeAll(async () => {
    page.setDefaultNavigationTimeout(10000)
    jest.setTimeout(10000)
    await page.setViewport({width: 1300, height: 900})
    await page.goto('http://localhost:8080/');
  });

  it('should show Elements explorer by default', async () => {
    // expect(false).toBe(true)
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
    await enter(page, '#editorContainer', `
import {JSXAlone} from './index'
function fooBarTest4() {
  return <p>Hello</p>
}
`, true)
    await page.screenshot({ path: './tmp/03-newCode1.png' })
    await expectElement(page, '#editorContainer', 'fooBarTest4')
    await wait(3500)
    await page.waitForSelector('.explorer .media-content .textNodeContent')
    await expectElement(page, '.explorer .media-content .textNodeContent', '"Hello"')
    await page.screenshot({ path: './tmp/03-newCode2.png' })
  }) 

  it('should show html output', async () => {
    await page.screenshot({ path: './tmp/04-outputHtml1.png' })
    // await expectNotExist(page, '#getHtmlCodeModalContent .html-code-container.html-code.is-active') 

    // await expect(page).not.toHave({
    //   selector:'#getHtmlCodeModalContent .html-code-container.html-code.is-active',
    // })

    // await expectElement(page, '.editorExplorerBodyMember.elements .explorer>.button', 'output html')
    await expect(page).toHave({
      selector:'.editorExplorerBodyMember.elements .explorer>.button',
      text: 'output html', 
      caseInsensitive: true
    })

    await expectClick(page, '.editorExplorerBodyMember.elements .explorer>.button', 'output html')
    await wait(500)
    await page.screenshot({ path: './tmp/04-outputHtml2.png' })

//     // await expect(page).toClick('.editorExplorerBodyMember.elements .explorer>.button')
//     // await page.screenshot({ path: './tmp/04-outputHtml3.png' })

//     // await page.click('.editorExplorerBodyMember.elements .explorer>.button', {button: 'left'})
//     // await page.screenshot({ path: './tmp/04-outputHtml4.png' })

    await expect(page).toHave({
      selector:'#getHtmlCodeModalContent .html-code-container.html-code',
      text: `&lt;p&gt;Hello
      &lt;/p&gt;
          `,
          asCode: true,
      caseInsensitive: true,
      // verb: 'includes'
    })
// //     await expectElement(page, '#getHtmlCodeModalContent .html-code-container.html-code', `
// // &lt;p&gt;Hello
// // &lt;/p&gt;
// //     `)



//     await page.screenshot({ path: './tmp/05-outputHtml2.png' })
    await expect(page).toHave({
      selector:'#getHtmlCodeModalContent .html-code-container.html',
      text: 'html',
          asCode: true,
      caseInsensitive: true
    })
    await expect(page).toClick('#getHtmlCodeModalContent .html>a  ')

    await expect(page).toHave({
      selector: '#getHtmlCodeModalContent .html-code-container.html',
      text: `<p>HELLO      </p>`,
      caseInsensitive: true,
      asCode: true,
      extractAs: 'outerHTML',
      // verb: 'includes'
    })
//     // await expectClick(page, '#getHtmlCodeModalContent .html-code-container.html', 'html')
//     // await expectElement(page, '#getHtmlCodeModalContent .html-code-container.html', `
//     // <p>Hello
//     // </p>`)
    await page.screenshot({ path: './tmp/06-outputHtml3.png' })
    
  })
})


