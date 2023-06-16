import { z } from 'zod'

// register
export const registerUserBody = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
})

export type RegisterUserBody = z.infer<typeof registerUserBody>

//login
export const loginUserBody = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type LoginUserBody = z.infer<typeof loginUserBody>

//updateName
export const updateUserNameBody = z.object({
  name: z.string().optional(),
})

//updatePassword
export const updateUserPasswordBody = z.object({
  password: z.string().optional(),
})
