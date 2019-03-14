import { registerStyle } from '../../../style/styles';
import { Component } from '../../util/component';
import { JSXAlone } from 'jsx-alone-dom'
import { JsxColorsState, JsxColorsTools } from "./jsxColorsTypes";
import { showInModal } from '../../util/showInModal';
import { SelectCode } from '../explorers';
import { Help } from './jsxColorsHelp';
import { JSX_COLORS_ACTIONS } from '../../../store/jsxColors';
import { JsxColorSkins } from './JsxColorSkins';
import { dispatch } from '../../../store/store';
import { JsxColorsEditor } from './JsxColorsSkinEditor';

registerStyle(`
`);

interface P extends JsxColorsState{
  onSelectCode?(sel: SelectCode): void

}
export class JsxColorsMain extends Component<P> {
  render() {
    return <div className="JsxColorsMain">
    <h3>JSX syntax highlight editor</h3>

    <p>Welcome! Use the menu below to learn how to use it, experiment existing JSx syntax themes and finally make your own!</p>

    <div className="tabs is-small is-boxed is-toggle editorExplorerOptions">
      <ul>
        <li className={`help`}>
          <a onClick={e => showInModal(<Help></Help>, 'JSX Syntax Highlight gallery and Editor')}>Help</a>
        </li>}
        <li className={`skins ${!this.props.selected  ? 'is-active' : ''}`}>
          <a onClick={e => this.selectTab('skins')}>Skins</a>
        </li>
        <li className={`editor ${this.props.selected ?  'is-active' : ''}`} >
          <a onClick={e => this.selectTab('editor')}>editor your own</a>
        </li>
      </ul>
    </div>


    <div className={`editorExplorerBody`}>
        <div className={`editorExplorerBodyOverlay`}>Working...</div>
        <div className={`editor editorExplorerBodyMember ${!this.props.selected ? 'is-active' : ''}`}>
          <JsxColorSkins {...this.props} />
        </div>
        <div className={`editorExplorerBodyMember jsxColorsEditor ${this.props.selected ? 'is-active' : ''}`}>
          <JsxColorsEditor {...this.props} />
        </div>
      </div>
    </div>
  }
 selectTab(tool:  JsxColorsTools) {
  dispatch({ type: JSX_COLORS_ACTIONS.CHANGE_TOOL, payload: { tool }})
 }

}



