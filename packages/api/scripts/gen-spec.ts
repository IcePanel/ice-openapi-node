import * as fs from 'fs'
import * as yaml from 'js-yaml'
import * as path from 'path'

import openapi from '../src/openapi'

fs.writeFileSync(path.join(__dirname, '..', 'src', 'res', 'openapi.yaml'), yaml.dump(openapi, {
  noCompatMode: true,
  noRefs: true,
  skipInvalid: true
}))

fs.writeFileSync(path.join(__dirname, '..', 'src', 'res', 'openapi.json'), JSON.stringify(openapi, null, 2))
