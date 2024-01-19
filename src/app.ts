import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import connectDB from './util/db_connection'
import { BooksController } from './controllers/books.controller'

connectDB()

// middlewares & router
export const app: Express = express()
	.use(cors())
	.use(express.json())
	.use(morgan('combined'))
	.use('/', (_req: Request, res: Response) => {
		res.send('Hello World!')
	})
	.use('/books', BooksController)
	.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
		console.error(err)
		return res
			.status(500)
			.json({ error: true, message: 'Unexpected Error' })
	})
