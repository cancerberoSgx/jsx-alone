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

export class Editor extends Component<P> {
  editor: monaco.editor.IStandaloneCodeEditor|undefined

  render() {
    const s = {
      editorContainer: {
        width: '100%',
        height: '600px',
        border: '1px solid grey'
      }
    }
    registerStyle(s)
    const {  classes } = Styles(s)
    return <div id="editorContainer" className={classes.editorContainer} />
  }
  afterRender(e: HTMLElement){
    super.afterRender(e)
    this.eventManager && this.eventManager.addAppendToDomListener(()=>{
      this.installEditor()
    })
  }
  update(){
    if(!this.editor){
      return true
    }
    // always set the theme - we dont know/cant getTheme to compare
    monaco.editor.setTheme(this.state.state.layout.theme.name)

    if(this.editor.getModel()!.getValue()!==this.state.state.editor.code){
      console.warn(`strange: this.editor.getModel()!.getValue()!==this.state.state.editor.code`)
      this.editor.getModel()!.setValue(this.state.state.editor.code)
    }
    return true
  }
  protected installEditor() {
    let code = this.state.state.editor.code
    this.editor = create({
      container: query('#editorContainer'),
      code,
      theme: this.state.state.layout.theme.name === 'dark' ? 'dark' : 'light'
    })
    this.editor.getModel()!.onDidChangeContent(e => {
      code = this.editor!.getModel()!.getValue()
      // shount need to set this.state...
      dispatch({ type: 'CHANGE_CODE', code })
    })
  }
}
