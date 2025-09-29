import { asyncHandler } from "../utils/asyncHandler.js";
import { matchedData } from "express-validator";
import { createUser } from "../services/user.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

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
		// delete file from cloudinary
		console.log(error);
		throw error;
	}
});

// 1. receive data from client
// 2. upload files in temporary storage
// 3. validate data
// 4. upload files to cloudinary
// 5. create user in the database
// 6. if user creation fails then delete file from cloudinary
// 7. return error
// 8. if user creation success, send success response

export { registerUser };
