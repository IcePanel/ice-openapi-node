import express, { Express } from 'express'
import { middleware as openapiValidator } from 'express-openapi-validator'
import * as net from 'net'
import * as path from 'path'
import { Error as ApiError } from '../../../api-client'

import * as handlers from '../handlers'
import openapi from '../openapi'
import { getExpressLogger } from './logger'

const PORT = process.env.PORT || 8080
const OPERATION_HANDLERS = path.join(__dirname, 'handlers')

let app = express()

app.use(express.urlencoded({ extended: false, limit: '10mb' }))
app.use(express.json({ limit: '10mb' }))

app.use(getExpressLogger())

app.get('/', (req, res) => res.json(openapi))

app.use(openapiValidator({
  apiSpec: openapi,
  formats: [
    {
      name: 'integer',
      type: 'number',
      validate: value => value === parseInt(value, 10)
    },
    {
      name: 'long',
      type: 'number',
      validate: value => value === parseInt(value, 10)
    }
  ],
  operationHandlers: {
    basePath: OPERATION_HANDLERS,
    resolver: (handlersPath: any, route: any, apiDoc: any) => {
      const { basePath, openApiRoute, method } = route
      const pathKey = openApiRoute.substring(basePath.length)
      const schema = apiDoc.paths[pathKey][method.toLowerCase()]
      const operationId = schema['x-eov-operation-id'] || schema.operationId
      const operationHandler = schema['x-eov-operation-handler']
      const operationHandlers: any = handlers

      if (!operationHandlers[operationHandler]) {
        throw new Error(`Could not find operation handler ${operationHandler}`)
      }

      if (!operationHandlers[operationHandler][operationId]) {
        throw new Error(`Could not find operation identifier ${operationHandler}/${operationId}`)
      }

      return operationHandlers[operationHandler][operationId]
    }
  },
  validateRequests: {
    removeAdditional: true
  },
  validateResponses: true
}) as any)

app.use((err: Error & { code?: string, errors?: string[], status?: number }, req: express.Request, res: express.Response, next: express.NextFunction) => {
  err.status = err.status || 500
  res.err = err
  
  let error: ApiError
  if (err.status >= 500 && err.status < 600) {
    error = {
      message: 'Internal server error'
    }
  } else {
    error = {
      code: err.code,
      errors: err.errors,
      message: err.message
    }
  }
  if (req.method === 'HEAD') {
    res.sendStatus(err.status)
  } else {
    res.status(err.status).json(error)
  }
})

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error: ApiError = {
    message: 'Path not found'
  }
  if (req.method === 'HEAD') {
    res.sendStatus(404)
  } else {
    res.status(404).json(error)
  }
})

let server: net.Server | undefined
let connections: net.Socket[] = []

export const listen = async () => {
  return new Promise<void>(resolve => {
    server = app.listen(PORT, () => {
      console.log('express server listening', {
        handlers: OPERATION_HANDLERS,
        port: PORT
      })
      resolve()
    })

    server.on('connection', connection => {
      connections.push(connection)
      connection.on('close', () => {
        connections = connections.filter(curr => curr !== connection)
      })
    })
  })
}

export const close = async () => {
  await new Promise<void>((resolve, reject) => {
    if (server) {
      server.close(err => {
        console.log('express server closed')
        if (err) {
          reject(err)
        } else {
          server = undefined
          resolve()
        }
      })
    } else {
      resolve()
    }
  })

  connections.forEach(con => con.end())
  setTimeout(() => connections.forEach(con => con.destroy()), 5000)
}

export { app }
