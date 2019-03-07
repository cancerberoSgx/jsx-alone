import { JSXAlone } from 'jsx-alone-dom'
import { registerStyle } from '../style/styles'
import { isMobile } from '../util/media'
import { P } from './app'
import { Editor, getMonacoInstance } from './editor'
import { ElementExplorer } from './explorer/elements/elementExplorer'
import { ImplExplorer } from './explorer/implExplorer'
import { TsSimpleAstExplorer } from './explorer/tsAst/tsAstExplorer'
import { Component } from './util/component'
import { SelectCode, onSelectCode } from './explorer/explorers'

registerStyle(`
.editorExplorerBodyMember {
  padding-top: 2em;
  display:none;
  width: 100%;
}
.editorExplorerBodyMember.is-active {
  display: flex;
}
`)

export class EditorExplorerBody extends Component<P> {
  // protected updateExistingRemoveChildrenIfCountDiffer = false

  render() {
    return isMobile() ?
      <div className="editorExplorerBody">
        {/* <div className="explorers editorExplorerBodyMember">
          <Explorers {...this.props} />
        </div> */}
        <div className="editor editorExplorerBodyMember is-active">
          <Editor {...this.props} />
        </div>
        <div className="editorExplorerBodyMember elements">
          <ElementExplorer editor={this.props.state.editor} onSelectCode={onSelectCode} />
        </div>
        <div className="editorExplorerBodyMember jsAst">
          <TsSimpleAstExplorer editor={this.props.state.editor} onSelectCode={onSelectCode} />
        </div>
        <div className="editorExplorerBodyMember implementations">
          <ImplExplorer editor={this.props.state.editor} onSelectCode={onSelectCode} />
        </div>
      </div>
      :
      <div className="tile is-ancestor editorExplorerBody">
        {/* <div className="tile is-vertical is-4"> */}
          {/* <article className="tile is-child explorers editorExplorerBodyMember">
            <Explorers {...this.props} />
          </article> */}
        {/* </div> */}

        <div className="tile is-vertical is-4">

          <article className="tile is-child editorExplorerBodyMember elements  is-active">
            <ElementExplorer editor={this.props.state.editor} onSelectCode={onSelectCode} />
          </article>
          <article className="tile is-child editorExplorerBodyMember jsAst">
            <TsSimpleAstExplorer editor={this.props.state.editor} onSelectCode={onSelectCode} />
          </article>
          <article className="tile is-child editorExplorerBodyMember implementations">
            <ImplExplorer editor={this.props.state.editor} onSelectCode={onSelectCode} />
          </article>
        </div>
        {/* <div className="tile is-vertical is-4">

        </div>
        <div className="tile is-vertical is-4">

        </div> */}

        <div className="tile is-vertical is-8">
          <article className="tile is-child">
            <Editor {...this.props} />
          </article>
        </div>
      </div>
  }

}
