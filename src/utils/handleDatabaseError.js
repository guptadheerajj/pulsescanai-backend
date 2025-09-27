import { ApiError } from "./ApiError";

const handleDatabaseError = (error, operation, statusCode = 500) => {
	console.log(`Database error while performing: ${operation}`, error);

	if (error.code === "P2025") {
		throw new ApiError({ message: "Record not found", statusCode: 404 });
	}

	throw new ApiError({ message: `Error: ${operation}`, statusCode });
};

export { handleDatabaseError };
