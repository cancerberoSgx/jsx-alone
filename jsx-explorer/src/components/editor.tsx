import { ClassRule, Styles } from 'jsx-alone-core'
import { JSXAlone } from 'jsx-alone-dom'
import * as monaco from 'monaco-editor'
import { State } from '../store/types'
import { registerStyle } from '../style/styles'
import { getMonacoInstance, installEditor } from '../monaco/monaco'
import { query } from '../util/util'
import { Component } from './util/component'
import { height } from '../util/media'
import { throttle } from '../util/debounce'
import { dispatch } from '../store/store'
import { EDITOR_ACTION } from '../store/editor'

interface P {
  state: State
}

registerStyle(`
.editorContainer {
  width: 100%;
  height: ${height()}px;
  margin-top: 3em;
}
`)

export class Editor extends Component<P> {

  neverUpdate = true
  lastTheme: string = 'vs'

  render() {
    return <div id="editorContainer" className="editorContainer" />
  }

  afterRender(e: HTMLElement) {
    super.afterRender(e)
    const editor = getMonacoInstance()

    // TODO : move this to a saga
    this.eventManager && this.eventManager.addAppendToDomListener(() => {
      installEditor(this.props.state.editor.code, this.getMonacoTheme(), query('#editorContainer'))
    })
    if (editor) { // TODO: move this to a saga
      if (this.props.state.layout.theme.name !== this.lastTheme) {
        monaco.editor.setTheme(this.getMonacoTheme())
      }

      // if (editor.getModel()!.getValue() !== this.props.state.editor.code) {
      //   console.warn(`strange: editor.getModel()!.getValue()!==this.props.state.editor.code`)
      //   editor.getModel()!.setValue(this.props.state.editor.code)
      // }
    }

  }

  private getMonacoTheme(name = this.props.state.layout.theme.name): string {
    this.lastTheme = name === 'dark' ? 'vs-dark' : 'vs'
    return this.lastTheme
  }

}
