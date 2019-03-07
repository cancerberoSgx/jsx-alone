/*DONT CHANGE THIS FIRST LINE*/ import { ElementClass, AbstractJSXAlone as JSXAlone, ClassRule, ReactNode } from 'jsx-alone-core'; declare var PERSON_COUNT: number; declare var CONTACT_COUNT: number; declare var ADDRESS_COUNT: number; 

function exampleLotsOfComponents() {

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

  // type Children = ReactNode

  // <If> component

  interface IfProps<T> {
    c: any, p?: T, children: (...args: NotFalsy<T>[]) =>
      JSX.Element | (JSX.Element[]) | null
  }
  function If<T extends any = any>(props: IfProps<T>) {
    const f = Array.isArray(props.children) ? props.children[0] : props.children
    if (isNotFalsy(props.c)) {
      // console.log(props.children);

      return f.apply(null, [...(props.p ? [props.p] : []), props.c])
    }
    else {
      return null
    }
  }
  type NotFalsy<C= any> = Exclude<C, Falsy>
  type Falsy = null | '' | undefined | false
  function isNotFalsy<T>(a: T): a is NotFalsy<T> { return !!a }

  // THE APP

  // THE APP TyPES

  interface ContactModel {
    addresses: AddressModel[]
    phone: string
  }
  interface AddressModel {
    name: string,
    number: number
  }
  interface PersonModel {
    name: string,
    age: number
    contacts: ContactModel[]
  }

  // THE APP Styles

  const value: ClassRule = {
    fontWeight: 'bold'
  }
  const name: ClassRule = {
    ...value,
    border: '2px sold pink'
  }
  const number: ClassRule = {
    ...value,
    textTransform: 'italic'
  }
  const { styles, classes } = Style.build({ value, name, number })

  // The APP components

  const Name = (props: { name: string }) =>
    <If c={props.name !== 'Seba'}>{() =>
      <span className={classes.name}  data-test="name">{props.name}</span>
    }</If>

  const Age = (props: { age: number }) =>
    <If c={props.age !== 5}>{() =>
      <span className={classes.number} data-test="age">{props.age}</span>
    }</If>

  class Person extends ElementClass<PersonModel> {
    render() {
      return <div data-test="person" className="person">
        <Name name={this.props.name}></Name>
        <Age age={this.props.age}></Age>
        {this.props.contacts.map(a =>
          <Contact addresses={a.addresses} phone={a.phone} />)}
      </div>
    }
  }

  const Address = (props: AddressModel) => <span data-test="address">
    <span className={classes.name} data-test="address-name">{props.name}</span> number: <span className={classes.number} data-test="address-number">{props.number}</span>
  </span>

  class Contact extends ElementClass<ContactModel> {
    render() {
      return <div data-test="contact">
        <If c={this.props.addresses.length} p={this.props.addresses}>{addresses => addresses.map(ad =>
          <Address name={ad.name} number={ad.number} />)
        }</If>
      </div>
    }
  }

  class App extends ElementClass<AppProps> {
    render() {
      return <div>
        {this.props.people.map(p => <Person {...p} />)}
      </div>
    }
  }

  // MAIN
  function makeModel(personCount = PERSON_COUNT || 10, contactCount = CONTACT_COUNT || 5, addressCount = ADDRESS_COUNT || 3): PersonModel[] {

    return range(personCount).map(i => ({
      name: name(),
      age: int(2, 6),
      contacts: range(contactCount!).map(j => ({
        addresses: range(addressCount!).map(j => ({
          name: name(),
          number: int(10000, 100000)
        })),
        phone: int(1000000, 10000000) + ''
      }))
    })
    )
    function range(i: number) {
      return new Array(i).fill(0)
    }
    function int(a: number, b: number) {
      return Math.floor(Math.random() * b) + a
    }
    function item<T>(a: T[]): T {
      return a[int(0, a.length)]
    }
    function name() {
      return item(['Seba', 'Laura', 'Andres', 'Zapicán', 'Montezuma'])
    }

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
