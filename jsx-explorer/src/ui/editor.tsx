import { Styles } from 'jsx-alone-core';
import { ElementClass, JSXAlone } from 'jsx-alone-dom';
import { store } from '../main';
import { create } from '../monaco';
import { State } from '../store/types';
import { query } from '../util';
import { registerStyle } from './styles';

interface P {
  state: State
}

export class Editor extends ElementClass<P> {
 
  render() {
    const s = {
    editorContainer: {
      width: '100%',
      height: '600px',
      border: '1px solid grey'
    }
  }

  registerStyle(s)

  const { styles, classes } = Styles(s)
    return  <div id="editorContainer" className={classes.editorContainer}/>
  }

  afterRender(){
    this.eventManager!.addAppendToDomListener(()=>{
      this.installEditor()
    })
  }

  protected installEditor() {
    let code = this.props.state.editor.code
    const ed = create({
      container: query('#editorContainer'),
      code,
      theme: this.props.state.layout.theme.name === 'dark' ? 'dark' : 'light'
    })
    ed.getModel()!.onDidChangeContent(e => {
      code = ed.getModel()!.getValue()
      store.dispatch({type: 'CHANGE_CODE', code})
    })
  }
}
