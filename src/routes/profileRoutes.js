import express from "express";
import * as profileControllers from "../controllers/profileControllers.js"
import { uploadImage } from "../middlewares/uploadImage.js";

const router = express.Router()

router.patch('/username-profile', profileControllers.updateUsername)
router.post('/upload-image', uploadImage.single('image'), profileControllers.uploadImage)
router.patch('/image-profile', profileControllers.updateImageProfile)


export default router