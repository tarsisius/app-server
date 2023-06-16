import { SignJWT, jwtVerify } from 'jose'
import config from './config'

export async function verifyJwtToken(token: string | null) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(config.JWT_SECRET)
    )
    return payload as {
      id: string
      email: string
    }
  } catch (error) {
    return null
  }
}

export async function getJwtToken({ id }: { id: string }) {
  const token = await new SignJWT({ id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(new TextEncoder().encode(config.JWT_SECRET))

  return token
}
