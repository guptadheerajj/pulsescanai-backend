import { getUserById } from "../services/user.service.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/jwt.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
	try {
		const accessToken =
			req.cookies?.accessToken ||
			req.header("Authorization")?.replace("Bearer ", "") ||
			null;

		if (!accessToken) {
			throw new ApiError({
				message: "Unauthorized access",
				statusCode: 401,
			});
		}

		const decodedToken = verifyAccessToken(accessToken);

		const user = await getUserById(decodedToken.id);

		req.currentUser = user;

		next();
	} catch (error) {
		console.log("Authorization error", error);
		throw error;
	}
});

export { verifyJWT };
