import { JSXAlone } from 'jsx-alone-dom'
import { ts } from 'ts-simple-ast'
import { registerStyle } from '../../../style/styles'
import { createProject } from '../../../util/ts-simple-ast'
import { Component } from '../../util/component'
import { ExplorerProps } from '../explorers'
import { DiagnosticComponent } from './tsAstDiagnostic'
import { NodeComponent } from './tsAstNode'
import { css } from '../../../util/media';

interface P extends ExplorerProps {
  mode?: 'getChildren' | 'forEachChild'
  showDetailsOf?: string
  showDiagnostics?: boolean
}

registerStyle(`
.tsAstExplorerContent {
  height: 100%;
  overflow: scroll;
}
.tsAstExplorerContent {
  width: 100%;
  height: 100%;
}
${css('.tsAstExplorerContent li ul', `padding-left: .7em`, `padding-left 1.2em`)}

.tsAstExplorerContent ul {
  list-style: none;
}
`)

export class TsSimpleAstExplorer extends Component<P> {
  protected removeChildrenOnUpdate = true
  render() {

    const project = createProject([{
      fileName: 't1.tsx',
      content: this.props.editor.code
    }])

    this.props.mode = this.props.mode || 'forEachChild'
    const f = project.getSourceFiles().find(s => s.getFilePath().endsWith('t1.tsx'))!
    const diagnostics = this.props.showDiagnostics && project.getPreEmitDiagnostics()

    return <div className="tsAstExplorerContent">

      <button className="button is-small" onClick={e => {
        this.updateProps({ mode: this.props.mode === 'forEachChild' ? 'getChildren' : 'forEachChild' })
      }}>{this.props.mode === 'forEachChild' ? 'getChildren' : 'forEachChild'} mode</button>

      <button className="button is-small" onClick={e => {
        this.updateProps({ showDiagnostics: !this.props.showDiagnostics })
      }}>{this.props.showDiagnostics ? 'Hide' : 'Show'} Diagnostics</button>

      {this.props.showDiagnostics && <div>
        <h3>Diagnostics:</h3>
        {diagnostics && <ul>{diagnostics.map(d => <li>
          <DiagnosticComponent d={d} onSelectCode={this.props.onSelectCode} />
        </li>)}
        </ul>}
        {diagnostics && diagnostics.length === 0 && <span>No problems diagnosed, congrats!</span>}
        <em>(WARNING: Diagnostics makes the experience very slow)</em>
        </div>}

      <NodeComponent mode={this.props.mode} node={f} showDetailsOf={this.props.showDetailsOf}
        onShowDetailsOf={(p, n) => {
          const sel = {
            startColumn: ts.getLineAndCharacterOfPosition(f.compilerNode, n.compilerNode.getStart()).character + 1,
            startLineNumber: ts.getLineAndCharacterOfPosition(f.compilerNode, n.compilerNode.getStart()).line + 1,
            endColumn: ts.getLineAndCharacterOfPosition(f.compilerNode, n.compilerNode.getEnd()).character + 1,
            endLineNumber: ts.getLineAndCharacterOfPosition(f.compilerNode, n.compilerNode.getEnd()).line + 1
          }
          this.props.onSelectCode && this.props.onSelectCode(sel)
          this.updateProps({ showDetailsOf: p as string })
        }} />

    </div>
  }
}
