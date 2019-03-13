import { Page } from 'puppeteer';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHave(options: ToHaveOptions): R
    }
  }
}

// TODO: also if there are more than one matching element, we could have more verbs like all include, some include, some equals,etc
interface TextCompareOptions {
  caseInsensitive?: boolean;
  verb?: Verb;
  asCode?: boolean;
  extractAs?: ExtractAs;
}

type Verb = 'includes' | 'included' | 'equals' | 'startsWith' | 'endsWith';

type ExtractAs = 'innerHTML' | 'outerHTML' | 'textContent';

interface ToHaveOptions extends TextCompareOptions {
  selector: string;
  text?: string;
}

/** A general HTML element query utility with emphasis on matching text. WIP */
expect.extend({
  async toHave(page: Page, options: ToHaveOptions) {
    const r = await page.evaluate((selector: string, extractAs: ExtractAs) => {
      const e = document.querySelector(selector);
      // TODO: support multiple matches
      if (e) {
        if (extractAs === 'innerHTML') {
          return e.innerHTML;
        }
        else if (extractAs === 'outerHTML') {
          return e.outerHTML;
        }
        else if (extractAs === 'textContent') {
          // else throw new Error('')
          return e.textContent;
        }
      }
      else {
        return undefined;
      }
      return e ? e.outerHTML : undefined;
    }, options.selector, options.extractAs || 'outerHTML');
    if (!r) {
      return {
        pass: false,
        message: () => `expected page to have element that matches "${options.selector}"`
      };
    }
    if (options.text) {
      let expected = buildValue(options.text, options);
      const actual = buildValue(r, options);
      if (options.verb === 'equals') {
        if (expected != actual) {
          return {
            pass: false,
            message: () => `expected page to have an element "${options.selector}" with text equals to "${expected}" but "${actual}" was found instead`
          };
        }
        else {
          return {
            pass: true,
            message: () => `expected page not to have an element "${options.selector}" with text equals to "${expected}"`
          };
        }
      }
      else if (!options.verb || options.verb === 'includes') {
        if (!actual.includes(expected)) {
          return {
            pass: false,
            message: () => `expected page to have an element "${options.selector}" text including "${expected}" but "${actual}" was found instead `
          };
        }
        else {
          return {
            pass: true,
            message: () => `expected page not to have an element "${options.selector}" with text including "${expected}"`
          };
        }
      }
      else {
        return {
          pass: false,
          message: () => `Matcher toHave() implementation is not finished yet`
        };
      }
    }
    else {
      return {
        pass: true,
        message: () => `expected page not to have element that matches "${options.selector}"`
      };
    }
  }
})

function buildValue(text: string, options: TextCompareOptions) {
  if (options.caseInsensitive) {
    text = text.toLowerCase();
  }
  if (options.asCode) {
    text = text.replace(/\s+/g, ' ').trim();
  }
  return text;
}


