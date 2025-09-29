import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";
import fs from "fs";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, options = {}) => {
	try {
		if (!localFilePath) {
			throw new ApiError({
				message: "Localfile path not availalbe",
				statusCode: 500,
			});
		}

		console.log("Starting Cloudinary upload...");

		const uploadOptions = {
			resource_type: "auto",
			chunk_size: 6000000, // 6MB chunks
			timeout: 120000, // 2 minute timeout
			...options,
		};

		const response = await cloudinary.uploader.upload(
			localFilePath,
			uploadOptions,
		);

		console.log("File uploaded to Cloudinary successfully!\n");

		return response;
	} catch (error) {
		console.error("Cloudinary upload error:", error.message);
		fs.unlinkSync(localFilePath);
		return null;
	}
};
export { uploadOnCloudinary };
