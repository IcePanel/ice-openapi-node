declare namespace Express {
  interface Request {
    id: number
    openapi?: { schema: import('express-openapi-validator/dist/framework/types').OpenAPIV3.OpenAPIV3OperationObject }
    startTime: number
  }
  interface Response {
    err?: Error | import('./types').UnprocessableEntityError
  }
}
