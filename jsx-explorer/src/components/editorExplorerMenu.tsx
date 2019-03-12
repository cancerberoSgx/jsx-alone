import { JSXAlone } from 'jsx-alone-dom';
import { ExplorerName } from '../store/types';
import { isDesktop, isMobile } from '../util/media';
import { P } from './app';
import { Component } from './util/component';
import { OPTIONS_ACTIONS } from '../store/options';
import { dispatch } from '../store/store';

export class EditorExplorerMenu extends Component<P> {

  render() {
    return <div className="tabs is-small is-boxed is-toggle editorExplorerOptions">
      <ul>
        {isMobile() && <li className={`editor ${this.props.state.options.selectedExplorer === 'editor' ? 'is-active' : ''}`}>
          <a onClick={e => this.selectTab('editor')}>Editor</a>
        </li>}
        <li className={`elements ${this.props.state.options.selectedExplorer === 'elements' ? 'is-active' : ''}`}>
          <a onClick={e => this.selectTab('elements')}>Elements</a>
        </li>
        <li className={`jsAst ${this.props.state.options.selectedExplorer === 'jsAst' ? 'is-active' : ''}`} >
          <a onClick={e => this.selectTab('jsAst')}>JS AST</a>
        </li>
        <li className={`implementations ${this.props.state.options.selectedExplorer === 'implementations' ? 'is-active' : ''}`}>
          <a onClick={e => this.selectTab('implementations')}>Implementations</a>
        </li>
      </ul>
    </div>
  }

  private selectTab(selectedExplorer: ExplorerName) {
    dispatch({ type: OPTIONS_ACTIONS.SELECT_EXPLORER, payload: { selectedExplorer  } })
  }
}
