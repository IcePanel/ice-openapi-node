import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types'

import paths from './paths'
import * as schemas from './schemas'
import { OpenAPIV3Document } from './types'

const servers: OpenAPIV3.ServerObject[] = [{
  description: 'Production',
  url: 'https://api.company.com'
}]

const spec: OpenAPIV3Document = {
  components: {
    schemas
  },
  info: {
    description: 'API',
    title: 'API',
    version: '1.0.0'
  },
  openapi: '3.0.0',
  paths,
  servers
}

export default spec
