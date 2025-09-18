const asyncHandler = requestHandler => (req, res, next) => {
	new Promise.resolve(requestHandler(req, res, next)).catch(error =>
		next(error),
	);
};

export { asyncHandler };

// error => {
// 	console.error(error);
// 	res.status(error.status || 500).json({
// 		message: error.message || "Something went wrong",
// 		success: false,
// 	});
// };
