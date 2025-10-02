import { prisma } from "../config/database.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";

const checkUserExistsByUsername = async username => {
	try {
		const result = await prisma.user.findUnique({
			where: { username },
		});
		return !!result;
	} catch (error) {
		console.log("Error checking username record, ", error);
		throw new ApiError({
			message: "Error checking username record",
			statusCode: 500,
		});
	}
};

const checkUserExistsByEmail = async email => {
	try {
		const result = await prisma.user.findUnique({
			where: { email },
		});

		return !!result;
	} catch (error) {
		console.log("Error checking email record, ", error);
		throw new ApiError({
			message: "Error checking email record",
			statusCode: 500,
		});
	}
};

const createUser = async ({ username, email, password, avatar = "" }) => {
	const hash = await hashPassword(password);
	try {
		const user = await prisma.user.create({
			data: {
				username,
				email,
				avatar,
				password: hash,
				refreshToken: "",
			},
			select: {
				id: true,
				username: true,
				email: true,
				avatar: true,
				role: true,
				credits: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return user;
	} catch (error) {
		if (error.code === "P2002") {
			const field = error.meta?.target[0];

			let friendlyMessage = null;
			if (field === "username") {
				friendlyMessage =
					"This username is already taken. Please choose a different username.";
			} else if (field === "email") {
				friendlyMessage =
					"This email address is already registered. Please use a different email.";
			} else {
				friendlyMessage = `${field} already exists`;
			}

			throw new ApiError({
				message: friendlyMessage,
				statusCode: 409,
			});
		}
		throw new ApiError({
			message: `Error creating user`,
			statusCode: 500,
		});
	}
};

const getUserById = async userId => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				username: true,
				email: true,
				avatar: true,
				role: true,
				credits: true,
				createdAt: true,
				updatedAt: true,
				password: true,
			},
		});
		return user;
	} catch (error) {
		console.log("Error checking userId record, ", error);
		throw new ApiError({
			message: "Error checking userId record",
			statusCode: 500,
		});
	}
};

const getUserByUsername = async username => {
	try {
		const user = prisma.user.findUnique({
			where: { username },
			select: {
				id: true,
				username: true,
				email: true,
				avatar: true,
				role: true,
				credits: true,
				createdAt: true,
				updatedAt: true,
				password: true,
			},
		});

		return user;
	} catch (error) {
		console.log("Error checking username record, ", error);
		throw new ApiError({
			message: "Error checking username record",
			statusCode: 500,
		});
	}
};

const getUserByEmail = async email => {
	try {
		const user = prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				username: true,
				email: true,
				avatar: true,
				role: true,
				credits: true,
				createdAt: true,
				updatedAt: true,
				password: true,
			},
		});

		return user;
	} catch (error) {
		console.log("Error checking email record, ", error);
		throw new ApiError({
			message: "Error checking email record",
			statusCode: 500,
		});
	}
};

const setRefreshToken = async (id, refreshToken) => {
	try {
		return await prisma.user.update({
			where: { id },
			data: { refreshToken },
			select: {
				id: true,
				username: true,
				email: true,
				avatar: true,
				role: true,
				credits: true,
				createdAt: true,
				updatedAt: true,
				refreshToken: true,
			},
		});
	} catch (error) {
		console.log("Set refresh Token error", error);

		throw new ApiError({
			message: "Error setting the refreshToken",
			statusCode: 500,
			errors: [error],
		});
	}
};

const hashPassword = async password => {
	try {
		const SALT_ROUNDS = 12;
		const hash = await bcrypt.hash(password, SALT_ROUNDS);

		return hash;
	} catch (error) {
		console.log("Error in hashing password", error);
	}
};

const validatePassword = async (password, hashedPassword) => {
	try {
		return await bcrypt.compare(password, hashedPassword);
	} catch (error) {
		console.log("Bcrypt error", error);
		throw new ApiError({
			message: "Error in validating password",
			statusCode: 500,
		});
	}
};

const resetRefreshToken = async id => {
	try {
		await prisma.user.update({
			where: { id },
			data: { refreshToken: "" },
		});
	} catch (error) {
		console.log("Set refresh Token error", error);

		throw new ApiError({
			message: "Error validating the refreshToken",
			statusCode: 401,
			errors: [error],
		});
	}
};

export {
	checkUserExistsByUsername,
	checkUserExistsByEmail,
	createUser,
	getUserById,
	getUserByUsername,
	hashPassword,
	getUserByEmail,
	validatePassword,
	setRefreshToken,
	resetRefreshToken,
};
