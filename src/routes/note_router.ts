import { Router } from 'express'
import { errorHandlerApp } from '../error/errorHandlerApp'
import NoteController from '../controllers/note_controller'
import { IUserService } from '../domain/services/interfaces'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import jwtAuthFilter from '../security/JwtAuthFilter'
import { INoteRepository } from '../domain/repositories/interfaces'

export default class NoteRouter {
  static #instance: NoteRouter
  public routes: Router
  private noteController: NoteController

  private constructor(
    noteRepository: INoteRepository,
    userService: IUserService
  ) {
    this.routes = Router()
    this.noteController = NoteController.getInstance(
      noteRepository,
      userService
    )
    this.initRoutes()
  }

  public static getInstance(
    noteRepository: INoteRepository,
    userService: IUserService
  ): NoteRouter {
    if (!NoteRouter.#instance) {
      NoteRouter.#instance = new NoteRouter(noteRepository, userService)
    }

    return NoteRouter.#instance
  }

  private initRoutes() {
    this.routes
      .route('/')
      // .get(
      //   catchAsyncErrors(jwtAuthFilter.doFilterInternal),
      //   catchAsyncErrors(this.#noteController.getNotes)
      // )
      .post(
        catchAsyncErrors(jwtAuthFilter.doFilterInternal),
        catchAsyncErrors(this.noteController.createNote)
      )
    // .put(
    //   catchAsyncErrors(jwtAuthFilter.doFilterInternal),
    //   catchAsyncErrors(this.#noteController.updateNote)
    // )
    // .delete(
    //   catchAsyncErrors(jwtAuthFilter.doFilterInternal),
    //   catchAsyncErrors(this.#noteController.deleteNote)
    // )
    this.routes.use(errorHandlerApp)
  }
}
