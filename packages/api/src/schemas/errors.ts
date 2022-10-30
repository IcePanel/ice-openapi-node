import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types'

export const Error: OpenAPIV3.SchemaObject = {
  properties: {
    code: {
      type: 'string'
    },
    errors: {
      items: {
        type: 'string'
      },
      type: 'array'
    },
    message: {
      type: 'string'
    }
  },
  required: ['message'],
  type: 'object'
}
