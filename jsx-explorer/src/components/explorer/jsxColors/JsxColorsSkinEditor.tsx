import { CSSProperties } from 'jsx-alone-core';
import { JSXAlone } from 'jsx-alone-dom';
import { JSX_COLORS_ACTIONS } from '../../../store/jsxColors';
import { dispatch } from '../../../store/store';
import { registerStyle } from '../../../style/styles';
import { Component } from '../../util/component';
import { showInModal } from '../../util/showInModal';
import { SelectCode } from '../explorers';
import { jsxColorsClasses, ClassName } from './classesData';
import { JsxColorsPropertyEditor } from './JsxColorsPropertyEditor';
import { JsxColorsState, JsxSyntaxSkin } from "./jsxColorsTypes";
import { keys } from '../../../util/util';
import { allCssPropertyNames, getCssPropertyInfo } from './jsxColorsCssHelper';

registerStyle(`
`);

interface P extends JsxColorsState {
  onSelectCode?(sel: SelectCode): void

}
export class JsxColorsEditor extends Component<P> {
  render() {
    const { selected } = this.props
    if (selected) {

      return <article className="JsxColorsSkinEditor content">

        <h3>"{selected.name}" Skin</h3>

        <p>Touch the controls, read the classes description and see how affect the syntax highlight in the editor. If you like the current thing, you can get the actual CSS code or skin object definition with buttons below. Ready?</p>

        <button onClick={e => showInModal(<CurrentStyleCode {...this.props} />, 'Current skin styles CSS code')}>See style CSS code</button>

        <button onClick={e => showInModal(<SkinDefinition {...this.props} />, 'Current skin definition')}>See skin definition</button>


        <ul>{jsxColorsClasses.map(c => <li>
          <h4>{c.name}</h4>
          <p><i>{c.description}</i></p>

          <select onChange={e => {
            dispatch({ type: JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED, payload: { changed: { ...this.props.selected!, [c.name]: { ...this.props.selected![c.name] || {}, [e.currentTarget.value]: '' } } } })
          }}>
            <option>Add new Property</option>
            {allCssPropertyNames.map(p => <option value={p}>{p}</option>)}
          </select>

          <table>
            {this.props.selected![c.name]! && keys<keyof CSSProperties>(this.props.selected![c.name]!)
              .filter(p=>typeof this.props.selected![c.name]![p]!=='undefined')
              .map(p => getCssPropertyInfo(p))
              .map(p => <tr>

              <td>{p.propertyName}</td>
              <td>
                <JsxColorsPropertyEditor {...p}
                  propertyValue={selected[c.name] ? selected[c.name]![p.propertyName] : undefined}
                  onChange={newVal => {
                    const previous: JsxSyntaxSkin = {
                      // ...this.props.predefined[0],
                      ...selected || {}
                    }
                    const changed: JsxSyntaxSkin = {
                      ...previous,
                      [c.name]: {
                        ...previous[c.name],
                        [p.propertyName]: newVal,
                      }
                    }
                    dispatch({
                      type: JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED, payload: {
                        changed
                      } as any
                    })
                  }} />
              </td>
              <td><button onClick={e => {
            dispatch({ type: JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED, payload: { changed: { ...this.props.selected!, [c.name]: { ...this.props.selected![c.name] || {}, [p.propertyName]: undefined } } } })
          }}
          >Remove</button></td>
            </tr>)}
          </table>

        </li>)}
        </ul>
      </article>
    }

    else {
      return <div>IMPOSSIBLE</div>
    }


  }
}


const CurrentStyleCode = (props: P) => props.selectedSkinCurrentStyles ? <article>

  <h3>Styles for Light Themes</h3>
  <pre dangerouslySetInnerHTML={{ __html: props.selectedSkinCurrentStyles!.lightStyles }} />

  <h3>Styles for Dark Themes</h3>
  <pre dangerouslySetInnerHTML={{ __html: props.selectedSkinCurrentStyles!.darkStyles }} />

</article> : <div>Error: no skin styles ready yet</div>



const SkinDefinition = (props: P) => props.selected ? <article>

  <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(props.selected, null, 2) }} />

</article> : <div>Error: no skin styles ready yet</div>




