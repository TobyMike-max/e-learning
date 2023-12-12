import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config();
const { Pool } = pkg
export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

/**
 * const pgp = pg();
export const pool = pgp(process.env.DATABASE_URL);
export const pool = new Pool({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	port: process.env.DATABASE_PORT,
	database: process.env.DATABASE_NAME
}) **/
