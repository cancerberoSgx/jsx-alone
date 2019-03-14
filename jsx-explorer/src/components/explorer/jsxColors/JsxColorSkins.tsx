import { JSXAlone } from 'jsx-alone-dom';
import { registerStyle } from '../../../style/styles';
import { Component } from '../../util/component';
import { SelectCode } from '../explorers';
import { JsxColorsState } from './jsxColorsTypes';
import { jsxColorSkins } from './skinsData';
import { dispatch } from '../../../store/store';
import { JSX_COLORS_ACTIONS } from '../../../store/jsxColors';

registerStyle(`
`);

interface P extends JsxColorsState {
  onSelectCode?(sel: SelectCode): void

}
export class JsxColorSkins extends Component<P> {
  render() {
    if(!this.props.selected){
      return <div className="JsxColorsSkins content">
      {!this.props.selected && <div>

        <h2>Select One</h2>

        <ul>{jsxColorSkins.map(s => <li>

          <h4>{s.name}</h4>
          {s.description && <p>{s.description}</p>}
          <button onClick={e =>
          
            dispatch({ type: JSX_COLORS_ACTIONS.SELECT_SKIN, payload: { selected: s } })
          }>Select</button>
        </li>)}</ul>
      </div>}

    </div>
    }
    else {
      return <div>IMPOSSIBLE</div>
    }
    
  }
}



