import { AuthRespose, IdType } from '../../type'
import { Note, NoteCreation, NoteType } from '../sequelize/entities/Note'
import { UserCreation, UserType } from '../sequelize/entities/User'

export interface IUserService {
  // findById: (id: IdType) => Promise<UserType>
  findByUsername: (username: string) => Promise<UserType>
  checkIfExistsOrCreate: (newUser: UserCreation) => Promise<[UserType, boolean]>
  checkIfExistsById: (userId: IdType) => Promise<void>
  findAll: () => Promise<UserType[]>
  findNotesFromUser: (id: IdType) => Promise<NoteType[]>
}

export interface INoteService {
  create: (newNote: NoteCreation) => Promise<NoteType>
  //   update: (noteToUpdate: Partial<NoteCreation>, id: IdType) => Promise<Note>
  // findAllNotes: () => Promise<Note[]>
  // findNoteById: (id: IdType) => Promise<Note>
  // deleteNoteById: (id: IdType) => Promise<void>
}

export interface IAuthService {
  registerUser: (userToRegister: UserCreation) => Promise<AuthRespose>
  loginUser: (userToAuthenticate: UserCreation) => Promise<AuthRespose>
}
