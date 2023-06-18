import { eq } from 'drizzle-orm'
import type { RegisterUserBody } from '../schema/user.schema'
import { users } from '../db.schema'
import { db } from '../db.connect'

export async function getUserById(id: string) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, id))

  if (!result.length) {
    return null
  }

  return result[0]
}

export async function getUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email))

  if (!result.length) {
    return null
  }

  return result[0]
}

export async function insertUser(data: RegisterUserBody) {
  const result = await db
    .insert(users)
    .values({
      ...data,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
    })

  if (!result.length) {
    return null
  }

  return result[0]
}

export async function updateUserName(name: string, id: string) {
  const result = await db
    .update(users)
    .set({
      name,
    })
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
    })

  if (!result.length) {
    return null
  }

  return result[0]
}

export async function updateUserPassword(password: string, id: string) {
  const result = await db
    .update(users)
    .set({
      password,
    })
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
    })

  if (!result.length) {
    return null
  }

  return result[0]
}

export async function deleteUserById(id: string) {
  const result = await db.delete(users).where(eq(users.id, id)).returning()

  return result
}
