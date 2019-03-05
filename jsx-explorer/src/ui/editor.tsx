import { Styles } from 'jsx-alone-core';
import { ElementClass, JSXAlone } from 'jsx-alone-dom';
import { create } from '../monaco';
import { State } from '../store/types';
import { query } from '../util';
import { registerStyle } from '../style/styles';
import { Component } from '../component';
import * as monaco from 'monaco-editor'
import { dispatch } from '../main';

interface P {
  state: State
}

let editor: monaco.editor.IStandaloneCodeEditor | undefined

export class Editor extends Component<P> {
  render() {
    const s = {
      editorContainer: {
        width: '100%',
        height: '600px',
        border: '1px solid grey'
      }
    }
    registerStyle(s)
    const { classes } = Styles(s)
    return <div id="editorContainer" className={classes.editorContainer} />
  }
  afterRender(e: HTMLElement) {
    super.afterRender(e)
    this.eventManager && this.eventManager.addAppendToDomListener(() => {
      this.installEditor()
    })

    if (editor) {
      // always set the theme - we dont know/cant getTheme to compare
      monaco.editor.setTheme(this.props.state.layout.theme.name === 'light' ? 'vs' : 'vs-dark')

      if (editor.getModel()!.getValue() !== this.props.state.editor.code) {
        console.warn(`strange: editor.getModel()!.getValue()!==this.props.state.editor.code`)
        editor.getModel()!.setValue(this.props.state.editor.code)
      }
    }
  }
  protected installEditor() {
    if (editor) { return }
    let code = this.props.state.editor.code
    editor = create({
      container: query('#editorContainer'),
      code,
      theme: this.props.state.layout.theme.name === 'dark' ? 'dark' : 'light'
    })

    editor.getModel()!.onDidChangeContent(e => {
      code = editor!.getModel()!.getValue()
      // shount need to set this.props...
      dispatch({ type: 'CHANGE_CODE', code })
    })
  }
}
