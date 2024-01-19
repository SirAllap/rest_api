import { Schema, model } from 'mongoose'
import { IBook } from '../interfaces/books.interface'

const bookSchema = new Schema<IBook>({
	title: { type: String, required: true },
	author: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
})

export const BookModel = model<IBook>('bookings', bookSchema)
