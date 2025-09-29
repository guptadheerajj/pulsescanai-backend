import { Router } from "express";
import { registerUser } from "../../controllers/register.controller.js";
import { userValidationChain } from "../../middlewares/userValidationChain.middleware.js";
import { handleValidationError } from "../../utils/handleValidationError.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();

router
	.route("/register")
	.post(
		upload.single("avatar"),
		userValidationChain,
		handleValidationError,
		registerUser,
	);

export default router;
