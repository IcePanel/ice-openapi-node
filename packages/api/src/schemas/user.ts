import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types'

import refs from '../res/openapi-refs.json'

export const UserRegister: OpenAPIV3.SchemaObject = {
  properties: {
    email: {
      format: 'email',
      type: 'string'
    },
    name: {
      type: 'string'
    }
  },
  required: [
    'email',
    'name'
  ],
  type: 'object'
}

export const UserStatus: OpenAPIV3.SchemaObject = {
  type: 'string',
  enum: [
    'active',
    'suspended',
    'deactivated'
  ]
}

export const User: OpenAPIV3.SchemaObject = {
  properties: {
    createdAt: {
      format: 'date-time',
      type: 'string'
    },
    email: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    status: {
      $ref: refs.UserStatus
    },
    updatedAt: {
      format: 'date-time',
      type: 'string'
    }
  },
  required: [
    'createdAt',
    'email',
    'id',
    'name',
    'status'
  ],
  type: 'object'
}
