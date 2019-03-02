import { JSXAlone } from 'jsx-alone-dom'
import * as monaco from 'monaco-editor';

(self as any).MonacoEnvironment = {
  getWorkerUrl: function (moduleId: any, label: any) {
    if (label === 'json') {
      return './json.worker.js';
    }
    if (label === 'css') {
      return './css.worker.js';
    }
    if (label === 'html') {
      return './html.worker.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js';
    }
    return './editor.worker.js';
  },
};


// function render() {
//   var people = [{ name: 'Sebastián', age: 12 }, { name: 'Laura', age: 22 }]
//   return <div>
//     <h1>People</h1>
//     <ul>{people.map(p => 
//       <li>
//         <strong>{p.name}</strong> is {p.age} years old
//       </li>)}
//     </ul>
//   </div>
// }
const e = monaco.editor.create(document.getElementById('container')!, {
  value: `
function render() {
  var people = [{ name: 'Sebastián', age: 12 }, { name: 'Laura', age: 22 }]
  return <div>
    <h1>People</h1>
    <ul>{people.map(p => 
      <li>
        <strong>{p.name}</strong> is {p.age} years old
      </li>)}
    </ul>
  </div>
}
  `.trim(),
  language: "javascript"

});