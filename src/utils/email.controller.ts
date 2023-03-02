import express, { Express, Request, Response } from "express";
import nodemailer from "nodemailer"
import JWT_auth from "../middleware/JWT.auth";
import { Jwt } from "jsonwebtoken";

const PORT = process.env.PORT || 8080

export const send_verification_email = (user_email : string) => {
    const token = JWT_auth.generateToken({ user_email })
    
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        transporter.sendMail({
            from: process.env.MAIL_ADDRESS,
            to: `${user_email}`,
            subject: 'Email verification',
            text: `Please follow this link to verify your email address http://localhost:${PORT}/verify/${token}`,
        }, (error, info) => {
            if (error) throw Error;
            console.log('email sent')
            // console.log(info)
    })    
    } catch (error) {
        console.log('an error occurred')
    }
}
