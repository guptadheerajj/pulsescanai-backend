import { asyncHandler } from "../utils/asyncHandler.js";

const validateVideo = asyncHandler(async (req, res, next) => {
	console.log("Validating video");

	next();
});

export { validateVideo };
