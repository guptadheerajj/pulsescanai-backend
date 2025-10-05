import { Router } from "express";
import { upload } from "../../middlewares/multer.middleware.js";
import { processVideo } from "../../controllers/video.controller.js";
import { validateVideo } from "../../middlewares/validateVideo.middleware.js";
import { scanInputValidationChain } from "../../middlewares/scanInputValidationChain.middleware.js";
import { handleValidationError } from "../../middlewares/handleValidationError.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

// protected routes
router
	.route("/scan")
	.post(
		verifyJWT,
		upload.single("video"),
		scanInputValidationChain,
		handleValidationError,
		validateVideo,
		processVideo,
	);

export default router;
