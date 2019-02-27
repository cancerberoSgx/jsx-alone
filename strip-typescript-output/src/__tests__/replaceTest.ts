import { replace } from '..';

describe('replace', () => {
  it('works', () => {
    expect(replace(`seconds ":"")+(s?s+" ms ":"")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.checkThrow=r,`)).toBe(`seconds \":\"\")+(s?s+\" ms \":\"\")},exports.checkThrow=r,`)

    expect(replace(`ototype&&e.prototype.render}Object.defineProperty(e,"__esModule",{value:!0});var w=G;functio`)).toBe(`ototype&&e.prototype.render}var w=G;functio`)


    // `Object.defineProperty(exports, "__esModule", { value: true });
    // "use strict";
    // exports.__esModule = true;`
  })
})
//TODO
// rototype&&t.prototype.render}function e(t){return r(t)||n(t)}function n(t){return t&&t.setAttribute}function r(t){return t&&t.cont