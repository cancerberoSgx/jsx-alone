import { isMobile } from "../util/media";
import { Editor } from './editor';
import { Explorers } from './explorer/explorers';
import { Component } from './util/component';
import { P } from './app';
import { registerStyle } from '../style/styles';
import { JSXAlone } from 'jsx-alone-dom';

registerStyle(`
.editorExplorerBodyMember {
  padding-top: 2em;
}
`)

export class EditorExplorerBody extends Component<P> {
  render() {
    return isMobile() ?
      <div className="editorExplorerBody">
        <div className="explorers editorExplorerBodyMember">
          <Explorers {...this.props} />
        </div>
        <div className="editor editorExplorerBodyMember is-active">
          <Editor {...this.props} />
        </div>
      </div>
      :
      <div className="tile is-ancestor editorExplorerBody">
        <div className="tile is-vertical is-4">
          <article className="tile is-child editorExplorerBodyMember explorers">
            <Explorers {...this.props} />
          </article>
        </div>
        <div className="tile is-vertical is-8">
          <article className="tile is-child editor editorExplorerBodyMember is-active">
            <Editor {...this.props} />
          </article>
        </div>
      </div>;
  }
}
