import { JSXAlone } from 'jsx-alone-dom';
import { Node, ts } from 'ts-simple-ast';
import { registerStyle } from '../../style/styles';
import { createProject, getChildrenForEachChild } from '../../util/ts-simple-ast';
import { escapeHtml, shorter } from '../../util/util';
import { Component } from '../util/component';
import { ExplorerProps } from './explorers';


interface P extends ExplorerProps {
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
      <button className="button is-small" onClick={e => {
        this.updateProps({ mode: this.props.mode === 'forEachChild' ? 'getChildren' : 'forEachChild' })
      }}>{this.props.mode === 'forEachChild' ? 'getChildren' : 'forEachChild'} mode</button>
      <NodeComponent mode={this.props.mode} node={f} showDetailsOf={this.props.showDetailsOf}
        onShowDetailsOf={(p, n) => {
          const sel = {
            startColumn: ts.getLineAndCharacterOfPosition(f.compilerNode, n.compilerNode.getStart()).character + 1,
            startLineNumber: ts.getLineAndCharacterOfPosition(f.compilerNode, n.compilerNode.getStart()).line + 1,
            endColumn: ts.getLineAndCharacterOfPosition(f.compilerNode, n.compilerNode.getEnd()).character + 1,
            endLineNumber: ts.getLineAndCharacterOfPosition(f.compilerNode, n.compilerNode.getEnd()).line + 1,
          }
          this.props.onSelectCode && this.props.onSelectCode(sel)
          this.updateProps({showDetailsOf: p})
        }} />
      <pre>
        {escapeHtml(JSON.stringify(dump(f, this.props.mode), null, 2))}
      </pre>
    </div>
  }
}

interface NP {
  node: Node
  path?: string
  mode: 'getChildren' | 'forEachChild'
  onShowDetailsOf: (p: string, n: Node) => void
  showDetailsOf?: string
}

export class NodeComponent extends Component<NP> {
  render() {
    const { node, mode, path = '/', showDetailsOf, onShowDetailsOf} = this.props
    const children = mode === 'forEachChild' ? getChildrenForEachChild(node) : node.getChildren()
    return <div className="content" data-key={path}>
      <span>{node.getKindName()}</span>

      <button className="button is-small" onClick={e => {
        onShowDetailsOf(path, node)
      }}>info</button>

      {showDetailsOf===path && <div className="nodeInfo">
        <strong>Tex2t</strong>: <code>"{shorter(node.getText(), 20)}..."</code><br />
        <strong>Type</strong>: <code>{node.getType().getText()}</code>
      </div>}

      <ul>
        {children.map((c, i) => <li>
          <NodeComponent node={c} path={path + i} onShowDetailsOf={onShowDetailsOf} mode={mode} showDetailsOf={showDetailsOf}
          />
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