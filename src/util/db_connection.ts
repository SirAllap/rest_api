import { connect } from 'mongoose'

// connect to DB
const connectDB = async () => {
	const URI: string = process.env.MONGO_URI || ''
	const DBNAME: string = process.env.MONGO_DB || ''

	try {
		await connect(URI, {
			dbName: DBNAME,
		})
		console.log('Connected to MongoDB')
	} catch (err) {
		throw new Error(`Error connecting to MongoDB: ${err}`)
	}
}

export default connectDB
