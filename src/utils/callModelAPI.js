import { Client } from "@gradio/client";
import { ApiError } from "./ApiError.js";

const callModelAPI = async (videoUrl, age, gender) => {
	try {
		const client = await Client.connect("nitingupta9967/Hr_Prediction");

		const result = await client.predict("/predict", {
			video_url: videoUrl,
			age,
			gender,
		});

		if (result.success) {
			throw new ApiError({
				message: result.message,
				errors: [result.error],
				statusCode: 500,
				data: result,
			});
		}

		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export { callModelAPI };
