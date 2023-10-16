import {
  Attributes,
  CreationAttributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { SequelizeConnection } from '../../../config/database'
import { IdType } from '../../../type'

const sequelize = SequelizeConnection.getInstance()

class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>> {
  declare id: CreationOptional<IdType>
  declare title: string
  declare content: string
  declare important: CreationOptional<boolean>
  declare userId: IdType
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

type NoteCreation = CreationAttributes<Note>
type NoteType = Attributes<Note>

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      get() {
        return this.getDataValue('title').toUpperCase()
      }
    },
    content: {
      type: DataTypes.STRING(500)
    },
    important: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      get() {
        return
      }
    }
  },
  { tableName: 'notes', sequelize }
)

export { Note, NoteCreation, NoteType }
