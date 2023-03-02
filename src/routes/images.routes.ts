import { Router } from "express";
import { getImages } from "../controllers/images.controller";

const router = Router()

router
    .get('/', getImages)

export default router
