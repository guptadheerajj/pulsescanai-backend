import "./config/env.js";
import { app } from "./app.js";
import { db } from "./db/pool.js";

const PORT = process.env.PORT;

try {
	await db.query("SELECT NOW()");
	console.log("Database connected Successfully");
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (err) {
	console.error("Database Connection error", err);
	process.exit(1);
}
