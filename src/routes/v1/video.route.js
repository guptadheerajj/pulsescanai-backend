import { Router } from "express";
import { upload } from "../../middlewares/multer.middleware.js";
import { processVideo } from "../../controllers/video.controller.js";
import { validateVideo } from "../../middlewares/validateVideo.middleware.js";

const router = Router();

router.route("/scan").post(upload.single("video"), validateVideo, processVideo);

// 1. recceive the video
// 2. validate the video
// 3. upload on server
// 4. upload on cloudinary
// 5. remove file from local server
// 6. send the url to model
// 7. receive the model response
// 8. send the response to the client

export default router;
