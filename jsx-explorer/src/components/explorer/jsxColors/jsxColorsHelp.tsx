import { JSXAlone } from 'jsx-alone-dom';
import { jsxColorsClasses } from './classesData';
import { buildSelectorFor } from './jsxColorsCssBuilder';


export const Help = () => <article className="content">

  <h1>JSX syntax highlight editor</h1>

  <p>Here, like in no other editor, you will be able to control every aspect of how your code is shown.</p>

  <p>Visualize the Language Abstract syntax tree playing with existing skins, and when you are ready go and create your own syntax highlight theme.</p>

  <p> have 100% control on  Use the menu below to learn how to use it, experiment existing JSx syntax themes and finally make your own!</p>

  <p>Hope you learn something about JSX syntax while visualizing its parts, and don't worry playing with different font sizes , decorations, colors, etc (nobody is watching)</p>

  <h3>CSS classes of JSX language elements</h3>

  (TODO: visually document these names)

  <h2>Visual Reference Example</h2>

  <div dangerouslySetInnerHTML={{__html: `
<span class="help-JSXTagTokens">&lt;</span>
<span class="help-JsxTagName">div</span>
&nbsp;
<span class="help-JsxAttributeName">className</span>
<span class="help-TODO">=</span><span class="help-JsxAttributeInitializer">".button .primary"</span>
<span class="help-JSXTagTokens">&gt;</span>
<span class="help-JSXText">Hello World</span>
<span class="help-JSXTagTokens">&lt;/</span>
<span class="help-JsxTagName">div</span>
<span class="help-JSXTagTokens">&gt;</span>


<ul>
<li><span class="help-JSXTagTokens">JSXTagTokens</span></li>
<li><span class="help-JsxAttributeInitializer">JsxAttributeInitializer</span></li>
<li><span class="help-JsxTagName">JsxTagName</span></li>
<li><span class="help-JsxAttributeName">JsxAttributeName</span></li>
<li><span class="help-JSXText">JSXText</span></li>
</ul>

<style>
.help-JSXTagTokens {
  background-color: pink; color: black; font-weight: bolder;
}
.help-JsxTagName {
  background-color: black; color: yellow; font-weight: bolder;
}
.help-JsxAttributeName {
  background-color: #559911; color: pink; font-weight: bolder;
}
.help-JsxAttributeInitializer {
  background-color: #ededed; color: blue; font-weight: bolder;
}
.help-JSXText {
  background-color: #444444; color: #22ff88; font-weight: bolder;
}
</style>
`}}></div>


  <h2>Classes</h2>


<ul>
  {jsxColorsClasses.map(c=><li><strong>{c.name}</strong><br/>Description: {c.description}<br/>Selector: <code>{buildSelectorFor(c)}</code></li>)}
  </ul>

  
</article>