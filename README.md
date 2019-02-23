# JSX Alone 

**Render JSX without libraries like React with 0 overhead**

 * Two implementations: 

   * **string**: to render JSX server side. Compatible with node.js, browser, rhino, Nashorn (and any es5 compatible JS engine)
   * **DOM**: to render JSX in the browser as HTML DOM Elements

 * Very lightweight
 * HTML DOM Typings: it contains typings for HTML DOM just like React so you can type-check your HTML templates
 * Core implementations (string, dom) have minimal or no support for features beyond JSX so we keep them KISS and lightweight: 
   * function attributes (event handlers) - . See below
   * stateful components
   * references
   * context
   * ...But expect auxiliary projects that add some of these in the future...

# String implementation

```
npm install jsx-alone-string
```

import { ReactLike } from 'jsx-alone-string'
