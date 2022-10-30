import 'source-map-support/register'

import * as express from './plugins/express'

const main = async () => {
  await express.listen()
}
main()

const close = () => {
  console.log('close signal received')

  express.close()

  setTimeout(() => {
    console.error('forcing shutting down')
    process.exit(1)
  }, 10000).unref()
}

process.on('uncaughtException', err => {
  console.error(err)
})

process.on('SIGTERM', close)
process.on('SIGINT', close)

process.on('exit', () => {
  console.log('exit')
})
