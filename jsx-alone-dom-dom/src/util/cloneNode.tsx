import { MDocument } from '../document';
import { MNode } from '../node';
import { isElement } from "./nodeUtil";
export function cloneNode(d: Node, doc: MDocument): MNode {
  if (d.nodeType === Node.TEXT_NODE && d.textContent) {
    return doc.createTextNode(d.textContent);
  }
  else if (isElement(d)) {
    const o = doc.createElement(d.tagName);
    Array.from(d.attributes).forEach(a => o.getAttribute(a.name) && o.setAttribute(a.name, o.getAttribute(a.name)!));
    Array.from(d.childNodes).forEach(c => {
      o.appendChild(cloneNode(c, doc));
    });
    return o;
  }
  else {
    throw 'node type not supported ' + d.nodeType;
  }
}
