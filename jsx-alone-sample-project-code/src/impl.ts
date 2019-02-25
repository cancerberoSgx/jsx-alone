import {JSXAlone as DomImpl} from 'jsx-alone-dom'
import {JSXAlone as StringImpl} from 'jsx-alone-string'
import { JSXAlone } from 'jsx-alone-core';

export function getJSXAlone(): JSXAlone<any>{
  //@ts-ignore
const name = typeof JSXAloneImplName__ === 'undefined' ? undefined : JSXAloneImplName__
debugger
  if(typeof name === 'undefined' || name==='string' ){
    return StringImpl
  }
  else {
    return DomImpl
  }
}