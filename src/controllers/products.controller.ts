import {Request, Response} from "express";
import {pool} from "../config/db.config";

export const getProducts = (req : Request, res : Response) => {
    pool.query('SELECT products.*, images.image_link FROM products JOIN images ON products.image_id = images.image_id', (error, result) => {
        if (error) 
            throw Error;

        res.status(200).json(result.rows)
    })
}

export const createProducts = (req: Request, res: Response) => {
    const { Product_name, Description, image, category, price, quantity } = req.body
}
