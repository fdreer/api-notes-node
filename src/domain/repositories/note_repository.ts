import { Note, NoteCreation, NoteType } from '../sequelize/entities/Note'
import { INoteRepository } from './interfaces'

export default class NoteRepository implements INoteRepository {
  static #instance: INoteRepository

  public constructor() {}

  public static getInstance(): INoteRepository {
    if (!NoteRepository.#instance) {
      NoteRepository.#instance = new NoteRepository()
    }

    return NoteRepository.#instance
  }

  async save(newNote: NoteCreation): Promise<NoteType> {
    const noteSaved = await Note.create(newNote)
    return noteSaved
  }
}
