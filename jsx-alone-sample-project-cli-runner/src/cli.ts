import { main } from './main'
import { Config } from './types'

export const args = require('yargs-parser')(process.argv.slice(2)) as Config
main(args)
