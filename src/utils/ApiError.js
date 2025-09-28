class ApiError extends Error {
	constructor({
		message = "Something went wrong",
		statusCode = 500,
		errors = [],
		stack = "",
		data = null,
	}) {
		super(message);
		Object.defineProperty(this, "message", {
			value: message,
			enumerable: true,
			writable: true,
			configurable: true,
		});
		this.statusCode = statusCode;
		this.errors = errors;
		this.data = data;
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export { ApiError };
