import { NextFunction, Request, Response } from 'express'
import { INoteService, IUserService } from '../domain/services/interfaces'
import { HTTP_STATUS_CODE } from '../consts'
import { NoteCreation } from '../domain/sequelize/entities/Note'
import NoteService from '../domain/services/note_service'
import { INoteRepository } from '../domain/repositories/interfaces'

export default class NoteController {
  static #instance: NoteController
  private noteService: INoteService

  private constructor(
    noteRepository: INoteRepository,
    userService: IUserService
  ) {
    this.noteService = NoteService.getInstance(noteRepository, userService)
  }

  public static getInstance(
    noteRepository: INoteRepository,
    userService: IUserService
  ): NoteController {
    if (!NoteController.#instance) {
      NoteController.#instance = new NoteController(noteRepository, userService)
    }

    return NoteController.#instance
  }

  createNote = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    const data: NoteCreation = req.body
    const { title, content, important, userId } = data

    const note = await this.noteService.create({
      title,
      content,
      important,
      userId
    })
    return res.status(HTTP_STATUS_CODE.CREATED).json(note)
  }
}
