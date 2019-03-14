import { CSSProperties } from 'jsx-alone-core';
import { JSXAlone } from 'jsx-alone-dom';
import { registerStyle } from '../../../style/styles';
import { Component } from '../../util/component';
import { getPropertyDefaultValueForType, SupportedProperty } from './jsxColorsCssBuilder';

registerStyle(`
`);

interface P<T extends keyof CSSProperties= keyof CSSProperties> extends SupportedProperty<T> {

  onChange(newValue: CSSProperties[T]):void
}
export class JsxColorsPropertyEditor
<T extends keyof CSSProperties= keyof CSSProperties> 
extends Component<P<T>> {
  render() {
    return <div className="JsxColorsPropertyEditor">

<label>{this.props.propertyName||'property'} {this.props.propertyType||'text'}: <input type="color" value={this.props.propertyValue || getPropertyDefaultValueForType(this.props.propertyType)} 
onChange={e=>{
  debugger
this.props.onChange(e.currentTarget.value)}
}></input></label>
    </div>
  }
}


