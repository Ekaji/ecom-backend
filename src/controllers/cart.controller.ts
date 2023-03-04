import {Request, Response} from "express";
import {pool} from "../config/db.config";

export const add_to_cart = (req : Request, res : Response) => {
    const {product_id, user_id} = req.body;

    pool.query('INSERT INTO carts (user_id, product_id) VALUES($1, $2)', [
        user_id, product_id
    ], (error, result) => {
        if (error) {
            throw Error;
        }
        res.status(201).json({message: 'item saved'})
    })
}

export const get_cart_items = (req : Request, res : Response) => {

    pool.query('SELECT * FROM carts ORDER by cart_item_id asc', (error, result) => {
        if (error) {
            throw Error;
        }
        res.status(200).json(result.rows)
    })
}

export const get_cart_items_by_user_id = (req : Request, res : Response) => {
    const {user_id} = req.body;

    pool.query('SELECT * FROM carts WHERE user_id = $1', [user_id], (error, result) => {
        if (error) {
            throw Error;
        }

        res.status(200).json(result.rows)
    })
}

export const delete_from_cart = (req : Request, res : Response) => {
    const {product_id} = req.body

    pool.query('DELETE FROM carts WHERE product_id = $1 RETURNING *', [product_id], (error, result) => {
        if (error) {
            throw Error;
        }
        res.status(204).json({message: 'delete successful'})
    })
}
