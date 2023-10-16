import { IdType } from '../../type'
import { NoteCreation, NoteType } from '../sequelize/entities/Note'
import { UserCreation, UserType } from '../sequelize/entities/User'

export interface IUserRepository {
  findByUsername: (username: string) => Promise<UserType | null>
  checkIfExistsOrCreate: (newUser: UserCreation) => Promise<[UserType, boolean]>
  checkIfExistsById: (userId: IdType) => Promise<UserType | null>
  findAll: () => Promise<UserType[]>
  findNotesFromUser: (id: IdType) => Promise<NoteType[]>
}

export interface INoteRepository {
  save: (newNote: NoteCreation) => Promise<NoteType>
  //   update: (noteToUpdate: Partial<NoteCreation>, id: IdType) => Promise<NoteType>
  // findAllNotes: () => Promise<NoteType[]>
  // findNoteById: (id: IdType) => Promise<NoteType>
  // deleteNoteById: (id: IdType) => Promise<void>
}
