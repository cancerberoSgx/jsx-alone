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
  lastTheme: string = 'vs'

  render() {
    const { classes } = Styles(s)
    return <div id="editorContainer" className={classes.editorContainer} />
  }

  afterRender(e: HTMLElement) {
    super.afterRender(e)
    const editor = getMonacoInstance()
    this.eventManager && this.eventManager.addAppendToDomListener(() => {
      installEditor(this.props.state.editor.code, this.getMonacoTheme(), query('#editorContainer'))
    })
    if (editor) {
      if(this.props.state.layout.theme.name!==this.lastTheme){
        monaco.editor.setTheme(this.getMonacoTheme())
      }
      if (editor.getModel()!.getValue() !== this.props.state.editor.code) {
        console.warn(`strange: editor.getModel()!.getValue()!==this.props.state.editor.code`)
        editor.getModel()!.setValue(this.props.state.editor.code)
      }
    }
  }

  private getMonacoTheme(name = this.props.state.layout.theme.name): string {
    this.lastTheme= name === 'dark' ? 'vs-dark' : 'vs'
    return this.lastTheme
  }

}

