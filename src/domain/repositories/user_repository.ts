import { IdType } from '../../type'
import { Note, NoteType } from '../sequelize/entities/Note'
import { User, UserCreation, UserType } from '../sequelize/entities/User'
import { IUserRepository } from './interfaces'

export default class UserRepository implements IUserRepository {
  static #instance: IUserRepository

  public constructor() {}

  public static getInstance(): IUserRepository {
    if (!UserRepository.#instance) {
      UserRepository.#instance = new UserRepository()
    }

    return UserRepository.#instance
  }

  async findByUsername(username: string): Promise<UserType | null> {
    const exists = await User.findOne({
      where: {
        username: username
      }
    })

    return exists
  }

  async checkIfExistsOrCreate(
    newUser: UserCreation
  ): Promise<[UserType, boolean]> {
    const [user, created] = await User.findOrCreate({
      where: { username: newUser.username },
      defaults: newUser
    })

    return [user, created]
  }

  async checkIfExistsById(userId: IdType): Promise<UserType | null> {
    return await User.findByPk(userId)
  }

  async findAll(): Promise<UserType[]> {
    return await User.findAll()
  }

  async findNotesFromUser(userId: IdType): Promise<NoteType[]> {
    const notes = await Note.findAll({
      where: {
        userId
      }
    })

    return notes
  }
}
