import { ReactLike } from "../createElement";
import { StatelessComponent, StatelessComponentProps } from '../StatelessComponent';
import { Bind } from './Bind';

declare function getBindData<T>(key: string, el : any): T|undefined

interface SelectProps extends StatelessComponentProps<SelectProps>{
  options: (string|Option)[]
  selected?: string
  onChange?: (value?: string) => void;
  firstOption?: string;
  'select-attrs'?: {[k:string]:string}
}
type Option = {
  name: string;
  id: string;
};

export class Select extends StatelessComponent<SelectProps> {
  static counter=0
  render() {
    const options: Option[] = (this.props.options.length && typeof this.props.options[0] === 'string') ? (this.props.options as string[]).map(o => ({ id: o, name: o })) : this.props.options as Option[];

    const id = ''//(Select.counter++)+new Date().getTime()
    return <span>
      {this.props.onChange ? <Bind name={`Select-${id}`} data={this.props.onChange}></Bind> : ''}
      <select {...this.props['select-attrs']||{}} data-select-id={id} onChange={e=>{
        const value = e.currentTarget.selectedOptions[0].value
        const id = e.currentTarget.getAttribute('data-select-id')
        const f = getBindData<SelectProps['onChange']>(`Select-${id}`, this)
        f && f(value)
      }}>
        {this.props.firstOption ? <option>{this.props.firstOption}</option> : ''}
        {options.map(o => <option selected={this.props.selected==o.id} value={o.id}>{o.name}</option>)}
      </select>
    </span>;
  }
}