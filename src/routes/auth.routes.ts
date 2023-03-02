import { Router } from "express";
import { signUP, signIN, getUsers, redirect_to_login, delete_accounts } from "../controllers/auth.controller";
import JWT_auth from "../middleware/JWT.auth";
import { checkDuplicateUsernameAndEmail } from "../middleware/verify_signUp.middleware";

const router = Router()

router
    .get('/getusers', getUsers)
    .post('/delete_users', delete_accounts)
    .post('/login', signIN)
    .post('/signup', checkDuplicateUsernameAndEmail, signUP)
    .get('/verify/:token', JWT_auth.verify_email_Token, redirect_to_login )

export default router