import { Client } from "@gradio/client";

const callModelAPI = async (videoUrl, age, gender) => {
	try {
		const client = await Client.connect("nitingupta9967/Hr_Prediction");

		const result = await client.predict("/predict", {
			video_url: videoUrl,
			age,
			gender,
		});
		console.log({ result });

		return result;
	} catch (error) {
		console.log(error);

		throw error;
	}
};

export { callModelAPI };

// import { ApiError } from "./ApiError.js";

// const callModelAPI = async (videoUrl, age, gender) => {
// 	try {
// 		const response = await fetch(
// 			"https://nitingupta9967-hr-prediction.hf.space/run/predict",
// 			{
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({
// 					data: [videoUrl, age, gender],
// 				}),
// 			},
// 		);

// 		if (!response.ok) {
// 			throw new ApiError({
// 				message: "HTTP error while calling model API",
// 				statusCode: response.status,
// 			});
// 		}

// 		const result = await response.json();

// 		if (result.error) {
// 			throw new ApiError({
// 				message: "Model API error",
// 				statusCode: 500,
// 				errors: [result.error],
// 			});
// 		}

// 		return result;
// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// };

// export { callModelAPI };
