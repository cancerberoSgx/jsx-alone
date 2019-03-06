import { JSXAlone } from 'jsx-alone-dom';
import { Component } from '../util/component';
import { State } from '../../store/types';
import { registerStyle } from '../../style/styles';
import { ElementExplorer } from './elementExplorer';
import { TsSimpleAstExplorer } from './tsSimpleAstExplorer';

registerStyle(`
.explorer-container{
  display:none;
}
.explorer-container.is-active {
  display: block;
}
`)

interface P {
  state: State
}

export class Explorers extends Component<P> {
  private selectExplorer(e: 'elements' | 'jsAst') {
    this.query('.tabs li.is-active').classList.remove('is-active')
    this.query('.tabs li.' + e).classList.add('is-active')
    this.query('.explorer-container.is-active').classList.remove('is-active')
    this.query('.explorer-container.' + e).classList.add('is-active')
  }

  render() {
    return <div>
      <div className="tabs is-small is-boxed is-toggle">
        <ul>
          <li className="elements is-active">
            <a onClick={e => this.selectExplorer('elements')}>Elements</a>
          </li>
          <li className="jsAst">
            <a onClick={e => this.selectExplorer('jsAst')}>JS AST</a>
          </li>
        </ul>
      </div>
      <div className="explorer-container elements is-active">
        <ElementExplorer editor={this.props.state.editor} />
      </div>
      <div className="explorer-container jsAst">
        <TsSimpleAstExplorer editor={this.props.state.editor} />
      </div>
    </div>
  }
}
