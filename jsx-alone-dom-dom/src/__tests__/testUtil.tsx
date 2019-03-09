import { install, uninstall } from '../install';
let testUtil = 1;
export function checkNoDom() {

  it('should run in clean environment', ()=>{

  // uninstall();
  //@ts-ignore
  expect(typeof document).toBe('undefined');
  //@ts-ignore
  expect(typeof Node).toBe('undefined');
  install();
  //@ts-ignore
  expect(typeof document).not.toBe('undefined');
  //@ts-ignore
  expect(typeof Node).not.toBe('undefined');
  uninstall();
  //@ts-ignore
  expect(typeof document).toBe('undefined');
  //@ts-ignore
  expect(typeof Node).toBe('undefined');
  })
}
