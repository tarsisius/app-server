import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import config from './utils/config'

export const db = drizzle(
  postgres(config.DATABASE_URL, { ssl: 'require' })
) as PostgresJsDatabase
