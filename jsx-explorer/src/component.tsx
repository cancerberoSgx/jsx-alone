import { ElementClass } from 'jsx-alone-dom';

 export abstract class Component<P> extends ElementClass<P> {
  update(props: P){
    
  }
}