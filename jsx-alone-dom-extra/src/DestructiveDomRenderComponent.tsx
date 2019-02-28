import { JSXAlone } from './';
import { StatefulComponent } from './StatefulComponent';

/** 
 * implements stateful-ness by re-rendering it self again and again when the state changes. So it destroy its current
 * DOM nodes when the state changes and recreates them all again. Has some hacks to maintain current focus and children
 * state. 
 *
 * Preserves focus. 
 *
 * TODO: event listeners are not removed
 *
 * TODO: parent re-render actually resets the children (ISSUE)
 */
export abstract class DestructiveDomRenderComponent<P = {}, S = P> extends StatefulComponent<P, S> {
  /** changes the state, clean up containerEl and renders the element again and append it to containerEl.
   * Notice that descendant elements will be destroyed and */
  setState(s: Partial<S>) {
    super.setState(s);
    if(!this.containerEl){
      throw new Error('this.containerEl is undefined - cannot DestructiveDomRender')
    }
    let activePath: XPathResult | string | undefined;
    let selection: {
      start: number;
      end: number;
      direction?: string;
    } = { start: 0, end: 0 };
    if (document.activeElement) {
      activePath = getXPathOfElement(document.activeElement);
      selection = {
        start: (document.activeElement as HTMLInputElement).selectionStart || 0,
        end: (document.activeElement as HTMLInputElement).selectionEnd || 0,
        direction: (document.activeElement as HTMLInputElement).selectionDirection || undefined
      };
    }
    const jsx = this.render();
    const el = JSXAlone.render(jsx);
    this.containerEl.parentElement!.replaceChild(el, this.containerEl);
    this.containerEl = el as HTMLElement;
    if (activePath) {
      const activeEl = getElementByXPath(activePath + '') as HTMLInputElement;
      if (activeEl && selection) {
        activeEl.focus();
        if (activeEl.setSelectionRange) {
          activeEl.setSelectionRange(selection.start, selection.end, selection.direction as any);
        }
      }
    }
  }
}
//  TODO: move to misc
function getXPathOfElement(el: Element | string): string | undefined {
  if (typeof el == 'string') {
    return document.evaluate(el, document, null, 0, null) + '';
  }
  if (!el || el.nodeType != 1) {
    return '';
  }
  if (el.id)
    return "//*[@id='" + el.id + "']";
  if (el.parentNode) {
    const sames = Array.from(el.parentNode.children).filter(x => x.tagName == el.tagName);
    return (getXPathOfElement(el.parentNode as Element) +
      '/' +
      (el.tagName || '').toLowerCase() +
      (sames.length > 1 ? '[' + (sames.indexOf(el) + 1) + ']' : ''));
  }
  else {
    return undefined;
  }
}
//  TODO: move to misc
function getElementByXPath(path: string, predicate?: (n: Node) => boolean): Node | undefined {
  const p = document.evaluate(path, document, null, 0, null);
  if (!predicate) {
    return p.iterateNext();
  }
  try {
    let n;
    let n2;
    while ((n = p.iterateNext()) && !predicate(n)) {
      n2 = n;
    }
    return n2;
  }
  catch (e) {
    alert('Error: Document tree modified during iteration ' + e);
  }
}
