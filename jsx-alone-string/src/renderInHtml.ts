import { ReactLike } from "./createElement";
import { RenderConfig } from './jsx';

export function renderInHTMLDocument(e: JSX.Element): string {
  return wrapInHtml(ReactLike.render(e, { indent: true, indentLevel: 1, renderClientCode: true }))
}

export function wrapInHtml(s: string): string {
  return `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
${s}
</body>
</html>
`;
}

/** sets innerHTML and calls children scripts if any */
export function setInnerHTML(elm: HTMLElement, html: string) {
  elm.innerHTML = html;
  elm.querySelectorAll("script").forEach(function (el) {
    let newEl = document.createElement("script");
    el.getAttributeNames().forEach(function (attrName) {
      newEl.setAttribute(attrName, el.getAttribute(attrName)!)
    });
    newEl.appendChild(document.createTextNode(el.innerHTML));
    el.parentNode!.replaceChild(newEl, el);
  })
}

export function renderInDOM(e: JSX.Element, el: HTMLElement | string, config?: RenderConfig) {
  if (typeof el === 'string') {
    const ell = document.querySelector(el)
    if (!ell) {
      throw 'Element not found ' + el
    }
    setInnerHTML(ell as HTMLElement, ReactLike.render(e, config))
  }
  else {
    setInnerHTML(el, ReactLike.render(e, config))
  }
}
