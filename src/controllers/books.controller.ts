import { Router, NextFunction, Request, Response } from 'express'
import { IBook } from '../interfaces/books.interface'
import { bookServices } from '../services/books.service'

export const BooksController = Router()

BooksController.get(
	'/',
	async (_req: Request, res: Response<IBook[]>, next: NextFunction) => {
		try {
			const result = await bookServices.getAllBooks()
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)
