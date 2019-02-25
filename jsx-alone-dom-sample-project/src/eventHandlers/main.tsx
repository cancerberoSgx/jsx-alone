


import { lotsOfPeople, Renderer, printMs, LotsOfPeopleRendererConfig } from 'jsx-alone-sample-project-code'
import { JSXAlone, ElementClass } from 'jsx-alone-dom'
import { MouseEvent, AbstractCoreMouseEvent, Children } from 'jsx-alone-core';



class Button extends ElementClass<{onClick:(event: MouseEvent<HTMLButtonElement, AbstractCoreMouseEvent>) => void, children:  string}> {
  render(){
    return <button onClick={this.props.onClick}>{this.props.children}</button>
  }
}

class Container extends ElementClass<{children:Children}> {
  render(){
    return <div>{this.props.children}</div>
  }
}

class App extends ElementClass<{
  name: string;
  tasks: string[];
}> {
  foo(){
    return printMs(Date.now())
  }
  render(){
    return <Container>
       <p> just some tests for function attributes context
        <button onClick={e=>{
          console.log(this.props.name, this.foo())
        }}>Render!</button>
         <Container> <button onClick={e=>{
          console.log(this.props.name, this.foo())
        }}>sss!</button></Container>
        <Button onClick={e=>{
          console.log(this.props.name, this.foo())
        }}>second</Button>
      </p>

    </Container>
  }
}




// render the App and append the generated element to body
const app = <App name="John Doe" tasks={['Wash dishes', 'Go outside', 'Play soccer']} />;
const el = JSXAlone.render(app);
document.body.appendChild(el)
