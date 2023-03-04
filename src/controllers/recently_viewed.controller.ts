import {Request, Response} from "express";
import { pool } from "../config/db.config";

export const add_to_viewed_item = (req: Request, res: Response) => {
    const { user_id, product_id } = req.body
    
    pool.query('INSERT INTO viewed_item (user_id, product_id) VALUES($1, $2)', [
        user_id, product_id
    ], (error, result) => {
        if (error) {
            throw Error;
        }

        res.status(201).json({message: 'item saved', data: result.rows })
    })
}

export const remove_viewed_item = (req: Request, res: Response) => {
    const { user_id, product_id } = req.body
    
    pool.query('DELETE FROM viewed_item WHERE (user_id = $1 AND product_id = $2) RETURNING *', [user_id, product_id], (error, result) => {
        if (error) {
            throw Error;
        }
        
        res.status(204).json({message : 'removed product from viewed item'})
    })
}