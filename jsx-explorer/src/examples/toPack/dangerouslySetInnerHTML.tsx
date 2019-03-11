import { AbstractJSXAlone as JSXAlone } from 'jsx-alone-core'

function sample() {
  const name = 'Rambo', suffix = 'Mister'
  return <div className="simple2">Hello
    <span dangerouslySetInnerHTML={{__html: `\n<strong>${suffix}</strong>\n<em className="name">${name}</em>\n`}}>
    </span>!
  </div>
}
