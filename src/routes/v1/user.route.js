import { Router } from "express";
import {
	loginUser,
	logoutUser,
	refreshAccessToken,
	registerUser,
} from "../../controllers/user.controller.js";
import {
	createLoginValidationChain,
	createPasswordChain,
	userValidationChain,
} from "../../middlewares/userValidationChain.middleware.js";
import { handleValidationError } from "../../middlewares/handleValidationError.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

router
	.route("/register")
	.post(
		upload.single("avatar"),
		userValidationChain,
		handleValidationError,
		registerUser,
	);

router.route("/login").post(
	// the password chain should be inside this createLogin... but this is a bad code which I will be fixing in future
	createLoginValidationChain,
	createPasswordChain(),
	handleValidationError,
	loginUser,
);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
