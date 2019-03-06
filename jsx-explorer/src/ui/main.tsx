import { State } from '../store/types';
import { Styles } from '../style/styles';
import { App } from './app';
import { Component } from './util/component';
import { EventManager, JSXAlone } from 'jsx-alone-dom';

export class Main extends Component<{
  state: State;
}> {
  render() {
    return <div>
      <App state={this.props.state} />
      <Styles theme={this.props.state.layout.theme} />
    </div>;
  }
}
