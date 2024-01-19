import supertest from 'supertest'
import { app } from '../app'
import mongoose from 'mongoose'

describe('Get books', () => {
	let bookID: string = ''
	let newBookID: string = ''
	test('Should show an array of books', async () => {
		const res = await supertest(app).get('/books').send()
		bookID = res.body[0]._id
		expect(res.statusCode).toEqual(200)
	})

	test('Should return one book', async () => {
		const res = await supertest(app).get(`/books/${bookID}`)
		expect(res.statusCode).toEqual(200)
	})

	test('Should return 404 if book not found', async () => {
		const res = await supertest(app).get('/books/5f6a359131b9402e93a26258')
		expect(res.statusCode).toEqual(404)
		expect(res.body).toHaveProperty('error', true)
		expect(res.body).toHaveProperty('message', 'No book found with that ID')
		expect(res.body).toHaveProperty('status', 404)
	})

	test("Should return 400 because the ID doesn't have the correct format", async () => {
		const res = await supertest(app).get('/books/5f6a359131b9402e93a26258')
		expect(res.statusCode).toEqual(404)
		expect(res.body).toHaveProperty('error', true)
		expect(res.body).toHaveProperty('message', 'No book found with that ID')
		expect(res.body).toHaveProperty('status', 404)
	})

	test('Should create a new book', async () => {
		const book = {
			title: 'Test Book',
			author: 'Test Author',
			description: 'Test Description',
			price: 10,
		}
		const res = await supertest(app).post('/books').send(book)
		newBookID = res.body._id
		expect(res.statusCode).toEqual(200)
	})

	test('Should update book title', async () => {
		const book = {
			title: 'Updated book title',
		}
		const res = await supertest(app).put(`/books/${newBookID}`).send(book)
		expect(res.statusCode).toEqual(200)
	})

	test('Should delete book', async () => {
		const res = await supertest(app).delete(`/books/${newBookID}`)
		expect(res.statusCode).toEqual(200)
	})

	afterAll(async () => {
		try {
			await mongoose.disconnect()
		} catch (error) {
			console.log(`
        Error disconecting from mongo:
        ${error}`)
			throw error
		}
	})
})
