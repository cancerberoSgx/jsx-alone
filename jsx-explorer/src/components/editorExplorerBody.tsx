import { JSXAlone } from 'jsx-alone-dom'
import { registerStyle } from '../style/styles'
import { isMobile } from '../util/media'
import { P } from './app'
import { Editor } from './editor'
import { ElementExplorer } from './explorer/elements/elementExplorer'
import { onSelectCode } from './explorer/explorers'
import { ImplExplorer } from './explorer/implExplorer'
import { TsSimpleAstExplorer } from './explorer/tsAst/tsAstExplorer'
import { Component } from './util/component'

registerStyle(theme => `
.editorExplorerBodyOverlay{
  visibility: hidden;
  display: block;
  background-color: ${theme.colors.brand};
  width: 70%;
  height: 2em;
  color: ${theme.colors.fg};
  font-weight: bolder;
  margin: 2.5em auto .5em auto;
  z-index: 3;
  padding-top: .3em;
  opacity: 0.0;
  text-align: center;
  border-radius: 1em;
  transition: opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: absolute;
}
body.working .editorExplorerBodyOverlay {
  visibility: visible;
  opacity: .98;
  transition: opacity 600ms easy-out;

}
.editorExplorerBody {
  padding-top: 2em;
}
.editorExplorerBodyMember {
  display:none;
  width: 100%;
}
.editorExplorerBodyMember.is-active {
  display: flex;
}
`)

export class EditorExplorerBody extends Component<P> {

  render() {

    return isMobile() ?

      <div className={`editorExplorerBody`}>
        <div className={`editorExplorerBodyOverlay`}>Working...</div>
        <div className={`editor editorExplorerBodyMember ${this.props.state.options.selectedExplorer === 'editor' ? 'is-active' : ''}`}>
          <Editor {...this.props} />
        </div>
        <div className={`editorExplorerBodyMember elements ${this.props.state.options.selectedExplorer === 'elements' ? 'is-active' : ''}`}>
          <ElementExplorer editor={this.props.state.editor} compiled={this.props.state.compiled} onSelectCode={onSelectCode} />
        </div>
        <div className={`editorExplorerBodyMember jsAst ${this.props.state.options.selectedExplorer === 'jsAst' ? 'is-active' : ''}`}>
          <TsSimpleAstExplorer editor={this.props.state.editor} compiled={this.props.state.compiled} onSelectCode={onSelectCode} />
        </div>
        <div className={`editorExplorerBodyMember implementations ${this.props.state.options.selectedExplorer === 'implementations' ? 'is-active' : ''}`}>
          <ImplExplorer editor={this.props.state.editor} compiled={this.props.state.compiled} onSelectCode={onSelectCode} />
        </div>
      </div>

      :

      <div className="tile is-ancestor editorExplorerBody">

        <div className={`editorExplorerBodyOverlay`}>Working...</div>
        <div className="tile is-vertical is-4">
          <article className={`editorExplorerBodyMember elements ${this.props.state.options.selectedExplorer === 'elements' ? 'is-active' : ''}`}>
            <ElementExplorer editor={this.props.state.editor} compiled={this.props.state.compiled} onSelectCode={onSelectCode} />
          </article>
          <article className={`editorExplorerBodyMember jsAst ${this.props.state.options.selectedExplorer === 'jsAst' ? 'is-active' : ''}`}>
            <TsSimpleAstExplorer editor={this.props.state.editor} compiled={this.props.state.compiled} onSelectCode={onSelectCode} />
          </article>
          <article className={`editorExplorerBodyMember implementations ${this.props.state.options.selectedExplorer === 'implementations' ? 'is-active' : ''}`}>
            <ImplExplorer editor={this.props.state.editor} compiled={this.props.state.compiled} onSelectCode={onSelectCode} />
          </article>
        </div>
        <div className="tile is-vertical is-8">
          <article className="tile is-child">
            <Editor {...this.props} />
          </article>
        </div>
      </div>
  }

}
