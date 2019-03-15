import { AbstractJSXAlone as JSXAlone } from 'jsx-alone-core'

function test() {

  const people = [{ name: 'Sebastián', age: 12 }, { name: 'Laura', age: 22 }]
  const showContactForm = true;
  return <div className="people">

    <h1>People</h1>

    <p>This example contains lots of combinations of <i>JSX</i> so it's ideal to test
    <a href="https://cancerberosgx.github.io/jsx-alone/jsx-explorer/">JSX Syntax Highlight</a>
    </p>

    <hr className="hr" />

    <ul>{people.map((p, i) => <li data-id={`person_${i}`}>
      <strong {...p} className="name">{p.name}</strong> is
      <span {...p} className="age">{p.age}</span> years old
      <div>very
        <div>nested
          <p>
            {[0, 1].map(n =>
              <div style={{ ...{ ...{ margin: 0 } } }}>test</div>)}
          </p>
        </div> 
      </div>
    </li>)}
    </ul>

    <hr />
    <br />

    {showContactForm && <article>

      <h2 {...{ id: 'contactFormTitle' }}>Contact</h2>

      <label>Your name?
      <input onChange={e => console.log('changed')} />
      </label>

      <button className="button is-primary"
        onClick={e => alert(`submitted \${people.length} persons`)}>Submit</button>

    </article>
    }
  </div>
}