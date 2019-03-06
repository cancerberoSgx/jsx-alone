import { ElementClass, JSXAlone } from 'jsx-alone-dom';
import { Component } from '../util/component';
import { Editor, Status } from '../../store/types';
import { escapeHtml, shorter } from '../../util/util';
import { createProject, getChildrenForEachChild } from '../../util/ts-simple-ast';
import { dumpAst } from '../../util/typescript';
import { registerStyle } from '../../style/styles';
import { Node , ts} from 'ts-simple-ast';
import { unique } from 'jsx-alone-core';
import { ExplorerProps } from './explorers';


interface P extends ExplorerProps{
  mode?: 'getChildren' | 'forEachChild'
  showDetailsOf?: string
}

registerStyle(`
.tsAstExplorerContent {
  height: 700px;
  overflow: scroll;
}
`)

export class TsSimpleAstExplorer extends Component<P> {
  render() {
    const project = createProject([{
      fileName: 't1.tsx',
      content: this.props.editor.code
    }])
    this.props.mode = this.props.mode || 'forEachChild'
    const f = project.getSourceFiles().find(s => s.getFilePath().endsWith('t1.tsx'))!
    
    return <div className="tsAstExplorerContent">
      <button className="button is-small" onClick={e=>{
        this.updateProps({mode: this.props.mode==='forEachChild' ? 'getChildren' : 'forEachChild'})
      }}>{this.props.mode==='forEachChild' ? 'getChildren' : 'forEachChild'} mode</button>
      <NodeComponent mode={this.props.mode} node={f} showDetailsOf={this.props.showDetailsOf} onShowDetailsOf={(p, n)=>{
        this.updateProps({showDetailsOf: p})
        const sel= {
          startColumn:ts.getLineAndCharacterOfPosition(f.compilerNode, n.compilerNode.getStart()).character+1,
          startLineNumber:ts.getLineAndCharacterOfPosition(f.compilerNode, n.compilerNode.getStart()).line+1,
          endColumn: ts.getLineAndCharacterOfPosition(f.compilerNode, n.compilerNode.getEnd()).character+1,
          endLineNumber:ts.getLineAndCharacterOfPosition(f.compilerNode, n.compilerNode.getEnd()).line+1,
        }
        this.props.onSelectCode && this.props.onSelectCode(sel)
        }}/>
      <pre>
        {escapeHtml(JSON.stringify(dump(f, this.props.mode), null, 2))}
      </pre>
    </div>
  }
}

interface NP {
  node: Node 
  path?:string
  mode: 'getChildren' | 'forEachChild'
  showDetailsOf?: string
  onShowDetailsOf: (p:string, n:Node)=>void
}

export class NodeComponent extends Component<NP> {
  render() {
    const {node, mode, path='/'} = this.props
    const children = mode === 'forEachChild' ? getChildrenForEachChild(node) : node.getChildren()
    return <div className="content">
      <span>{node.getKindName()}</span>

    <button className="button is-small" onClick={e=>{
      this.props.onShowDetailsOf(path, node)
    }}>info</button>

      {this.props.showDetailsOf===path && <div>
        Text: "{shorter(node.getText())}"
        Type: {node.getType().getText()}
      </div>}

      <ul>
      {children.map((c, i)=><li>
        <NodeComponent {...this.props} node={c} path={path+i}/>
      </li>)}
      </ul>

    </div>
  }
}

interface DumpNode { kind: string, children?: DumpNode[] }

function dump(n: Node, mode: 'getChildren' | 'forEachChild' = 'forEachChild'): DumpNode {
  var r = {
    kind: n.getKindName(),
    children: (mode === 'forEachChild' ? getChildrenForEachChild(n) : n.getChildren()).map(c => dump(c, mode)),
  }
  if (r.children.length === 0) {
    delete r.children
  }
  return r
}