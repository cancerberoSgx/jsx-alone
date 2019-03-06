import { css, isDesktop, isMobile } from "../util/media";
import { Component } from './util/component';
import { JSXAlone } from 'jsx-alone-dom';
import { P } from './app';
import { query } from '../util/util';

export class EditorExplorerMenu extends Component<P> {

  render() { 
    return <div className="tabs is-small is-boxed is-toggle editorExplorerOptions">
      <ul>
        {!isDesktop() && <li className={`editor is-active`}>
          <a onClick={e => this.selectTab('editor')}>Editor</a>
        </li>}
        {/* <li className="explorers">
          <a onClick={e => this.selectTab('explorers')}>Explorers</a>
        </li> */}
        <li className={`elements ${isDesktop() ? 'is-active' : ''}`}>
            <a onClick={e => this.selectTab('elements')}>Elements</a>
          </li>
          <li className="jsAst">
            <a onClick={e => this.selectTab('jsAst')}>JS AST</a>
          </li>
          <li className="implementations">
            <a onClick={e => this.selectTab('implementations')}>Implementations</a>
          </li>

      </ul>
    </div>
  }

  private selectTab(e: 'editor' |'elements'|'jsAst'|'implementations') {
    query('.editorExplorerOptions li.is-active').classList.remove('is-active');
    query('.editorExplorerOptions li.' + e).classList.add('is-active');
    query('.editorExplorerBody .editorExplorerBodyMember.is-active').classList.remove('is-active');
    query('.editorExplorerBody .editorExplorerBodyMember.' + e).classList.add('is-active');
  }
}






