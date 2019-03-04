import { ElementClass, JSXAlone } from 'jsx-alone-dom';
import { Component } from '../component';
import { Editor } from '../store/types';
import { evaluate } from '../util';
import { JsonImplOutputEl } from 'jsx-alone-core';

interface P {
  editor: Editor
}

export class Explorer extends Component<P> {
  render() {
    let r:JsonImplOutputEl
    try {
      r=evaluate(this.props.editor.code)
    } catch (error) {
      //TODO  
    }
    return <pre>{JSON.stringify(r!, null, 2)}</pre>
  }
  
}
