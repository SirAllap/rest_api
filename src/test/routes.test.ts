import supertest from 'supertest'
import { app } from '../app'
import mongoose from 'mongoose'

describe('Get books', () => {
	test('should show an array of books', async () => {
		const res = await supertest(app).get('/books').send()
		expect(res.statusCode).toEqual(200)
	})
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
