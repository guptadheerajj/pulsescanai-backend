import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const handleValidationError = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const errorResponse = new ApiError({
			message: "Bad request, user input validation error",
			errors: errors.array({ onlyFirstError: true }),
			statusCode: 400,
		});
		return res.status(errorResponse.statusCode).json(errorResponse);
	}
	next();
};

export { handleValidationError };
