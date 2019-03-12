import { JSXAlone } from 'jsx-alone-dom'
import { State } from '../store/types'
import { registerStyle } from '../style/styles'
import { css } from '../util/media'
import { Header } from './header'
import { Component } from './util/component'
import { EditorExplorerMenu } from './editorExplorerMenu'
import { EditorExplorerBody } from './editorExplorerBody'

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
