import {Request, Response, NextFunction } from "express";
import { pool } from "../config/db.config";

export const checkDuplicateUsernameAndEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email } = req.body;
  
    try {
      const user_email = await pool.query('SELECT 1 FROM users WHERE email = $1', [email]);
      if (user_email.rowCount !== 0) {
        return res.status(400).json({ Error: 'Email already exists' });
      }
  
      const user_username = await pool.query('SELECT 1 FROM users WHERE username = $1', [username]);
      if (user_username.rowCount !== 0) {
        return res.status(400).json({ Error: 'Username already exists' });
      }
  
      next();
    } catch (err) {
      return res.status(500).json({ Error: 'An error occurred' });
    }
};
  

  
  