# strip-typescript-output

CLI tool to remove `use strict` and `esModuleInterop` statements from .js code emitted by TypeScript. 

Supports compressed/changed output by minifiers

**WARNING - this might break the code - use at your own risk**

## Expressions supported 

```
Object.defineProperty(exports, "__esModule", { value: true });
use strict";
exports.__esModule = true
Object.defineProperty(exports,"__esModule",{value:!0});
Object.defineProperty(e,"__esModule",{value:!0})
etc
```

## Usage 

```
npm i -D strip-typescript-output
npx strip-typescript-output --input docs/**/*.js
```

or globally:


```
npm i -g strip-typescript-output
strip-typescript-output --input docs/**/*.js
```


## TODO: 

 * support: replaceWith,output,dontRemoveUseStrict,dontRemoveEsModuleInterop