import { ClassRule, Styles } from 'jsx-alone-core';
import { JSXAlone } from 'jsx-alone-dom';
import * as monaco from 'monaco-editor';
import { dispatch } from '../main';
import { State } from '../store/types';
import { registerStyle } from '../style/styles';
import { query } from '../util/util';
import { isDesktop } from "../util/media";
import { Component } from './util/component';

interface P {
  state: State
}

let editor: monaco.editor.IStandaloneCodeEditor | undefined

export function getMonacoInstance(){
  return editor
}

export class Editor extends Component<P> {

  // protected updateExistingRemoveChildrenIfCountDiffer = false

  render() {
    const s = {
      editorContainer: {
        width: '100%',
        height: '100%',
      } as ClassRule
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
      monaco.editor.setTheme(this.getMonacoThemeFor())
      if (editor.getModel()!.getValue() !== this.props.state.editor.code) {
        console.warn(`strange: editor.getModel()!.getValue()!==this.props.state.editor.code`)
        editor.getModel()!.setValue(this.props.state.editor.code)
      }
    }
  }

  private getMonacoThemeFor(name=this.props.state.layout.theme.name): string {
    return name === 'dark' ? 'vs-dark' : 'vs';
  }

  protected installEditor() {
    if (editor) { return }
    let code = this.props.state.editor.code
    editor = monaco.editor.create(query('#editorContainer'), {
      value: code,
      language: 'typescript',
      theme: this.getMonacoThemeFor(),
      lineNumbers: isDesktop() ? 'on' : 'off',
      glyphMargin: isDesktop(),
      folding: isDesktop(),
      minimap: isDesktop() ? undefined : {
        enabled: false
      }
    })
    editor.getModel()!.onDidChangeContent(e => {
      code = editor!.getModel()!.getValue()
      // shouldnt need to set this.props...
      dispatch({ type: 'CHANGE_CODE', code })
    })
  }
}
