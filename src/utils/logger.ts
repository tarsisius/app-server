import pino from 'pino'
import { pinoHttp } from 'pino-http'

const opt = {
  transport: {
    target: 'pino-pretty',
  },
}

const logger = pino(opt)
const httpLogger = pinoHttp(opt)


export { httpLogger }
export default logger
