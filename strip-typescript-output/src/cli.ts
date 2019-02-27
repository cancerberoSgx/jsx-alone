import { main, Config } from '.';


const args = require('yargs-parser')(process.argv.slice(2)) as Config

if(!args.input){
  console.error(`--input is required. Usage:
npx stripTsEsModuleInterop --input docs/**/*.js`);
  
}
main(args)