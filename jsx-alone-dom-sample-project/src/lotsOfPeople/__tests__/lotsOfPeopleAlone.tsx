// execute it like this: 
// CWD=`pwd` ; cd ../jsx-alone-sample-project-code; npm run setDomImpl; cd $CWD ; ts-node src/lotsOfPeople/__tests__/lotsOfPeopleAlone.tsx
// cd ../jsx-alone-sample-project-code; npm run setDomImpl; cd $CWD ; npx tsc ; node   dist/src/lotsOfPeople/__tests__/lotsOfPeopleAlone.js 

var JSDOM = require("jsdom").JSDOM
const dom = new JSDOM('<html><head><head><body></body></html>', {
  url: 'http://foo.com',
  runScripts: "dangerously",
  resources: "usable"
})
const g = global as any
g.document = dom.window.document;
g.window = dom.window;
g.navigator = dom.window.navigator;


import { lotsOfPeople, LotsOfPeopleRendererConfig, LotsOfPeopleConfig } from 'jsx-alone-sample-project-code'
import { lotsOfPeopleRenderer } from "../lotsOfPeopleRenderer";
import { printMs } from 'jsx-alone-core';
import { JSXAlone } from 'jsx-alone-dom';


export function lotsOfPeopleAloneTest(){
  const config:LotsOfPeopleConfig ={
    peopleCount: 100,
    friendsCount: 2
  } 
  lotsOfPeople((app: JSX.Element, rendererConfig?: LotsOfPeopleRendererConfig) => {
    const {el, JSXAloneRenderT} = lotsOfPeopleRenderer(app, rendererConfig!)
    const s = `
createElement():  ${printMs(rendererConfig&&rendererConfig.JSXAloneCreateElementT||0)}
render():         ${printMs(JSXAloneRenderT)}

Total elements:   ${el.querySelectorAll('*').length}
peopleCount:      ${config.peopleCount}
friendsCount:     ${config.friendsCount}
`
console.log(s);

}, undefined, JSXAlone)
}

lotsOfPeopleAloneTest()