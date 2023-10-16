import { z } from 'zod'
import { UserCreation } from '../domain/sequelize/entities/User'

const userRegisterSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters long')
    .max(50, 'Username must be less than 50 characters long'),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .max(100, 'Password must be at least 5 characters long')
})

/**
 *
 * Valida que los datos del usuario sean válidos para registrarse en el sistema
 */
export const validateUserRegister = (userToValidate: UserCreation) => {
  return userRegisterSchema.safeParse(userToValidate)
}

/**
 *
 * Valida que los datos del usuario sean válidos para actualizarse en el sistema
 */
export const validateUserUpdate = (userToValidate: UserCreation) => {
  return userRegisterSchema.partial().safeParse(userToValidate)
}
