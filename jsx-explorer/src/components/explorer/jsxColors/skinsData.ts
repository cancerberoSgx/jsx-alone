import { JsxColorSkins } from './JsxColorSkins';
import { JsxSyntaxSkin } from './jsxColorsTypes';

export const jsxColorSkins: JsxSyntaxSkin[] = [
  {
    name: "crazy",
    description: "first toy",
    JsxTagName: {
      backgroundColor: "#fdecff",
      color: "#ff3131",
      fontSize: "1.3em",
      fontWeight: "bold"
    },
    JsxText: {
      fontSize: "1.2em",
      color: "#583d11",
      fontVariant: "petite-caps",
      fontStyle: "italic",
      textShadow: "-3px -2px 5px #3e1919a6",
      fontFamily: "serif"
    },
    JsxAttributeEqualsToken: {
      fontSize: "1.3em",
      fontWeight: 800,
      color: "#ce03da"
    },
    JsxAttributeName: {
      backgroundColor: "#fff0e0",
      fontFamily: "monospace",
      color: "#005b28"
    },
    JsxAttributeInitializer: {
      color: "#005619",
      textDecoration: "underline",
      textShadow: "3px -3px 3px #145f06a6"
    },
    JsxExpression: {
      color: "#3664ff",
      fontSize: "1.4em"
    },
    JSXTagTokens: {
      color: "#4958ff",
      fontSize: "1.3em",
      backgroundColor: "#fdecff"
    }
  },
  
  {
    name: "Open Close",
    description: "Differentiate opening and closing tags with colors",
    JSXTagTokensOpeningElement: {
      backgroundColor: "#c1ffb0",
      color: "#047200",
      fontWeight: "bolder"
    },
    JSXTagTokensClosingElement: {
      backgroundColor: "#ffdede",
      color: "#900000",
      fontWeight: "bolder"
    },
    JSXTagTokensSelfClosingElement: {
      color: "#010477",
      backgroundColor: "#ccd5ff",
      fontWeight: "bolder"
    },
    JsxTagNameOpeningElement: {
      color: "#06a000",
      fontWeight: "bolder",
      backgroundColor: "#c1ffb0"
    },
    JsxTagNameClosingElement: {
      backgroundColor: "#ffdede",
      color: "#8d0404",
      fontWeight: "bolder"
    },
    JsxText: {
      color: "#51567c"
    },
    JsxTagNameSelfClosingElement: {
      color: "#041cda",
      backgroundColor: "#ccd5ff",      
      fontWeight: "bolder",
    },
    JsxAttributeInitializer: {
      color: "#60611a"
    },
    JsxAttributeName: {
      color: "#b302ca"
    },
    JsxAttributeEqualsToken: {
      color: "#0090ff"
    }
  }
]