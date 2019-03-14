import { JSXAlone } from 'jsx-alone-dom';
import { registerStyle } from '../../../style/styles';
import { Component } from '../../util/component';
import { SelectCode } from '../explorers';
import { JsxColorsState, JsxSyntaxSkin } from "./jsxColorsTypes";
import { JsxColorsPropertyEditor } from './JsxColorsPropertyEditor';
import { supportedProperties } from './jsxColorsCssBuilder';
import { dispatch } from '../../../store/store';
import { JSX_COLORS_ACTIONS } from '../../../store/jsxColors';
import { ClassName } from './classesData';
import { getEnumKey, enumKeys } from '../../../util/util';

registerStyle(`
`);

interface P extends JsxColorsState {
  onSelectCode?(sel: SelectCode): void

}
export class JsxColorsEditor extends Component<P> {
  render() {
    if (this.props.selected) {

      return <div className="JsxColorsSkinEditor content">
        <h3>"{this.props.selected.name}" skin</h3>
        <p>Touch the controls, read the classes description, see how affect the syntax highlight in the editor!, ready?</p>
        <ul>
          {enumKeys<keyof typeof ClassName>(ClassName).map(className=><li>
            <h4>{className}</h4>
            <ul>
          {supportedProperties.map(p => <li>
            <JsxColorsPropertyEditor {...p} onChange={newVal => {
              const previous: JsxSyntaxSkin = { 
                ...this.props.predefined[0], 
                ...this.props.selected || {} }
              const changed: JsxSyntaxSkin = {
                ...previous,
                [className]: {
                  ...previous[className],
                  [p.propertyName]: newVal,
                }
              }

              dispatch({
                type: JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED, payload: {
                  changed
                } as any
              }
              )
            }} />
          </li>)}

        </ul>


          </li>)}
        </ul>

      </div>
    }

    else {
      return <div>IMPOSSIBLE</div>
    }


  }
}
