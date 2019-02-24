import { ElementClass } from 'jsx-alone-dom';
import { People } from './People';
import { JSXAlone } from 'jsx-alone-dom';
import { Props } from './types';
export class App extends ElementClass<Props> {
  render() {
    return <People people={this.props.people} />;
  }
}
