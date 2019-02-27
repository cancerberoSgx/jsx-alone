import { statefulElementClassTestRenderApp } from './statefulElementClassTestRenderApp';
import { query } from './testUtil';
describe('stateful element class', () => {
  describe('sample 1', () => {
    it('simple', ()=>{
      statefulElementClassTestRenderApp()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(2)
      query<HTMLButtonElement>('#add').click()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(3)
      query<HTMLButtonElement>('[data-id="seba"] .remove').click()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(2)
      query<HTMLButtonElement>('[data-id="lau"] .remove').click()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(1)
    })
  })
})



