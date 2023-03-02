import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/auth.config";

const generateToken = (username: any) => {
    return jwt.sign(username, config.secret, { expiresIn: '1800s' } )
}

const verifyToken =  (req: any, res: any, next: any) => {
    const authHeaders: any = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]

    if (token == null) {
        res.status(403).send({ message: "No token provided" })
        return
    }

    jwt.verify(token, config.secret, (err: any, user: any) => {
        console.log(err)
        if (err) return res.sendStatus(403)

        req.user = user

        next()
    } )
}

const verify_email_Token =  (req: any, res: any, next: any) => {
    const { token } = req.params

    if (token == null) {
        res.status(403).send({ message: "No token provided" })
        return
    }

    jwt.verify(token, config.secret, (err: any, user: any) => {
        console.log(err)
        if (err) return res.sendStatus(403)

        req.user = user

        next()
    } )
}

const JWT_auth = {
    generateToken,
    verifyToken,
    verify_email_Token,
  };
  
  export default JWT_auth;