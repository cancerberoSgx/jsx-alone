import { StatelessComponent, StatelessComponentProps, IStatelessComponent } from './StatelessComponent';
import * as ReactLike from './jsx';
import { printSource } from '../introspection/printThisScopeSource';

// type ComponentState = any;
export class StatefulComponent<P, S extends any = {}> extends StatelessComponent<P> implements IStatefulComponent<P, S>  {
  state: S = {} as any

  // constructor(props: P) {
  //   super(props)
  //   this.state = {} as any
  // }
  setState<K extends keyof S>(state: Pick<S, K> | S |null) {
    this.state = { ...this.state, ...state }
  }
    //   setState<K extends keyof S>(
    //     state: ((prevState: S
    //     callback?: () => void
    // ): void{
    //   this.state =state
    // }
  getState(): S{
        return this.state
  }
  // render(): JSX.Element {
  //   return super.render()
  // }
}

interface IStatefulComponent<P, S extends any = {}> extends IStatelessComponent<P>{
  state: S
  setState<K extends keyof S>(state: Pick<S, K> | S |null): void
  getState(): S
}


// export interface IScopeableComponent <P , S, Scope extends {props: P, state: S} ={props: P, state: S}> extends IStatefulComponent<P, S>{
//   // this:Scope
//   getScope(): Scope
//   render(this: Scope): JSX.Element
// }
// // scope extends {getScope: never,readonly props:Readonly< P>, readonly state: S
// export class ScopeableComponent<P , S, Scope extends {props: P, state: S}= {props: P, state: S}   > extends StatefulComponent<P, S> implements IScopeableComponent<P, S, Scope>{
//   // constructor(props: P) {
//   //   super(props)
//   // }

//   // decorator(target: Object, key: string): void { }
//   getScope(): Scope {
//     // throw 'implement me'
//     return {
//       props: this.props, 
//       state: this.state
//       // getScope: undefined
//     //   // props: printSource(this.props),
//     //   // state: printSource(this.state)
//     } as any
//   }

//  render( this:  Scope): JSX.Element
//   {
    
//     // this.props.
//     return super.render()
//   }
// }


// function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>{
//   console.log(target, propertyKey);
//   return {...descriptor, configurable: false}
  
// }


//  function dec2(target: Object, propertyKey: string | symbol, parameterIndex: number): void{}