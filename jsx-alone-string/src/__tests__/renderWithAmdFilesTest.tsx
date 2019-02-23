import { writeFileSync } from 'fs';
import { equal } from 'assert';
import { renderWithAmdFiles, fixDefine } from '../renderWithAmdFiles';
import { renderWithAmdFilesTest1 } from './renderWithAmdFilesTest1';
import { ReactLike } from '../createElement';
import { renderInDOM } from '../renderInHtml';
import { array, dedup } from '../../misc/misc';
import { SearchFilterEditor } from '../../app/searchView/searchFilterEditor';
import { SearchFilterEditors } from '../../app/searchView/searchFilterEditors';

function renderWithAmdFilesTest() {
  const html = renderWithAmdFiles(renderWithAmdFilesTest1(), {
    files: [
      { name: 'createElement', path: 'jsx/createElement.js' },
      { name: 'elementImpl', path: 'jsx/elementImpl.js' },
      { name: 'Select', path: 'jsx/util/Select.js' },
      { name: 'StatelessComponent', path: 'jsx/StatelessComponent.js' },
      { name: 'Bind', path: 'jsx/util/Bind.js' },
      { name: 'formatDate', path: 'misc/formatDate.js' },
      { name: 'misc', path: 'misc/misc.js' },
      { name: 'renderInHtml', path: 'jsx/renderInHtml.js' }
    ],
    asHtmlDocument: true,
    basePath: 'output',

  });
  writeFileSync('src/jsx/__tests__/test.html', html);
}


function fixDefineTest() {
  const s = fixDefine(`define(['./sd/foo'], (foo)=>{})`, ['foo', 'bar'], 'foo');
  equal(s, `define("foo", ["foo"], (foo)=>{})`);
}


function Custom1(props: { name: string }) {
  return <div>
    <div id="b"></div>
    <button onClick={e => {
      renderInDOM(<Custom2 options={array(5).map(i => i * Math.random() + 1)}></Custom2>, '#a')
    }}>click me {props.name}</button>
    <div id="a"></div>
  </div>;
}
function Custom2(props: { options: any[] }) {
  return <select multiple={true} onChange={e => {
    renderInDOM(<Custom1 name={e.currentTarget.selectedOptions[0].value + ''}></Custom1>, '#b')
  }}>{props.options.map(o => <option value={o}>{o}</option>)}</select>
}
function renderWithAmdFilesTest2() {
  const html = renderWithAmdFiles(<Custom1 name="seba"></Custom1>, {
    files: [
      { name: 'createElement', path: 'jsx/createElement.js' },
      { name: 'elementImpl', path: 'jsx/elementImpl.js' },
      { name: 'renderInHtml', path: 'jsx/renderInHtml.js' },
      { name: 'misc', path: 'misc/misc.js' },
    ],
    asHtmlDocument: true,
    basePath: 'output',
    extraCode: [`${Custom2.toString()}`, `${Custom1.toString()}`]
  });
  writeFileSync('src/jsx/__tests__/test.html', html)
}

// renderWithAmdFilesTest2();


function renderWithAmdFilesTest3() {
  const html = renderWithAmdFiles(<Custom1 name="seba"></Custom1>, {
    files: [
      'jsx/createElement.js',
      'jsx/elementImpl.js',
      'jsx/renderInHtml.js',
      'misc/misc.js',
    ],
    asHtmlDocument: true,
    basePath: 'output',
    extraCode: [Custom2, Custom1]
  });
  writeFileSync('src/jsx/__tests__/test.html', html)
}

// renderWithAmdFilesTest3();



function renderWithAmdFilesTest4() {
  const Comp1 = (props: { foo: string }) => <div>
    <button onClick={e => {
      renderInDOM(<select onChange={e=>{
        alert('changed')
      }}>
      <option>change me</option>
      <option>please</option>
      </select>, '#placeholder1')
    }}>{props.foo}</button>
    <div id="placeholder1"></div>
  </div>
  const html = renderWithAmdFiles(<Comp1 foo="bar"></Comp1>, {
    files: [
      'jsx/createElement.js',
      'jsx/elementImpl.js',
      'jsx/renderInHtml.js',
    ],
    asHtmlDocument: true,
    basePath: 'output',
  });
  writeFileSync('src/jsx/__tests__/test.html', html)
}
// renderWithAmdFilesTest4();


function renderWithAmdFilesTest5() {
  // console.log(SearchFilterEditor.prototype.renderFileDependencies());
  
  const html = renderWithAmdFiles(<SearchFilterEditor type="commercecategory"></SearchFilterEditor>, {
    asHtmlDocument: true,
    basePath: 'output',
    extraCode: [SearchFilterEditor]
  });
  writeFileSync('src/jsx/__tests__/test.html', html)
}
// renderWithAmdFilesTest5();



function renderWithAmdFilesTest6() {
  // console.log(SearchFilterEditor.prototype.renderFileDependencies());
  
  const html = renderWithAmdFiles(<SearchFilterEditors type="commercecategory"></SearchFilterEditors>, {
    asHtmlDocument: true,
    basePath: 'output',
    extraCode: [SearchFilterEditors]
  });
  writeFileSync('src/jsx/__tests__/test.html', html)
}
renderWithAmdFilesTest6();


// console.log(dedup([{name: 1}, {name: 2}, {name: 1}], (a, b)=>a.name===b.name));
