import http from 'http'
import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'

import logger from './util/logger'
import config from './util/config'

import userRouter from './router/user.router'

const port = config.PORT

function start() {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(helmet())
  app.use(cors())
  
  app.use(userRouter)

  app.set('port', port)

  const server = http.createServer(app)

  server.listen(port, () => {
    logger.info(`Listening on port:${port}`)
  })
}

start()
