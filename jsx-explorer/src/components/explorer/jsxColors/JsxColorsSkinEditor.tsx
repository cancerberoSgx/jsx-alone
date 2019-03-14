import { JSXAlone } from 'jsx-alone-dom';
import { registerStyle } from '../../../style/styles';
import { Component } from '../../util/component';
import { SelectCode } from '../explorers';
import { JsxColorsState } from "./jsxColorsTypes";
import { JsxColorsPropertyEditor } from './JsxColorsPropertyEditor';
import { supportedProperties } from './jsxColorsCssBuilder';
import { dispatch } from '../../../store/store';
import { JSX_COLORS_ACTIONS } from '../../../store/jsxColors';

registerStyle(`
`);

interface P extends JsxColorsState{
  onSelectCode?(sel: SelectCode): void

}
export class JsxColorsEditor extends Component<P> {
  render() {
    if(this.props.selected){

      return <div className="JsxColorsSkinEditor">
      <h3>"{this.props.selected.name}" skin</h3>
      <p>Touch the controls, read the classes description, see how affect the syntax highlight in the editor!, ready?</p>
      
      <ul>
        {supportedProperties.map(p=><li>
          <JsxColorsPropertyEditor {...p} onChange={newVal =>{
      debugger
      const previous = {...this.props.predefined[0], ...this.props.selected||{}}
      const changed = { 
         ...previous,
        text: {
       
          ...previous.text, 
          color: newVal
      }}

      dispatch({type: JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED, payload: {
        changed
      } as any
    }
      )
  }}/>
        </li>)}
      
      </ul>
          </div>
    }

    else {
      return <div>IMPOSSIBLE</div>
    }
   

  }
}
