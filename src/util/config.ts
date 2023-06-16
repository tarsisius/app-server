import dotenv from 'dotenv'

dotenv.config()

const config = {
  NODE_ENV: process.env.NODE_ENV as string,
  PORT: process.env.PORT as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string
}

export default config
