import {Request, Response} from "express";
import { pool } from "../config/db.config";

export const get_saved_products = (req: Request, res: Response) => {
    const { user_id } = req.body

    pool.query('SELECT * FROM saved_items WHERE user_id = $1', [user_id], (error, result) => {
        if (error) throw Error;

        res.status(200).json(result.rows)
    })
}

export const save_product = (req : Request, res : Response) => {
    const { user_id, product_id } = req.body
    
    pool.query('INSERT INTO saved_items (user_id, product_id) VALUES($1, $2)', [
        user_id, product_id
    ], (error, result) => {
        if (error) throw Error;

        res.status(201).json({message: 'item saved', data: result.rows })
    })
}

export const remove_saved_item = (req: Request, res: Response) => {
    const { user_id, product_id } = req.body
    
    pool.query('DELETE FROM saved_items WHERE (user_id = $1 AND product_id = $2) RETURNING *', [user_id, product_id], (error, result) => {
        if (error) {
            throw Error;
        }
        
        res.status(204).json({message : 'removed product from saved item'})
    })
}

export const remove_all_saved_item = (req: Request, res: Response) => {
    const { user_id } = req.body
    
    pool.query('DELETE FROM saved_item WHERE (user_id = $1) RETURNING *', [user_id], (error, result) => {
        if (error) {
            throw Error;
        }
        
        res.status(204).json({message : 'removed product from saved item'})
    })
}