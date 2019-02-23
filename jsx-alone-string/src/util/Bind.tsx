// better idea - probably this can be obsoleted by just using data-attributes, example:  instead of `<Bind name="foo"><input></input></Bind>` use `<input data-bind-name="foo"></input>`

import { formatDate } from '../../misc/formatDate';
import { array, checkThrow, unEscapeHtmlAttribute, escapeHtmlAttribute } from '../../misc/misc';
import { ReactLike } from '../createElement';
import { StatelessComponent } from '../StatelessComponent';
import { InputHTMLAttributes } from '../declarations/domElementDeclarations';

interface Data { [k: string]: any }
export interface BindProps {
  data?: Data
  name: string
  inputValue?: HTMLElement
}

const BIND_VALUE_ATTRIBUTE_NAME = 'data-bind-input-value-id'

/** 
 * Helper to bind data to the DOM and input element values so it can be easily retrieved from a function attribute like a click handler from the browser. This is necessary because in the browser's function attribute we don't have access to the server code scope. 
 * 
 *  * `<Bind data={{my: 'foo'}}>` or  `<Bind data={{my: 'foo'}} name="unique-key-123">` and `getBindData("unique-key-123")` : if no name is provided, then the data is associated with the first direct child and the element itself can be used to extract it with getBindData instead of using a key.
 * 
 *  * `<Bind inputValue="anElementOrUndefined" name="unique-key-333">` to declare an input element which value can be retrieved by name at any time from the browser (like a event handler function attribute)to bind. If no `inputValue` is given the first direct child found will be used to bind its value. It supports elements like <input> (type text, date, checkbox, number), <textarea>, <select>. Then the value of this element can be easily retrieved frmo a event handler function attribute by calling the global `getBindInputValue("unique-key-333")` 
 * 
 * Example:

```
{props.fields.map(f=><div>
<Bind bindInput={`foo-field-${f.id}`}>
  <input type="date" value={props.created}></input>
</Bind>
<Bind bindListener="foo-field-{f.id}""} data={Props}>
  <button onClick={e => {
    const {endpoint} = getBindData<Props>(e.currentTarget);
    let value = getBindInputValue<string>(e.currentTarget);
    fetch(`${endpoint}&value=${value}`)
      .then(r=>r.jsonResponse)
      .then(status=>alert(`Saved ${status}`))
  }}>
  Save</button>
</Bind>
```
 */

export class Bind<P extends BindProps = BindProps> extends StatelessComponent<P>{

  protected static counter = 0
  protected static BIND_VALUE_ATTRIBUTE_NAME = BIND_VALUE_ATTRIBUTE_NAME

  render(): JSX.Element {
    if (!this.props.data && this.props.name) {
      const id = `bind-input-value-element-${Bind.counter++}`

      if (typeof this.props.inputValue === 'undefined') {
        const c = this.firstChildElement()
        if (c) {
          c.attrs[Bind.BIND_VALUE_ATTRIBUTE_NAME] = id
        }
        else {
          // TODO: error debug
          return <span></span>
        }
      }
      else {
        this.props.inputValue.setAttribute(Bind.BIND_VALUE_ATTRIBUTE_NAME, id)
      }
      // TODO: add this statements in a single global <script> tag - could be a static el attribute
      return <span>
        <script>{`
__BindInputValues['${this.props.name}'] = {id: '${id}'};
`.trim()}
        </script>
      </span>

    }

    else if (this.props.data && this.props.name) {
      var id = Bind.counter++
      // TODO: add this statements in a single global <script> tag - could be a static el attribute
      return <span data-bind-id={id}>
        <script>{`
  var value = ${typeof this.props.data === 'function' ? this.props.data.toString() : JSON.stringify(this.props.data)};
__BindData['${this.props.name}'] = value
__BindData['${this.props.name}-${id}'] = value;
`.trim()}
        </script>
      </span>
    }

    else {
      // TODO: error debug
      return <span></span>
    }
  }

  public checkRegisteredCode() {
    if (!Bind.registered) {

      ReactLike.registerClientCode({
        name: 'getBindData',
        code: `
__BindInputValues = typeof __BindInputValues === 'undefined' ? {} : __BindInputValues;
__BindData = typeof __BindData === 'undefined' ? {} : __BindData;
var BIND_VALUE_ATTRIBUTE_NAME = '${Bind.BIND_VALUE_ATTRIBUTE_NAME}';
${getBindData.toString()};
${getBindDataOrThrow.toString()};
${unEscapeHtmlAttribute.toString()};
${escapeHtmlAttribute.toString()};
var createElement_1 = {unEscapeHtmlAttribute: unEscapeHtmlAttribute, escapeHtmlAttribute: escapeHtmlAttribute}; 
${formatDate.toString()}; var dateUtil_1 = {formatDate: formatDate}; 
`.trim(),
        description: `Gets data stored in the element declared ed with wrapper <StoreData><button...`
      })
    }

    ReactLike.registerClientCode({
      name: 'getBindInputValue',
      code: `
${getBindInputValue.toString()};
${array.toString()}; 
${checkThrow.toString()}; 
var misc_1 = {array: array, checkThrow: checkThrow}; 
`.trim(),
      description: `Gets the current input value declared with wrapper <BindInputValue><input...`
    })

    Bind.registered = true
  }

  protected static registered = false;
}


// TODO: perhaps is safer to put all js objects in a global variable instead of embedding them in the DOM element
function getBindData<T>(key: string, el?: HTMLElement): T | undefined {
  function findAncestor<T extends any = any>(el: HTMLElement, p: (a: HTMLElement) => T | undefined): T | undefined {
    return el && p(el) && findAncestor(el.parentElement!, p)
  }
  if (el) {
    const bindEl = findAncestor(el, a => {
      const els = a.querySelectorAll('[data-bind-id]')
      return els.length && els[0]
    })
    if (bindEl) {
      return __BindData[key + '-' + bindEl.getAttribute('data-bind-id')] || __BindData[key]
    }
  }
  return __BindData[key]
}


function getBindDataOrThrow<T>(key: string, el?: HTMLElement): T {
  return checkThrow(getBindData(key, el), 'Store data not found for key ' + key)
}

declare let __BindInputValues: { [k: string]: { id: string, onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'] } }
1
declare let __BindData: { [k: string]: any }



// type ElType = HTMLInputElement&HTMLSelectElement

function getBindInputValue<T extends InputValue, InputValue extends string | number | Date | boolean | string[] | number[]=  string | number | Date | boolean | string[] | number[], ElType extends HTMLInputElement & HTMLSelectElement = HTMLInputElement & HTMLSelectElement>(listenerElementOrInputElementOrKeyOrInputElementSelector: ElType | string, config: {
  asString?: boolean,
} = {}): T | undefined {

  let el: ElType | null = null
  if (typeof listenerElementOrInputElementOrKeyOrInputElementSelector === 'string') {
    // Can be a name:
    const id = __BindInputValues[listenerElementOrInputElementOrKeyOrInputElementSelector]
    const sel = id && id.id && `[${BIND_VALUE_ATTRIBUTE_NAME}="${id.id}"]`;
    el = sel && document.querySelector<ElType>(sel) ||
      // can be an input element selector
      document.querySelector<ElType>(listenerElementOrInputElementOrKeyOrInputElementSelector)
  }
  else {
    // can be a listener element
    const key = listenerElementOrInputElementOrKeyOrInputElementSelector.getAttribute(`${BIND_VALUE_ATTRIBUTE_NAME}`)
    if (key) {
      el = document.querySelector<ElType>(`[${BIND_VALUE_ATTRIBUTE_NAME}="${key}"]`)
    }
    if (!el) {
      // can be a input element
      el = listenerElementOrInputElementOrKeyOrInputElementSelector
    }
  }
  if (el) {
    if (el.type === 'date') {
      return (config.asString && el.valueAsDate) ? formatDate(el.valueAsDate, 'MM/DD/YYYY') : el.valueAsDate
    }
    else if (el.type === 'number') {
      return config.asString ? (el.valueAsNumber + '') : el.valueAsNumber as any
    }
    else if (el.type === 'checkbox') {
      return config.asString ? (el.checked ? 'T' : 'F') : !!el.checked as any
    }
    else if (el.tagName.toLowerCase() === 'select') {
      const selectedOptions = (el as any as HTMLSelectElement).selectedOptions
      if (selectedOptions && !el.getAttribute('multiple')) {
        return config.asString ? (selectedOptions.item(0)!.value + '') : selectedOptions.item(0)!.value as any
      }
      else if ((selectedOptions && el.getAttribute('multiple')) || !selectedOptions.length) {
        const a = array(selectedOptions.length).map(i => selectedOptions.item(i)!.value)
        return config.asString ? JSON.stringify(a) : a as any
      }
      else {
        //TODO debug msg
      }
    }
    else {
      //TODO debug msg
    }
    return config.asString ? (el.value + '') : el.value as any
  }
}
