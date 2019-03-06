import { Node } from 'ts-simple-ast';
import { getChildrenForEachChild } from '../../../util/ts-simple-ast';
import { shorter } from '../../../util/util';
import { Component } from '../../util/component';
import { JSXAlone } from 'jsx-alone-dom';

interface P {
  node: Node;
  path?: string;
  mode: 'getChildren' | 'forEachChild';
  onShowDetailsOf: (p: string, n: Node) => void;
  showDetailsOf?: string;
  collapsed?: boolean
}

export class NodeComponent extends Component<P> {
  protected updateExistingRemoveChildrenIfCountDiffer = true
  render() {
    const { node, mode, path = '/', showDetailsOf, onShowDetailsOf, collapsed = false } = this.props;
    const children = mode === 'forEachChild' ? getChildrenForEachChild(node) : node.getChildren();
    return <div className="content" data-key={path}>

      <strong>{node.getKindName()}</strong>

      <button className="button is-small" onClick={e => {
        onShowDetailsOf(path, node);
      }}>!</button>

      <button className="button is-small" onClick={e => {
        this.updateProps({ collapsed: !collapsed })
      }}>{collapsed ? '+' : '-'}</button>

      {!collapsed && showDetailsOf === path && <div className="nodeInfo">
        <strong>Text</strong>: <code>{shorter(node.getText())}</code><br />
        <strong>Type</strong>: <code>{node.getType().getApparentType().getText()}</code>
      </div>}

      {!collapsed && <ul>
        {children.map((c, i) => <li>
          <NodeComponent node={c} path={path + i} onShowDetailsOf={onShowDetailsOf} mode={mode} showDetailsOf={showDetailsOf} />
        </li>)}
      </ul>}

    </div>
  }
}