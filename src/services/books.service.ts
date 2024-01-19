import { BookModel } from '../models/book.model'

const getAllBooks = async () => {
	const result = await BookModel.find()
	if (result.length > 0) {
		throw new Error('There is no bookings in the database.')
	}
	return result
}

export const bookServices = { getAllBooks }
