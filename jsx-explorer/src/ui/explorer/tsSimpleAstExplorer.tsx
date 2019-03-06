import { ElementClass, JSXAlone } from 'jsx-alone-dom';
import { Component } from '../util/component';
import { Editor, Status } from '../../store/types';
import { escapeHtml } from '../../util/util';
import { createProject } from '../../util/ts-simple-ast';
import { dumpAst } from '../../util/typescript';
import { registerStyle } from '../../style/styles';


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
        {escapeHtml(dumpAst(f.compilerNode))}
      </pre>
    </div>
  }
}
