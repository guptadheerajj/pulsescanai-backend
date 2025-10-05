import { matchedData } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { callModelAPI } from "../utils/callModelAPI.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const processVideo = asyncHandler(async (req, res) => {
	const { age, gender } = matchedData(req);

	try {
		const cloudinaryResponse = await uploadOnCloudinary(req.file?.path);

		console.log("Calling model API");
		const modelResponse = await callModelAPI(
			cloudinaryResponse.secure_url,
			+age,
			gender,
		);
		console.log({ modelResponse });

		if (!modelResponse) {
			throw new ApiError({
				message: "Unable to predict the vitals",
				statusCode: 500,
			});
		}

		res.status(201).json(
			new ApiResponse({
				message: "Vitals predicted successfully",
				statusCode: 200,
				data: modelResponse,
			}),
		);
	} catch (error) {
		console.log(error);
		throw error;
	}
});

export { processVideo };
