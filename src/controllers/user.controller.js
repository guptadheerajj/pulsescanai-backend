import { asyncHandler } from "../utils/asyncHandler.js";
import { matchedData } from "express-validator";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { generateTokens } from "../utils/jwt.js";
import {
	deleteOnCloudinaryWithPublicId,
	uploadOnCloudinary,
} from "../utils/cloudinary.js";
import {
	createUser,
	getUserByEmail,
	getUserByUsername,
	resetRefreshToken,
	setRefreshToken,
	validatePassword,
} from "../services/user.service.js";

const registerUser = asyncHandler(async function (req, res, next) {
	const data = matchedData(req);

	const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

	if (!cloudinaryResponse) {
		throw new ApiError({
			message: `Unable to upload ${req.file.fieldname} on cloudinary`,
		});
	} else {
		data.avatar = cloudinaryResponse.secure_url;
	}

	try {
		const user = await createUser({ ...data });
		res.status(201).json(
			new ApiResponse({
				message: "User Registered Successfully!",
				statusCode: 201,
				data: user,
			}),
		);
	} catch (error) {
		console.log(error);
		await deleteOnCloudinaryWithPublicId(cloudinaryResponse.public_id);
		throw error;
	}
});

const loginUser = asyncHandler(async (req, res) => {
	// extract data
	const { email = null, username = null, password } = matchedData(req);

	const fieldName = username ? "username" : "email";

	// get user
	const user =
		fieldName === "email"
			? await getUserByEmail(email)
			: await getUserByUsername(username);

	if (!user) {
		throw new ApiError({
			message: `User with ${fieldName} does not exists. Please enter valid ${fieldName}`,
			statusCode: 404,
		});
	}

	// validate password
	const isPasswordValid = await validatePassword(password, user.password);

	if (!isPasswordValid) {
		console.log(`${fieldName} or password is invalid`);
		throw new ApiError({
			message: `${fieldName} or password is invalid`,
			statusCode: 500,
		});
	}

	// generate tokens
	const { refreshToken, accessToken } = generateTokens(user);

	const updatedUser = await setRefreshToken(user.id, refreshToken);

	const options = {
		httpOnly: true,
		secure: true,
	};

	res.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(
			new ApiResponse({
				message: "User validated successfully",
				statusCode: 200,
				data: { user: updatedUser, refreshToken, accessToken },
			}),
		);
});

const logoutUser = asyncHandler(async (req, res) => {
	const options = { httpOnly: true, secure: true };

	await resetRefreshToken(req.currentUser.id);

	return res
		.status(200)
		.clearCookie("refreshToken", options)
		.clearCookie("accessToken", options)
		.json(
			new ApiResponse({
				message: "User logged out successfully!",
				statusCode: 200,
			}),
		);
});

export { registerUser, loginUser, logoutUser };
