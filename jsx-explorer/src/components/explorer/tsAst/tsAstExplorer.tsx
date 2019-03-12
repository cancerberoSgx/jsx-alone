import { JSXAlone } from 'jsx-alone-dom'
import { registerStyle } from '../../../style/styles'
import { css, height } from '../../../util/media'
import { Component } from '../../util/component'
import { ExplorerProps } from '../explorers'
import { NodeComponent } from './tsAstNode'
import { DiagnosticComponent } from './tsAstDiagnostic'
import { dispatch } from '../../../store/store';
import { COMPILED_ACTION } from '../../../store/compiled';

interface P extends ExplorerProps {
  // mode?: 'getChildren' | 'forEachChild'
  showDetailsOf?: string
  // showDiagnostics?: boolean
}

registerStyle(`
.tsAstExplorerContent {
  height: 100%;
  overflow: scroll;
  margin-top: 3em;
}
.tsAstExplorerContent {
  width: 100%;
  height: ${height()}px;
}
${css('.tsAstExplorerContent li ul', `padding-left: .7em`, `padding-left 1.2em`)}
.tsAstExplorerContent ul {
  list-style: none;
}
`)

export class TsSimpleAstExplorer extends Component<P> {
  render() {
    const compiled = this.props.compiled.response
    if (compiled) {
      const { diagnostics, ast } = compiled.jsxAst
      const { mode, showDiagnostics } = this.props.compiled.request.jsxAst
      return <div className="tsAstExplorerContent">

        <button className="button is-small" onClick={e => {
          dispatch({ type: COMPILED_ACTION.FETCH_COMPILED, payload: { request: { jsxAst: { mode: mode === 'forEachChild' ? 'getChildren' : 'forEachChild' } } } })
        }}>
          {mode === 'forEachChild' ? 'getChildren' : 'forEachChild'} mode</button>

        <button className="button is-small" onClick={e => {
          dispatch({ type: COMPILED_ACTION.FETCH_COMPILED, payload: { request: { jsxAst: { showDiagnostics: !showDiagnostics } as any } } })
        }}>
          {showDiagnostics ? 'Hide' : 'Show'} Diagnostics</button>

        {showDiagnostics && <div className="content">
          <h3>Diagnostics:</h3>
          <p>
            <em>WARNING</em>: Diagnostics makes the experience very slow
          </p>
          {diagnostics && <ul>
          {diagnostics.map(d => <li>
            <DiagnosticComponent d={d} onSelectCode={this.props.onSelectCode} />
          </li>)}
          </ul>}
          {diagnostics && diagnostics.length === 0 && <span>No problems diagnosed, congrats!</span>}
        </div>}

        <NodeComponent mode={mode || 'forEachChild'} node={ast} showDetailsOf={this.props.showDetailsOf}
          onShowDetailsOf={(p, n) => {
            this.props.onSelectCode && this.props.onSelectCode(n)
            this.updateProps({ showDetailsOf: p as string })
          }} />

      </div>
    }

    else {
      return <div className="content">
        {/* <h3>
          NOT COMPILED YET
      </h3> */}
      </div>
    }

  }
}
