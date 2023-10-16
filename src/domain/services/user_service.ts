import { IdType } from '../../type'
import { UserType, User, UserCreation } from '../sequelize/entities/User'
import { IUserService } from './interfaces'
import { ErrorHandler } from '../../error/errors'
import { HTTP_STATUS_CODE } from '../../consts'
import { NoteType } from '../sequelize/entities/Note'
import { IUserRepository } from '../repositories/interfaces'
import { validateUserId } from '../../utils/validateUserId'

export default class UserService implements IUserService {
  static #instance: IUserService
  private userRepository: IUserRepository

  private constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public static getInstance(userRepository: IUserRepository): IUserService {
    if (!UserService.#instance) {
      UserService.#instance = new UserService(userRepository)
    }

    return UserService.#instance
  }

  async findByUsername(username: string): Promise<UserType> {
    const user = await this.userRepository.findByUsername(username)

    // Caso que el username no exista
    if (!user) {
      throw new ErrorHandler(
        `Datos de inicio de sesión incorrectos`,
        HTTP_STATUS_CODE.BAD_REQUEST
      )
    }

    return user
  }

  async checkIfExistsOrCreate(
    newUser: UserCreation
  ): Promise<[UserType, boolean]> {
    return await this.userRepository.checkIfExistsOrCreate(newUser)
  }

  async checkIfExistsById(userId: IdType): Promise<void> {
    const user = await this.userRepository.checkIfExistsById(userId)

    if (!user) {
      throw new ErrorHandler(
        `User with id ${userId} not found`,
        HTTP_STATUS_CODE.BAD_REQUEST
      )
    }
  }

  async findAll(): Promise<UserType[]> {
    return await this.userRepository.findAll()
  }

  async findNotesFromUser(userId: IdType): Promise<NoteType[]> {
    const userIdValidated = validateUserId(userId)

    if (!userIdValidated.success) {
      throw new ErrorHandler(
        'Format ID is not correct',
        HTTP_STATUS_CODE.BAD_REQUEST
      )
    }

    this.checkIfExistsById(userIdValidated.data)
    const notes = await this.userRepository.findNotesFromUser(
      userIdValidated.data
    )
    return notes
  }
}
