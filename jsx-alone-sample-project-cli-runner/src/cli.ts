import { main } from './main';
import { Config } from "./types";
console.log(process.argv);

export const args = require('yargs-parser')(process.argv.slice(2)) as Config;
main(args);
