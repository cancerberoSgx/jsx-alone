import { statefulElementClassTestRenderApp } from './statefulElementClassTestRenderApp';
describe('stateful element class', () => {
  describe('sample 1', () => {
    it('simple', ()=>{
      expect(1).toBe(1)
      const parent = statefulElementClassTestRenderApp()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(2)
      document.querySelector<HTMLButtonElement>('#add')!.click()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(3)
      document.querySelector<HTMLButtonElement>('[data-id="seba"] .remove')!.click()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(2)
      document.querySelector<HTMLButtonElement>('[data-id="lau"] .remove')!.click()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(1)
    })
  })
})



