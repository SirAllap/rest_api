import { Router, NextFunction, Request, Response } from 'express'
import { IBook } from '../interfaces/books.interface'
import { bookServices } from '../services/books.service'
import { IError } from '../interfaces/error.interface'

export const BooksController = Router()

BooksController.get(
	'/',
	async (
		_req: Request,
		res: Response<IBook[] | IError>,
		next: NextFunction
	) => {
		try {
			const result = await bookServices.getAllBooks()
			res.json(result)
		} catch (error) {
			console.error(error)
			return res
				.status(404)
				.json({ error: true, message: 'No books found', status: 404 })
		}
		return next()
	}
)

BooksController.get(
	'/:bookID',
	async (
		req: Request<{ bookID: string }>,
		res: Response<IBook | IError>,
		next: NextFunction
	) => {
		try {
			const result = await bookServices.getBookByID(req.params.bookID)
			res.json(result)
		} catch (error) {
			console.error(error)
			return res.status(404).json({
				error: true,
				message: 'No book found with that ID',
				status: 404,
			})
		}
		return next()
	}
)

BooksController.post(
	'/',
	async (req: Request<IBook>, res: Response, next: NextFunction) => {
		try {
			const result = await bookServices.createOneBook(req.body)
			res.json(result)
		} catch (error: any) {
			console.error(error.message)
			if (error.name === 'ValidationError')
				return res.status(400).json({
					error: true,
					message: error.message,
					status: 400,
				})
			return next()
		}
	}
)

BooksController.put(
	'/:bookID',
	async (
		req: Request<{ bookID: string }>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const result = await bookServices.updateOneBook(
				req.params.bookID,
				req.body
			)
			res.json(result)
		} catch (error) {
			console.error(error)
			return res.status(404).json({
				error: true,
				message: 'Error updating the book info',
				status: 404,
			})
		}
		return next()
	}
)
