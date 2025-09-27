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

const createUser = async ({ username, email, password }) => {
	const hash = await hashPassword(password);
	try {
		const user = await prisma.user.create({
			data: {
				username,
				email,
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
			throw new ApiError({
				message: `${field} already exists`,
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

const hashPassword = async password => {
	try {
		const SALT_ROUNDS = 12;
		const hash = await bcrypt.hash(password, SALT_ROUNDS);

		return hash;
	} catch (error) {
		console.log("Error in hashing password", error);
	}
};

export {
	checkUserExistsByUsername,
	checkUserExistsByEmail,
	createUser,
	getUserById,
	getUserByUsername,
	hashPassword,
};
