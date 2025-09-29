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

app.use("/api/v1/user", userRouter);

// global error handler
app.use((err, req, res, next) => {
	res.status(err.statusCode || 500).json(err);
});

export { app };
