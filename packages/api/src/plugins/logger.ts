import * as express from 'express'

export const getExpressLogger = () => {
  let nextId = 1

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.startTime = Date.now()
    req.id = nextId
    nextId += 1
    
    const logRequest = (err?: Error) => {
      const operationId = req.openapi?.schema?.operationId || req.openapi?.schema?.['x-eov-operation-id']
      const operationHandler = req.openapi?.schema?.['x-eov-operation-handler']

      let message: string
      if (operationHandler && operationId) {
        message = `${operationHandler} handled ${operationId} method with status ${res.statusCode}`
      } else {
        message = `handled ${req.method.toLowerCase()} ${req.url} with status ${res.statusCode}`
      }

      const props: any = {
        request: {
          id: req.id,
          ip: req.ip,
          method: req.method,
          url: req.url
        },
        response: {
          status: res.statusCode
        },
        responseTime: Date.now() - req.startTime
      }

      if (operationHandler) {
        props.request.operationHandler = operationHandler
      }
      if (operationId) {
        props.request.operationId = operationId
      }
      
      if (res.err && 'status' in res.err && res.err.status !== 500) {
        console.log(message, {
          ...props,
          response: {
            ...props.response,
            message: res.err.message
          }
        })
      } else if (res.err || err) {
        console.error(message, {
          ...props,
          error: res.err || err
        })
      } else {
        console.log(message, props)
      }
    }

    res.once('finish', logRequest)
    req.once('error', logRequest)

    next()
  }
}
