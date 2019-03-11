import { JSXAlone } from 'jsx-alone-dom'
import { registerStyle } from '../../../style/styles'
import { shorter } from '../../../util/util'
import { Component } from '../../util/component'
import { CodeWorkerResponseJsxAsNode } from '../../../store/types'

interface P {
  node: CodeWorkerResponseJsxAsNode
  path?: string
  mode: 'getChildren' | 'forEachChild'
  onShowDetailsOf: (p: string, n: CodeWorkerResponseJsxAsNode) => void
  showDetailsOf?: string
  collapsed?: boolean
}

export class NodeComponent extends Component<P> {
  protected removeChildrenOnUpdate = true
  render() {
    const { node, mode, path = '/', showDetailsOf, onShowDetailsOf, collapsed = false } = this.props
    return <div data-key={path} className="tsAstExplorerNode">

      <span className="nodeName">{node.kind}</span>

      <button className="button is-small" onClick={e => {
        onShowDetailsOf(path, node)
      }}>!</button>

      <button className="button is-small" onClick={e => {
        this.updateProps({ collapsed: !collapsed })
      }}>{collapsed ? '+' : '-'}</button>

      {!collapsed && showDetailsOf === path && <div className="nodeInfo content">
        <strong>Text</strong>: <code>{shorter(node.text)}</code><br />
        <strong>Type</strong>: <code>{node.type}</code>
      </div>}

      {!collapsed && <ul>
        {node.children.map((c, i) => <li>
          <NodeComponent node={c} path={path + i} onShowDetailsOf={onShowDetailsOf} mode={mode} showDetailsOf={showDetailsOf} />
        </li>)}
      </ul>}

    </div>
  }
}

registerStyle(`
.tsAstExplorerNode .nodeName {
  font-weight: bolder;
}
`)
