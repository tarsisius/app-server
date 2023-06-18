import dotenv from 'dotenv'

dotenv.config()

const config = {
  NODE_ENV: process.env.NODE_ENV as string,
  PORT: process.env.PORT as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  TOKEN_ACCESS_SECRET: process.env.TOKEN_ACCESS_SECRET as string,
  TOKEN_REFRESH_SECRET: process.env.TOKEN_REFRESH_SECRET as string,
}

export default config
