import {JSXAlone} from 'jsx-alone-string'

  const  app = <div className="foo">age: <span>{1+1}</span></div>
  const result = JSXAlone.render(app)