import { NODE_ENV, PORT } from './config/app_config'
import { SequelizeConnection } from './config/database'
import app from './server'
import { LogError, LogSucces } from './utils/logger'

// ENTITIES
import './domain/sequelize/entities/User'
import './domain/sequelize/entities/Note'

export const serverListener = app.listen(PORT || 3000, async () => {
  LogSucces(`Server ready on port: ${PORT}. Mode ${NODE_ENV}`)
  SequelizeConnection.getInstance().sync({ force: true })
  // Deberia desactivarse sync en produccion
  // This will run .sync() only if database name ends with '_test'
  // sequelize.sync({ force: true, match: /_test$/ });
  // sequelize.sync({ force: true })
})

// * CONTROL SERVER ERROR
serverListener.on('error', error => {
  LogError(`SERVER ERROR: ${error.message}`)
})
