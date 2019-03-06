import { ElementClass, JSXAlone } from 'jsx-alone-dom';
import { Component } from '../util/component';
import { Editor, Status } from '../../store/types';
import { escapeHtml } from '../../util/util';
import { createProject } from '../../util/ts-simple-ast';
import { dumpAst } from '../../util/typescript';
import { registerStyle } from '../../style/styles';
import { Node } from 'ts-simple-ast';


interface P {
  editor: Editor
}
registerStyle(`
.tsAstExplorerContent {
  height: 700px;
  overflow: scroll;
}
`)

export class TsSimpleAstExplorer extends Component<P> {
  render() {
    const project = createProject([
      {
        fileName: 't1.tsx',
        content: this.props.editor.code
      }
    ])
    const f = project.getSourceFiles().find(s => s.getFilePath().endsWith('t1.tsx'))!
    return <div>
      <pre className="tsAstExplorerContent">
        {escapeHtml(JSON.stringify(dump(f), null, 2))}
      </pre>
    </div>
  }
}
interface DumpNode {kind:string, children: DumpNode[]}
function dump(n:Node): DumpNode{
  return {
    kind: n.getKindName(),
    children: n.getChildren().map(c=>dump(c))
  }
}