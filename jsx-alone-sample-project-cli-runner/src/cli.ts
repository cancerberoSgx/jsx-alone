import { main } from './main';
import { Config } from './index';
const cli = 1;
export const args = require('yargs-parser')(process.argv.slice(2)) as Config;
main(args);
