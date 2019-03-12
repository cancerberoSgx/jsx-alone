import { JSXAlone } from 'jsx-alone-dom'
import { State } from '../store/types'
import { Styles } from '../style/styles'
import { App } from './app'
import { Component } from './util/component'

export class Main extends Component<{
  state: State;
}> {
  render() {
    return <div>
      <App state={this.props.state} />
      <Styles theme={this.props.state.layout.theme} />
    </div>
  }
  onStateUpdate(state: State) {
    this.updateProps({ state })
  }
}