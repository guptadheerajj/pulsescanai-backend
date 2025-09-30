import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError.js";

const generateAccessToken = payload => {
	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
	const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;

	try {
		return jwt.sign(payload, accessTokenSecret, {
			expiresIn: accessTokenExpiration,
		});
	} catch (error) {
		console.log(error);
		throw new ApiError({
			message: "Error generating access token",
			statusCode: 500,
		});
	}
};

const generateRefreshToken = payload => {
	const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
	const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION;

	try {
		return jwt.sign(payload, refreshTokenSecret, {
			expiresIn: refreshTokenExpiration,
		});
	} catch (error) {
		console.log(error);
		throw new ApiError({
			message: "Error generating refresh token",
			statusCode: 500,
		});
	}
};

const generateTokens = user => {
	const payLoad = {
		id: user.id,
		email: user.email,
		username: user.username,
		role: user.role,
	};

	const refreshPayload = { id: user.id };

	const accessToken = generateAccessToken(payLoad);
	const refreshToken = generateRefreshToken(refreshPayload);

	return { accessToken, refreshToken };
};

const verifyToken = (token, secret) => {
	try {
		return jwt.verify(token, secret);
	} catch (error) {
		console.log("Token verification error", error);
		throw new ApiError({
			message: "Invalid or expired token",
			statusCode: 401,
		});
	}
};

const verifyAccessToken = token => {
	return verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = token => {
	return verifyToken(token, process.env.REFRESH_TOKEN_SECRET);
};

export {
	generateAccessToken,
	generateRefreshToken,
	verifyToken,
	verifyAccessToken,
	verifyRefreshToken,
	generateTokens,
};
