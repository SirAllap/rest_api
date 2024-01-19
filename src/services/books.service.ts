import { IBook } from '../interfaces/books.interface'
import { BookModel } from '../models/book.model'

const getAllBooks = async () => {
	const result = await BookModel.find()
	if (result.length === 0) {
		throw new Error()
	}
	return result
}

const createOneBook = async (book: IBook) => {
	const result = await BookModel.create(book)
	return result
}

export const bookServices = {
	getAllBooks,
	createOneBook,
}
