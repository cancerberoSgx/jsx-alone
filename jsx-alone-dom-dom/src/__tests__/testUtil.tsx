import { install, uninstall } from '../install';
export function checkNoDom() {

  it('should run in clean environment', () => {
    //@ts-ig nore
    expect(typeof document).toBe('undefined');
    //@ts-ign ore
    expect(typeof Node).toBe('undefined');
    install();
    //@ts-igno re
    expect(typeof document).not.toBe('undefined');
    //@ts-igno re
    expect(typeof Node).not.toBe('undefined');
    uninstall();
    //@ts-ign ore
    expect(typeof document).toBe('undefined');
    //@ts-ign ore
    expect(typeof Node).toBe('undefined');
  })
}


export function checkDomIsImplementation(el: Element) {
  // it('should run in clean environment', () => {
    expect(typeof document.querySelectorAll).toBe('undefined');
    expect(()=>el.querySelectorAll('p')).toThrow()
  // })
}
