import { ElementClass, JSXAlone } from 'jsx-alone-dom';
import { Component } from '../component';
import { Editor, Status } from '../store/types';


export class Logger extends Component<{status: Status}> {
  render() {
    return <div>
      <h3>Logs</h3>
      <ul>{this.state.status.logs.map(l=><li>{l}</li>)}</ul>
    </div>
  }
}
