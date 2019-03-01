import { JSXAlone, ElementClass } from 'jsx-alone-dom'

class App extends ElementClass<{
  name: string;
  tasks: string[];
}> {
  render() {
    return <article>

    </article>
  }
  dummy(n: any) { return n + '_dummy' }
}

const app = <App name="John Doe" tasks={['Wash dishes', 'Go outside', 'Play soccer']} />
const el = JSXAlone.render(app)
document.body.appendChild(el)
