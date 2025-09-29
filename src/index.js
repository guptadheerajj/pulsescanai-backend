import "./config/env.js";
import { app } from "./app.js";
import { prisma } from "./config/database.js";

const PORT = process.env.PORT;

try {
	await prisma.$connect();
	console.log("Database connected Successfully");
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (err) {
	console.error("Database Connection error", err);
	await prisma.$disconnect();
	process.exit(1);
}
