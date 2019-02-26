import { execSync } from 'child_process'
import { exec, ls, rm, config } from 'shelljs'

describe('simple sample', () => {
  it('simple sample bundle size must not be greater than 11k', () => {
    config.silent=true
    rm('-rf', '../docs/jsx-alone-dom-sample-project/simple/')
    const p = exec('npm run docs-simple')
    expect(p.code).toBe(0)
    expect(ls('-l', '../docs/jsx-alone-dom-sample-project/simple/*.js').map(f => (f as any).size)[0]).toBeLessThan(11000)
  })
})
 