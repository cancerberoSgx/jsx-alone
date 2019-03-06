import { css } from "../util/media";
import { Component } from './util/component';
import { JSXAlone } from 'jsx-alone-dom';
import { P } from './app';
import { query } from '../util/util';

export class EditorExplorerMenu extends Component<P> {
  render() {
    return <div className="tabs is-small is-boxed is-toggle editorExplorerOptions">
      <ul>
        <li className="editor is-active">
          <a onClick={e => this.selectTab('editor')}>Editor</a>
        </li>
        <li className="explorers">
          <a onClick={e => this.selectTab('explorers')}>Explorers</a>
        </li>
      </ul>
    </div>
  }

  private selectTab(e: 'editor' | 'explorers') {
    query('.editorExplorerOptions li.is-active').classList.remove('is-active');
    query('.editorExplorerOptions li.' + e).classList.add('is-active');
    query('.editorExplorerBody .editorExplorerBodyMember.is-active').classList.remove('is-active');
    query('.editorExplorerBody .editorExplorerBodyMember.' + e).classList.add('is-active');
  }
}






