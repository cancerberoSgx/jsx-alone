import { CSSProperties } from 'jsx-alone-core';
import { JSXAlone } from 'jsx-alone-dom';
import { registerStyle } from '../../../style/styles';
import { Component } from '../../util/component';
import { getPropertyDefaultValueForType, SupportedProperty, PropertyType } from './jsxColorsCssBuilder';

registerStyle(`
`);

interface P<T extends keyof CSSProperties= keyof CSSProperties> extends SupportedProperty<T> {
  onChange(newValue: CSSProperties[T]): void
}

export class JsxColorsPropertyEditor<T extends keyof CSSProperties= keyof CSSProperties> extends Component<P<T>> {

  render() {
    return <div className="JsxColorsPropertyEditor">

      {/* <label>{this.props.propertyName || 'property'}: */}

      <input type={this.getInputType(this.props.propertyType)} value={this.props.propertyValue || getPropertyDefaultValueForType(this.props.propertyType)}
        onChange={e => {
          this.props.onChange(e.currentTarget.value)
        }
        } />
      {/* </label> */}
    </div>
  }

  getInputType(t: PropertyType | undefined): string | undefined {
    return t === 'color' ? 'color' : t === 'size' ? 'string' : 'string'
  }
}


