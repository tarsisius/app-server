import http from 'http'
import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'

import logger, { httpLogger } from './utils/logger'
import config from './utils/config'

import userRoutes from './routes/user.routes'

const port = config.PORT

function start() {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(helmet())
  app.use(cors())

  app.use(httpLogger)
  app.use(userRoutes)

  app.set('port', port)

  const server = http.createServer(app)

  server.listen(port, () => {
    logger.info(`Listening on port:${port}`)
  })
}

start()
