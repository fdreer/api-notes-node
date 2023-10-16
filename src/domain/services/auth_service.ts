import { HTTP_STATUS_CODE } from '../../consts'
import { ErrorHandler } from '../../error/errors'
import jwtService from '../../security/JwtService'
import { AuthRespose } from '../../type'
import { validateUserRegister } from '../../utils/validateUser'
import { UserCreation } from '../sequelize/entities/User'
import { IAuthService, IUserService } from './interfaces'
import bcrypt from 'bcrypt'

export default class AuthService implements IAuthService {
  static #instance: IAuthService
  private userService: IUserService

  private constructor(userService: IUserService) {
    this.userService = userService
  }

  public static getInstance(userService: IUserService): IAuthService {
    if (!AuthService.#instance) {
      this.#instance = new AuthService(userService)
    }

    return this.#instance
  }

  async registerUser(newUser: UserCreation): Promise<AuthRespose> {
    const resultValidateUser = validateUserRegister({
      username: newUser.username,
      password: newUser.password
    })

    if (!resultValidateUser.success) {
      throw new ErrorHandler(
        resultValidateUser.error.message,
        HTTP_STATUS_CODE.BAD_REQUEST
      )
    }

    const [user, created] = await this.userService.checkIfExistsOrCreate(
      resultValidateUser.data
    )

    if (!created) {
      throw new ErrorHandler(
        `El usuario con el nombre ${resultValidateUser.data.username} ya existe`,
        HTTP_STATUS_CODE.BAD_REQUEST
      )
    }

    const { id, username } = user
    const jwt = jwtService.generateToken(username)
    return { id, jwt }
  }

  async loginUser(userToAuth: UserCreation): Promise<AuthRespose> {
    const { username, password } = userToAuth

    if (!username || !password) {
      throw new ErrorHandler(
        'Email and password are required',
        HTTP_STATUS_CODE.BAD_REQUEST
      )
    }
    // TODO: deberia realizarlo un metodo de userService
    const user = await this.userService.findByUsername(username)
    const { id, password: passwordDB } = user

    const isPasswordValid = bcrypt.compareSync(password, passwordDB)

    // Caso que la password es incorrecta
    if (!isPasswordValid) {
      throw new ErrorHandler(
        'Datos de inicio de sesión incorrectos',
        HTTP_STATUS_CODE.BAD_REQUEST
      )
    }

    const jwt = jwtService.generateToken(username)
    return { id, jwt }
  }
}
