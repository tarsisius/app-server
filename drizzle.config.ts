import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/db.schema.ts',
  out: './migrations',
  breakpoints: false,
} satisfies Config
