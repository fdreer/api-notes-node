import { HTTP_STATUS_CODE } from '../../consts'
import { ErrorHandler } from '../../error/errors'
import { validateNoteCreate } from '../../utils/validateNote'
import { Note, NoteCreation, NoteType } from '../sequelize/entities/Note'
import { INoteRepository } from '../repositories/interfaces'
import { INoteService, IUserService } from './interfaces'

export default class NoteService implements INoteService {
  static #instance: NoteService
  private noteRepository: INoteRepository
  private userService: IUserService

  private constructor(
    noteRepository: INoteRepository,
    userService: IUserService
  ) {
    this.noteRepository = noteRepository
    this.userService = userService
  }

  public static getInstance(
    noteRepository: INoteRepository,
    userService: IUserService
  ): NoteService {
    if (!NoteService.#instance) {
      NoteService.#instance = new NoteService(noteRepository, userService)
    }

    return NoteService.#instance
  }

  async create(newNote: NoteCreation): Promise<NoteType> {
    const noteValidated = validateNoteCreate({
      title: newNote.title,
      content: newNote.content,
      important: newNote.important,
      userId: newNote.userId
    })

    if (!noteValidated.success) {
      throw new ErrorHandler(
        `${noteValidated.error.errors}`,
        HTTP_STATUS_CODE.BAD_REQUEST
      )
    }

    await this.userService.checkIfExistsById(newNote.userId)
    const noteSaved = await this.noteRepository.save(newNote)
    return noteSaved
  }
}
