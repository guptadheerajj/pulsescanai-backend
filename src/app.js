import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ACCESS_PATH } from "./constants.js";

const app = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "*",
		credentials: true,
	}),
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static(ACCESS_PATH));
app.use(cookieParser());

// router imports
import userRouter from "./routes/v1/user.route.js";
import videoRouter from "./routes/v1/video.route.js";
import { ApiError } from "./utils/ApiError.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/video", videoRouter);

// global error handler
app.use((err, req, res, next) => {
	let errorResponse = err;
	if (!(err instanceof ApiError)) {
		errorResponse = new ApiError({
			message: err.message || "Something went wrong",
			statusCode: err.statusCode || err.status || 500,
			errors: err.errors,
		});
	}

	res.status(errorResponse.statusCode || 500).json(errorResponse);
});

export { app };
