import { Router } from "express";
import { save_product, remove_saved_item  } from "../controllers/saved_Item.controller";
import JWT_auth from "../middleware/JWT.auth";

const router = Router();

router.
    post('/save_product', save_product)


export default router