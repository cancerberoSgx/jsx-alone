import { JSXAlone } from 'jsx-alone-dom'
import { Component } from '../util/component'
import { Children, unique } from 'jsx-alone-core';

interface P {children: JSX.Element|JSX.Element[], amount: number, id?: string}
export class Virtual extends Component<P> {
  render() {
    const id = this.props.id||unique('virtual')
    if(!Virtual.ids[id]){
      Virtual.ids[id]={id, amount: this.props.amount|-1, currentAmount: 0}
    }
    const v = Virtual.ids[id]
    const c = Array.isArray(this.props.children) ? this.props.children : [this.props.children]
    v.amount = this.props.amount|v.amount|-1
    const children = v.currentAmount>=v.amount ? [] : v.amount===-1 ? c :  c.slice(0, Math.min(c.length,v.amount-v.currentAmount))
    v.currentAmount+=children.length
    return <div onFocus={e=>
    this.updateProps({amount: -1})}>
      {children }
    </div>
  }
  protected static ids:  {[i:string]:{id:string, amount:number, currentAmount:number}}={}
}
