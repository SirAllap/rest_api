import { IBook } from '../interfaces/books.interface'
import { BookModel } from '../models/book.model'

const getAllBooks = async () => {
	const result = await BookModel.find()
	if (result.length === 0) {
		throw new Error()
	}
	return result
}

const getBookByID = async (bookID: string) => {
	const result = await BookModel.findById(bookID)
	if (!result) {
		throw new Error()
	}
	return result
}

const createOneBook = async (book: IBook) => {
	const result = await BookModel.create(book)
	return result
}

const updateOneBook = async (bookID: string, update: Partial<IBook>) => {
	const result = await BookModel.findByIdAndUpdate(bookID, update, {
		new: true,
	})
	if (!result) {
		throw new Error()
	}
	return result
}

const deleteOneBook = async (bookID: string) => {
	const result = await BookModel.findByIdAndDelete(bookID)
	if (!result) {
		throw new Error()
	}
	return result
}

export const bookServices = {
	getAllBooks,
	createOneBook,
	getBookByID,
	updateOneBook,
	deleteOneBook,
}
