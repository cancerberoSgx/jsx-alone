import { CSSProperties } from 'jsx-alone-core';
import { JSXAlone } from 'jsx-alone-dom';
import { registerStyle } from '../../../style/styles';
import { Component } from '../../util/component';
import { CSSPropertyInfo, PropertyType } from "./jsxColorsCssHelper";

registerStyle(`
`);

interface P<T extends keyof CSSProperties= keyof CSSProperties> extends CSSPropertyInfo<T> {
  onChange(newValue: CSSProperties[T]): void
}

export class JsxColorsPropertyEditor<T extends keyof CSSProperties= keyof CSSProperties> extends Component<P<T>> {

  render() {
    return  <input 
    className="JsxColorsPropertyEditor" 
    type={getInputType(this.props.propertyType)} 
    value={this.props.propertyValue || getDefaultPropertyValue(this.props.propertyType)}
    onChange={e => {
      this.props.onChange(e.currentTarget.value)
    }
    } />
  }

  
}

function getInputType(t: PropertyType | undefined): string | undefined {
  return t === 'color' ? 'color' : t === 'size' ? 'string' : 'string'
}

function getDefaultPropertyValue(t?: PropertyType) {
  return t === 'string' ? '' : t === 'size' ? '1em' : 'sans-serif'
}
