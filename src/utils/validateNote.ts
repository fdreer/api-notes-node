import { z } from 'zod'
import { NoteCreation } from '../domain/sequelize/entities/Note'
import { userIdSchema } from './validateUserId'

export const noteSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string'
    })
    .trim()
    .max(200, {
      message: 'Title must be less than 50 characters'
    }),
  content: z
    .string({
      required_error: 'Content is required',
      invalid_type_error: 'Content must be a string'
    })
    .trim()
    .max(500, {
      message: 'Content must be less than 200 characters'
    }),
  important: z
    .boolean({
      invalid_type_error: 'Important must be a boolean'
    })
    .optional()
    .default(false),
  userId: userIdSchema
})

export const validateNoteCreate = (noteToValidate: NoteCreation) => {
  return noteSchema.safeParse(noteToValidate)
}

export const validateNoteUpdate = (noteToValidate: NoteCreation) => {
  return noteSchema.partial().safeParse(noteToValidate)
}
