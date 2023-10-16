import { z } from 'zod'
import { IdType } from '../type'

export const userIdSchema = z.string().uuid({ message: 'Invalid ID' })

export const validateUserId = (userId: IdType) => {
  return userIdSchema.safeParse(userId)
}
