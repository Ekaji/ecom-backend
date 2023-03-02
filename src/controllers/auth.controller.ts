import {NextFunction, Request, Response } from "express";
import { pool } from "../config/db.config";
import bcrypt from 'bcryptjs'
import JWT_auth from "../middleware/JWT.auth";
import { send_verification_email } from "../utils/email.controller";

export const signUP = async (req: Request, res: Response, next: NextFunction) => {

    const { firstname, lastname, middlename, username, email, gender } = req.body;
    const password = bcrypt.hashSync(req.body.password, 8)
    
    pool.query(
        'INSERT INTO users (firstname, lastname, middlename, username, password, email, gender) VALUES($1, $2, $3, $4, $5, $6, $7)', [firstname, lastname, middlename, username, password, email, gender], (error, result) => {
            if (error) {
                throw error
            }

            send_verification_email( email )
            res.status(200).json({message: 'email verification sent'})
        } )
}

export const signIN = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    pool.query('SELECT * FROM users WHERE username = $1', [username], (error, result) => {
        if (error) throw error
        
        try {
            if (result.rows.length == 0) {
                return res.status(403).send({ message: `user with username ${username} not found` })
            }
    
            const validatePassword = bcrypt.compareSync(password, result.rows[0].password)
            if (!validatePassword) {
                return res
                        .status(401)
                        .send({
                        accessToken: null,
                        message: 'invalid password'
                    })
            }
            const token = JWT_auth.generateToken({ username })
            return res
                .status(200)
                .json(token)
        } catch (error) {
            res.sendStatus(500)
        }
    })
}

export const getUsers = (req: Request, res: Response, next: NextFunction) => { 

    pool.query('SELECT * FROM users ORDER BY id asc', (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}

export const delete_accounts = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    pool.query('DELETE FROM users WHERE email = $1 RETURNING *', [email], (error, result ) => {
        if (error) throw error
        try {
            if (result.rows.length === 0) {
               return res.status(404).json({ message: `user with email ${email} not found`})  
            }
           return res.status(202).json({ message: 'successful delete'})

        } catch (error) {
            res.status(404).json({ message: `unable to delete ${error}`})
        }
    })
}

export const getUsers_by_id = (req: Request, res: Response, next: NextFunction) => { 
    const { id } = req.params

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}

export const redirect_to_login = (req: Request, res: Response, next: NextFunction) => {
    res.status(301).redirect('/')
}