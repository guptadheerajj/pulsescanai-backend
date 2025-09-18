import { fileURLToPath } from "url";
import path from "path";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const ACCESS_PATH =
	process.env.ACCESS_PATH || path.join(__dirname, "..", "/public");

export { ACCESS_PATH };
