import { lotsOfPeople, LotsOfPeopleRendererConfig, LotsOfPeopleConfig } from 'jsx-alone-sample-project-code'
import { lotsOfPeopleRenderer } from '../lotsOfPeopleRenderer'
import { printMs } from 'jsx-alone-core'
import { JSXAlone } from 'jsx-alone-dom'

// npm test -- --silent
describe('dummy', () => {
  it('dummy', async () => {
    const config: LotsOfPeopleConfig = {
      peopleCount: 100,
      friendsCount: 2
    }
    lotsOfPeople((app: JSX.Element, rendererConfig?: LotsOfPeopleRendererConfig) => {
      const {el, JSXAloneRenderT} = lotsOfPeopleRenderer(app, rendererConfig!)
      const s = `
createElement():  ${printMs(rendererConfig && rendererConfig.JSXAloneCreateElementT || 0)}
render():         ${printMs(JSXAloneRenderT)}

Total elements:   ${el.querySelectorAll('*').length}
peopleCount:      ${config.peopleCount}
friendsCount:     ${config.friendsCount}

`
      process.stdout.write(s)

      expect(el.querySelector<HTMLInputElement>('#peopleCount')!.value).toBe(config.peopleCount + '')
      expect(el.querySelector<HTMLInputElement>('#friendsCount')!.value).toBe(config.friendsCount + '')
      expect(el.querySelectorAll('tbody tr').length).toBe(config.peopleCount)
    }, config, JSXAlone)

  })
})
