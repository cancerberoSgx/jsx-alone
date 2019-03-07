import { AbstractElementClass as ElementClass, AbstractJSXAlone as JSXAlone, ClassRule, ReactNode } from 'jsx-alone-core';

export function exampleLotsOfComponents() {



  // <Style> component

  interface StyleProps {
    classes: { [name: string]: ClassRule },
    renderConfig?: { indent?: number }
  }
  class Style extends ElementClass<StyleProps> {
    private indent(n: number): string {
      return this.props.renderConfig && this.props.renderConfig.indent ? new Array(n * 2).fill(0).map(j => ' ').join('') : ''
    }
    private fixProperty(s: string): string {
      let t
      while (t = /([A-Z])/.exec(s)) {
        s = s.substring(0, t.index) + '-' + t[1].toLowerCase() + s.substring(t.index + 1, s.length)
      }
      return s
    }
    render() {
      const { classes } = this.props
      const __html = Object.keys(classes).map(c =>
        `${this.indent(1)}.${c}${(classes[c] && classes[c].selectorPostfix ? classes[c].selectorPostfix : '')} {${
        Object.keys(classes[c]).filter(p => p !== 'selectorPostfix').map(p => `${
          this.indent(2)}${this.fixProperty(p)}: ${classes[c][p as any]};`
        ).join(``)}
}`).join('\n')
      return <style dangerouslySetInnerHTML={{ __html }}></style>
    }
    static build<T extends { [k: string]: ClassRule }>(styles: T): { styles: T, classes: { [k in keyof T]: k } } {
      const classes: any = {}
      Object.keys(styles).forEach(k => {
        classes[k] = k
      })
      return {
        styles, classes
      }
    }
  }




  // <If> component

  interface IfProps<T> { c: any, p?: T, children: (...args: NotFalsy<T>[]) => JSX.Element }
  function If<T extends any = any>(props: IfProps<T>) {
    //const f = Array.isArray(props.children) ? props.children[0] : props.children
    if (isNotFalsy(props.c))
      return props.children.apply(null, [...(props.p ? [props.p] : []), props.c])
    else {
      return null
    }
  }
  type NotFalsy<C= any> = Exclude<C, Falsy>
  type Falsy = null | '' | undefined | false
  function isNotFalsy<T>(a: T): a is NotFalsy<T> { return !!a }




  // THE APP

  // THE APP TyPES

  interface Contact {
    addresses: Address[]
    phone: string
  }
  interface Address {
    name: string,
    number: number
  }
  interface Person {
    name: string,
    age: number
    contacts: Contact[]
  }



  // THE APP Styles

  const tableButton: ClassRule = {
    selectorPostfix: ' td',
    border: '1px solid #aaaaaa',
    padding: '2px',
    backgroundColor: '#ededed'
  }
  const tableButtonPrimary: ClassRule = {
    ...tableButton,
    fontWeight: 'bold',
    backgroundColor: 'red'
  }
  const { styles, classes } = Style.build({ tableButton, tableButtonPrimary })


  // The APP components

  const Name = (props: { name: string }) =>
    <span className="name" style={{ border: '2px sold pink' }}>{props.name}</span>

  const Age = (props: { age: number }) =>
    <span className="age">{props.age}</span>

  const Person = (props: Person) =>
    <div className="person">
      <Name name={props.name}></Name>
      <Age age={props.age}></Age>
      {props.contacts.map(a =>
        <Contact addresses={a.addresses} phone={a.phone}></Contact>)}
    </div>

  const Address = (props: Address) => <span>
    {props.name} number: {props.number}
  </span>

  const Contact = (a: Contact) => <div>
    Addresses:
{a.addresses.map(ad =>
      <div>Street 1: <Address name={ad.name} number={ad.number}></Address></div>)}
  </div>

  class Container<P> extends ElementClass<P & { Tag?: ((props: P) => JSX.Element) | (new (props: P) => JSX.Element), children: ReactNode }> {
    render() {
      const { children, Tag = (props: P) => <div>{children}</div> } = this.props
      return <Tag {...this.props}></Tag>
    }
  }

  class App extends ElementClass <AppProps>{
    render() {
      return <Container>
      </Container>

    }
  }


  // MAIN
  function makeModel(personCount: number = 10, contactCount = 5, addressCount = 2): Person[] {
    return [
      { name: 'seba', age: 18, contacts: [{ addresses: [{ name: 'foo', number: 1221 }], phone: '123123123' }] },
      { name: 'laura', age: 15, contacts: [{ addresses: [{ name: 'bar', number: 8787 }], phone: '987987987' }] }
    ]
  }

  return <App people={makeModel()}></App>
}




  // THE APP TYPES

  interface Contact {
    addresses: Address[]
    phone: string
  }
  interface Address {
    name: string,
    number: number
  }
  interface Person {
    name: string,
    age: number
    contacts: Contact[]
  }
  interface AppProps {
    people: Person[]
  }


