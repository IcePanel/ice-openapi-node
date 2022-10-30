import * as express from 'express'
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types'

export type RouterHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => void

export interface OpenAPIV3OperationObject extends OpenAPIV3.OperationObject {
  'x-eov-operation-handler'?: string
  'x-eov-operation-id'?: string
}

export interface OpenAPIV3PathItemObject extends OpenAPIV3.PathItemObject {
  get?: OpenAPIV3OperationObject
  put?: OpenAPIV3OperationObject
  post?: OpenAPIV3OperationObject
  delete?: OpenAPIV3OperationObject
  options?: OpenAPIV3OperationObject
  head?: OpenAPIV3OperationObject
  patch?: OpenAPIV3OperationObject
  trace?: OpenAPIV3OperationObject
}

export interface OpenAPIV3PathsObject extends OpenAPIV3.PathsObject {
  [pattern: string]: OpenAPIV3PathItemObject
}

export interface OpenAPIV3Document extends OpenAPIV3.Document {
  paths: OpenAPIV3PathsObject
}

export class UnprocessableEntityError extends Error {
  name = 'UnprocessableEntityError' as const
  status = 422

  constructor (message: string, public code?: string, public errors: any[] = []) {
    super()
    this.message = message
  }
}
