import { AbstractJSXAlone as JSXAlone } from 'jsx-alone-core'

function simple1() {
  const people = [{ name: 'Sebastián', age: 12 }, { name: 'Laura', age: 22 }]
  const t0 = Date.now()
  return <div className="people">
    <h1>People</h1>
    <ul>{people.map(p =>
      <li>
        <strong className="name">{p.name}</strong> is <span className="age">{p.age}</span> years old
      </li>)}
    </ul>
    <p>Listed {people.length} persons in {(Date.now() - t0) + ''} milliseconds. </p>
    <button className="button is-primary" onClick={e => alert(`submitted \${people.length} persons`)}>Submit</button>
  </div>
}
