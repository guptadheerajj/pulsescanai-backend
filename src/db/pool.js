import { Pool } from "pg";

const pool = new Pool({
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	max: 20,
	idleTimeoutMillis: 3000,
});

const query = async (text, params = []) => {
	try {
		const result = await pool.query(text, params);
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const db = {
	query,
};
