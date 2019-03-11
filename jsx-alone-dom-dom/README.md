# jsx-alone-dom-dom

A minimal DOM implementation that jsx-alone-dom supports

**IMPORTANT** THis is a very incomplete DOM implementation, very minimal, and not aim to be complete, just to provide DOM API that jsx-alone-dom implementation uses so it can be run without a DOM, like in node.js or web workers. 


## Usage

```sh
npm install -D jsx-alone-dom-dom
```

In a webworker or node.js without an existing DOM:

```ts
import { install } from '../document';

install()

const d = document.createElement('div')
d.setAttribute('id', 'i1')
document.body.appendChild(d)

const c = document.createElement('span')
c.setAttribute('class', 'ccc')
d.appendChild(c)
c.appendChild(document.createTextNode('This was generated using \n'+
  'jsx-alone-dom-dom little DOM  implementation')

console.log(document.body.outerHTML)

```

In an existing DOM, just for fun:

```ts
import { MDocument } from '../document';

const doc = new MDocument()

const d = doc.createElement('div')
d.setAttribute('id', 'i1')
doc.body.appendChild(d)

const c = doc.createElement('span')
c.setAttribute('class', 'ccc')
d.appendChild(c)
c.appendChild(doc.createTextNode('This was generated using \n'+
  'jsx-alone-dom-dom little DOM  implementation')

console.log(doc.body.outerHTML)
```


## Motivation, thoughts

This is not even for testing jsx-alone-dom (we already use jsdom), here som motivation

* run tests in the browser that run on a web worker. 
* render dom in a web worker to update the real DOM faster / diff / etc... 
