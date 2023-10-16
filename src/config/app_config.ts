import { config } from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV}` })

export const { NODE_ENV, PORT, POSTGRESQL_DB_URI } = process.env
export const secret = `${process.env.SECRET_TEXT ?? 'NASHEEE'}`
