import { ElementClass, JSXAlone } from 'jsx-alone-dom';
import { Component } from '../component';
import { Editor } from '../store/types';

interface P {
  editor: Editor
}

export class Explorer extends Component<P> {
  render() {
    return <div>{this.state.editor.code}</div>
  }
}
