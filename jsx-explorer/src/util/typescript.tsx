import { ts } from 'ts-simple-ast'

export function compileTs(code: string) {
  code = code.split('\n').filter(l=>!l.startsWith('import ')).join('\n')
  const res = ts.transpileModule(code, {
    compilerOptions: {
      target: 'es2018',
      rootDir: '.',
      strict: false,
      lib: ['es2018'],
      module: ts.ModuleKind.None,
      jsx: 'react',
      jsxFactory: 'JSXAlone.createElement'
    }
  } as any)
  return res.outputText
}

export function createProgram(files: {
  fileName: string;
  content: string;
  sourceFile?: ts.SourceFile;
}[], compilerOptions?: ts.CompilerOptions): ts.Program {
  const tsConfigJson = ts.parseConfigFileTextToJson('tsconfig.json', compilerOptions ? JSON.stringify(compilerOptions) : `{
    "compilerOptions": {
      "target": "es2018",
      "module": "commonjs",
      "lib": ["es2018"],
      "rootDir": ".",
      "strict": false,
      "esModuleInterop": true,
    }
  }`)
  const { options, errors } = ts.convertCompilerOptionsFromJson(tsConfigJson.config.compilerOptions, '.')
  if (errors.length) {
    throw errors
  }
  const compilerHost = ts.createCompilerHost(options)
  compilerHost.getSourceFile = function(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): ts.SourceFile | undefined {
    const file = files.find(f => f.fileName === fileName)
    if (!file) {
      return undefined
    }
    file.sourceFile = file.sourceFile || ts.createSourceFile(fileName, file.content, ts.ScriptTarget.ES2015, true)
    return file.sourceFile
  }
  return ts.createProgram(files.map(f => f.fileName), options, compilerHost)
}

/**
 * Iterates recursively over all children of given node and apply visitor on each of them. If visitor returns
 * non falsy value then it stops visiting and that value is returned to the caller. See
 * https://en.wikipedia.org/wiki/Tree_traversal for the meaning of "DeepFirst".
 *
 * @param getChildrenMode if true it will use `node.getChildren()` o obtain children instead of default
 * behavior that is using `node.forEachChild`
 */
export function visitChildrenRecursiveDeepFirst(
  node: ts.Node,
  visitor: (node: ts.Node, index?: number, level?: number) => ts.Node | undefined | void,
  index: number = 0,
  level: number = 0,
  stopOnTruthy: boolean = false,
  getChildrenMode: boolean = false
): ts.Node | undefined {
  if (!node) {
    return
  }
  const result = visitor(node, index, level)
  if (stopOnTruthy && result) {
    return result
  }
  let i = 0
  if (!getChildrenMode) {
    return node.forEachChild(child => visitChildrenRecursiveDeepFirst(child, visitor, i++, level + 1, stopOnTruthy, getChildrenMode))
  } else {
    node.getChildren().forEach(child => visitChildrenRecursiveDeepFirst(child, visitor, i++, level + 1, stopOnTruthy, getChildrenMode))
  }
}
export function dumpAst(ast: ts.Node | undefined, getChildrenMode: boolean = false, printIndex: boolean = false): string {
  if (!ast) {
    return ''
  }
  function print(node: ts.Node, index: number = 0, level: number = 0) {
    buffer.push(printNode(node, index, level, printIndex))
  }
  const buffer: string[] = []
  visitChildrenRecursiveDeepFirst(ast, print, undefined, undefined, false, getChildrenMode)
  return buffer.join('\n')
}

export function printNode(node: ts.Node, index: number = -1, level: number = 0, printIndex: boolean = false): string {
  const indent = new Array(level).map(i => '').join('  ')
  const name = node.kind === ts.SyntaxKind.Identifier ? ((node as ts.Identifier).text + ' ') : ''
  const indexStr = printIndex ? (index != -1 ? ('#' + index + ' ') : '') : ''
  let shortText = node.getText().replace(/[\s\n]+/g, ' ')// .split(//).join('\\n')
  shortText = shortText.substr(0, Math.min(shortText.length, 60))
  return `${indent}${indexStr}${name}${getKindName(node.kind)} : "${shortText}"`
}

/** get the kind name as string of given kind value or node */
export function getKindName(kind: number | ts.Node): string {
  return (kind || kind === 0) ? getEnumKey(ts.SyntaxKind, (kind as ts.Node).kind || kind) : 'undefined'
}

export function getEnumKey(anEnum: any, value: any): string {
  for (const key in anEnum) {
    if (value === anEnum[key]) {
      return key
    }
  }
  return ''
}
