import {
  Attributes,
  CreationAttributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import bcrypt from 'bcrypt'
import { SequelizeConnection } from '../../../config/database'
import { IdType } from '../../../type'
import { Note } from './Note'

const sequelize = SequelizeConnection.getInstance()

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<IdType>
  declare username: string
  declare password: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

type UserCreation = CreationAttributes<User>
type UserType = Attributes<User>

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(password: string) {
        this.setDataValue('password', bcrypt.hashSync(password, 10))
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      get() {
        return
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'update_at',
      get() {
        return
      }
    }
  },
  { tableName: 'users', sequelize }
)

User.hasMany(Note, {
  foreignKey: {
    allowNull: false,
    name: 'userId'
  },
  sourceKey: 'id'
})

Note.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id'
})

export { User, UserCreation, UserType }
