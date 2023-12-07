import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();
const Pool = pg.Pool;

export const pool = new Pool({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	port: process.env.DATABASE_PORT,
	database: process.env.DATABASE_NAME
})
