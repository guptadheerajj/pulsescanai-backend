const asyncHandler = requestHandler => (req, res, next) => {
	Promise.resolve(requestHandler(req, res, next)).catch(error => next(error));
};

export { asyncHandler };

// error => {
// 	console.error(error);
// 	res.status(error.status || 500).json({
// 		message: error.message || "Something went wrong",
// 		success: false,
// 	});
// };
