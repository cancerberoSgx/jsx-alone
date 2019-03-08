import { ClassRule, Styles } from 'jsx-alone-core';
import { JSXAlone } from 'jsx-alone-dom';
import * as monaco from 'monaco-editor';
import { State } from '../store/types';
import { registerStyle } from '../style/styles';
import { getMonacoInstance, installEditor } from '../util/monaco';
import { query } from '../util/util';
import { Component } from './util/component';

interface P {
  state: State
}
const s = {
  editorContainer: {
    width: '100%',
    height: '100%',
    minHeight: '800px',
    marginTop: '3em'
  } as ClassRule
}
registerStyle(s)

export class Editor extends Component<P> {

  neverUpdate = true

  render() {
    const { classes } = Styles(s)
    return <div id="editorContainer" className={classes.editorContainer} />
  }

  afterRender(e: HTMLElement) {
    super.afterRender(e)
    const editor = getMonacoInstance()
    this.eventManager && this.eventManager.addAppendToDomListener(() => {
      installEditor(this.props.state.editor.code, this.getMonacoThemeFor(), query('#editorContainer'))
    })
    if (editor) {
      // always set the theme - we dont know/cant getTheme in monaco to compare
      monaco.editor.setTheme(this.getMonacoThemeFor())
      if (editor.getModel()!.getValue() !== this.props.state.editor.code) {
        console.warn(`strange: editor.getModel()!.getValue()!==this.props.state.editor.code`)
        editor.getModel()!.setValue(this.props.state.editor.code)
      }
    }
  }

  private getMonacoThemeFor(name = this.props.state.layout.theme.name): string {
    return name === 'dark' ? 'vs-dark' : 'vs'
  }

}

