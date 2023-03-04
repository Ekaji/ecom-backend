import { Router } from "express";
import { form } from '../controllers/staticfiles.controller'

const router = Router()

router
    .get('/form', form)
    
export default router