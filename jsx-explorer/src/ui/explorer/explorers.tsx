import { JSXAlone } from 'jsx-alone-dom';
import { Editor, State } from '../../store/types';
import { registerStyle } from '../../style/styles';
import { getMonacoInstance } from '../editor';
import { Component } from '../util/component';
import { ElementExplorer } from './elements/elementExplorer';
import { TsSimpleAstExplorer } from './tsAst/tsAstExplorer';
import { ImplExplorer } from './implExplorer';

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

export interface ExplorerProps {
  editor: Editor
  onSelectCode?(sel: SelectCode): void
}

export interface SelectCode {
  startColumn: number;
  startLineNumber: number;
  endColumn: number;
  endLineNumber: number;
}

export class Explorers extends Component<P> {
  
  protected updateExistingRemoveChildrenIfCountDiffer = true
  
  private selectExplorer(e: 'elements' | 'jsAst'|'implementations') {
    this.query('.tabs li.is-active').classList.remove('is-active')
    this.query('.tabs li.' + e).classList.add('is-active')
    this.query('.explorer-container.is-active').classList.remove('is-active')
    this.query('.explorer-container.' + e).classList.add('is-active')
  }

  constructor(p:P){
    super(p)
    this.onSelectCode = this.onSelectCode.bind(this)
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
          <li className="implementations">
            <a onClick={e => this.selectExplorer('implementations')}>Implementations</a>
          </li>
        </ul>
      </div>
      <div className="explorer-container elements is-active">
        <ElementExplorer editor={this.props.state.editor} onSelectCode={this.onSelectCode} />
      </div>
      <div className="explorer-container jsAst">
        <TsSimpleAstExplorer editor={this.props.state.editor} onSelectCode={this.onSelectCode} />
      </div>
      <div className="explorer-container implementations">
      <ImplExplorer editor={this.props.state.editor} onSelectCode={this.onSelectCode} />
      </div>
    </div>
  }

  private onSelectCode(sel: SelectCode):void {
    getMonacoInstance()!.setSelection(sel);
  }
}
