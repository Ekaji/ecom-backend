import { Router } from "express";
import { getImages, imageUpload } from "../controllers/images.controller";
import { multerUpload } from "../utils/image_storage";

const router = Router()

router
    .get('/', getImages)
    .post('/save_product_image', multerUpload.single("save__to__cloudinary"), imageUpload )

export default router
