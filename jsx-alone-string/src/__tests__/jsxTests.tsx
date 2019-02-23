import { describe, expect, fail, it, skip } from "../../spec/index";
import { ReactLike } from '../createElement'
import { StatelessComponent } from '../StatelessComponent';
import { ReactLikeChild, NodeLike } from '../jsx';
import { StringKeyOf } from '../../misc/typesUtil';
import { expectCodeToContain } from '../../spec/expectExtras';
import { isElementLike } from '../elementImpl';
import { Style } from '../Style';
import { escapeHtmlAttribute } from '../../misc/misc';

export function jsxTests() {

  describe('ReactLike render', () => {
    it('support custom tags as functions', () => {
      interface Apple { color: string }
      const Apple = (props: { apple: Apple }) => <div className="apple">I'm a {props.apple.color} apple</div>
      const Main = (props: { apples: Apple[] }) => <div>
        <h1>A list of apples</h1>
        <ul>
          <li>{props.apples.map(a => <Apple apple={a}></Apple>)}</li>
        </ul>
      </div>
      const apples = [{ color: 'red' }, { color: 'blue' }]
      const s = ReactLike.render(<Main apples={apples}></Main>, { indent: true })
      expect(s).toContain('<div class="apple">')
      expect(s).toContain(`I'm a red apple`)
      // console.log(s)
    })

    it('supports typed css properties', () => {
      const Comp = () => <div className="apple" style={{ border: '1px solid pink', background: 'blue' }}>i'm pink</div>
      const Main = () => <div>
        <Comp></Comp>
      </div>
      const s = ReactLike.render(<Main></Main>, { indent: true })
      expect(s).toContain('style="border: 1px solid pink; background: blue"')
      expect(s).toContain(`i'm pink`)
      // console.log(s)
    })

    it('stateless component', () => {
      interface PersonModel {
        name: string,
        friends: PersonModel[]
      }
      class Person extends StatelessComponent<PersonModel>{
        render(): JSX.Element {
          return <div>
            <div>Name: {this.props.name}</div>
            <div>Friends:
            <ul>
                {this.props.friends.map(f => <Person name={f.name} friends={f.friends}></Person>)}
              </ul>
            </div>
          </div>
        }
      }
      const p0 = { name: 'flo', friends: [] }
      const p1 = { name: 'seba', friends: [p0] }
      const persons: PersonModel[] = [p0, p1]
      const main = <div>
        <p>Some people:</p>
        {persons.map(p => <Person name={p.name} friends={p.friends}></Person>)}
      </div>
      const s = ReactLike.render(main, { indent: true })
      expect(s).toContain('Name: flo')
      expect(s).toContain('Name: seba')
      // console.log(s);
    })

    it('function attributes', () => {
      const main = <div>
        <button onClick={e => { alert("foo\nhello") }}>click me</button>
      </div>
      const s = ReactLike.render(main, { indent: true })
      // console.log(s); // to be tested in the browser
    })



    it('Style tag : typed styles', () => {
      interface Class extends Partial<CSSStyleDeclaration> { }
      const button: Class = {
        border: '2px solid pink',
        padding: '5px'
      }
      // this rule extends another:
      const primaryButton: Class = {
        ...button,
        color: 'red',
        fontWeight: 'bolder'
      }
      const myStyles = {
        button,
        primaryButton
      }

      // this tag will force users to use discrete classNames only
      const Button = (props: { className?: StringKeyOf<typeof myStyles>, children?: ReactLikeChild | ReactLikeChild[] }) => <button className={props.className || ''}></button>

      const main = <div> hello
        <Style classes={myStyles}></Style>
        <article><Button className="button">click me</Button></article>
      </div>

      const s = ReactLike.render(main, { indent: true })
      // console.log(s)
      expect(s).toContain('border: 2px solid pink;')
      expectCodeToContain(s, `
      <div> hello<style> .button { border: 2px solid pink; padding: 5px; }; .primaryButton { border: 2px solid pink; padding: 5px; color: red; fontWeight: bolder; } </style><article> <button class="button"> click me </button> </article> </div>
  `)
    })

    it('custom el affecting children', ()=>{
      interface Props {
        data: {[k:string]:string}
      }
      class Data extends StatelessComponent<Props>{
        render(): JSX.Element {
          if(!this.props.children){return <span></span>}
          const children = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]) as NodeLike[]
          children.forEach(c=>{
            if(!isElementLike(c)){return }
            c.attrs = {...(c.attrs||{}), 'data-data': escapeHtmlAttribute(JSON.stringify(this.props.data))}
          })
          return <span></span>
        }
      }
      const s = ReactLike.render(<Data data={{g: 'asd'}}><span className="child1">hello</span></Data>, { indent: true })
      expectCodeToContain(s, `<span>
      <span class="child1" data-data="{&quot;g&quot;:&quot;asd&quot;}">
        hello
      </span>
    </span>
    `)
    })

    // console.log(ReactLike.render(<Main apples={apples}></Main>, { indent: true }));
  })


}