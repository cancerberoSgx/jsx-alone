import { JSXAlone } from 'jsx-alone-dom';
import { State } from '../store/types';
import { EditorExplorerBody } from './editorExplorerBody';
import { Header } from './header';
import { Component } from './util/component';

export interface P {
  state: State
}

export class App extends Component<P> {
  render() {
    return <section className="section">
      <Header {...this.props} />
        <EditorExplorerBody {...this.props}/>
      
    </section>
  }
}
