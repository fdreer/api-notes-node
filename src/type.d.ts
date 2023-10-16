import { UUID } from 'crypto'
import { Note } from './domain/sequelize/entities/Note'
import { User } from './domain/sequelize/entities/User'

export type IdType = UUID | SafeParseSuccess<string> // --> utilizo SafeParseSuccess porque
// es lo que devuelve la validacion de zod

export type AuthRespose = {
  id: IdType
  jwt: string
}

export type ErrorResponse = {
  statusCode: number
  message: string
}
