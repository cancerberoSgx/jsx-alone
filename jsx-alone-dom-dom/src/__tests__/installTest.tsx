import { install, uninstall } from '../install';
import { MDocument } from '../document';

test('install', () => {

  expect(typeof document).toBe('undefined');
  expect(typeof Node).toBe('undefined');
  install();
  expect(typeof document).not.toBe('undefined');
  expect(typeof Node).not.toBe('undefined');
  expect((Node as any)._WATERMARK).toBe('jsx-alone-dom-dom');
  uninstall();
  expect(typeof document).toBe('undefined');
  expect(typeof Node).toBe('undefined');

})



