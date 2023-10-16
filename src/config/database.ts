import { Sequelize } from 'sequelize'
import { LogError, LogSucces } from '../utils/logger'
import { NODE_ENV, POSTGRESQL_DB_URI } from './app_config'

export class SequelizeConnection {
  static #instance: Sequelize

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!SequelizeConnection.#instance) {
      SequelizeConnection.#instance = new Sequelize(`${POSTGRESQL_DB_URI}`, {
        logging: NODE_ENV === 'development' ? true : false
      })

      this.#instance
        .authenticate()
        .then(() => LogSucces('DB connection success'))
        .catch(error => LogError(`DB ERROR: ${error}`))
    }

    return SequelizeConnection.#instance
  }
}
