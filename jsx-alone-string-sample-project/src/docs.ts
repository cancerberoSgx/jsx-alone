import { renderSimple } from './simple/main'
import { writeFileSync } from 'fs'
import { renderLotsOfPeople } from './lotsOfPeople/main'

const samples = [
  {name: 'simple', fn: renderSimple}
, {name: 'lotsOfPeople', fn: renderLotsOfPeople}
]

samples.forEach(sample => {
  try {
    writeFileSync(`../docs/jsx-alone-string-sample-project/${sample.name}.html`, wrapInHtml(sample.fn(false)))
    writeFileSync(`../docs/jsx-alone-string-sample-project/${sample.name}-indented.html`, wrapInHtml(sample.fn(true)))
  } catch (error) {
    console.error(error, error.stack)

  }
})

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
`
}
